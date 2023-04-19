using Microsoft.IdentityModel.Tokens;
using RespuestosAPI.Entidades;
using RespuestosAPI.Requests;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using WebAPIAutores.DTOs;

namespace RespuestosAPI.Servicios
{
    public class TokenService
    {

        //añadir context
        private readonly ApplicationDbContext context;
        private readonly IConfiguration configuration;

        public TokenService(
            ApplicationDbContext context,
            IConfiguration configuration
            )
        {
            this.context = context;
            this.configuration = configuration;
        }
        
        public async Task<RespuestaAutenticacion> ConstruirToken(LoginRequest credencialesUsuario)
        {

            var usuario = context.V_USUARIOS_PERFILES.Where(x => x.Usuario == credencialesUsuario.Usuario).FirstOrDefault();

            if (usuario == null)
            {
                return new RespuestaAutenticacion
                {
                    Token = "",
                    Expiracion = DateTime.Now
                };
            }



            var claims = new List<Claim>()
            {
                new Claim("rol",usuario.Descripcion)
            };

           

            var llave = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["llavejwt"]));
            var credenciales = new SigningCredentials(llave, SecurityAlgorithms.HmacSha256);

            var expiracion = DateTime.UtcNow.AddDays(1);

            var securityToken = new JwtSecurityToken(issuer: null, audience: null, claims: claims, expires: expiracion, signingCredentials: credenciales);

            return new RespuestaAutenticacion()
            {
                Token = new JwtSecurityTokenHandler().WriteToken(securityToken),
                Expiracion = expiracion
            };

        }
        

    }
}
