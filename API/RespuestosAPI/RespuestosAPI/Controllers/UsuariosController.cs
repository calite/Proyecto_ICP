using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RespuestosAPI.DTOs;
using RespuestosAPI.Entidades;

namespace RespuestosAPI.Controllers
{

    [ApiController]
    [Route("api/usuarios")]
    public class UsuariosController : ControllerBase
    {
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;

        public UsuariosController(ApplicationDbContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        /*\
         * =====================================================
         *                         GET
         * =====================================================
        \*/
        /*
        [HttpGet("all")]
        public async Task<List<UsuarioDTO>> GetTodosLosUsuarios()
        {
            var usuarios = await context.USUARIOS.ToListAsync();

            return mapper.Map<List<UsuarioDTO>>(usuarios);
        }
        
        [HttpGet("{IdUsuario:int}")]
        public async Task<List<UsuarioDTO>> GetUsuarioPorId(int IdUsuario)
        {
            var usuario = await context.USUARIOS.Where(x => x.Id_Usuario == IdUsuario).ToListAsync();

            return mapper.Map<List<UsuarioDTO>>(usuario);
        }

        [HttpGet("perfil/{id_perfil:int}")]
        public async Task<List<PerfilDTO>> GetPerfilPorId(int id_perfil)
        {
            var perfil = await context.PERFILES
                .Where(x => x.Id_Perfil == id_perfil)
                .ToListAsync();

            return mapper.Map<List<PerfilDTO>>(perfil);
        }
        */
        /*\
         * =====================================================
         *                         VISTA
         * =====================================================
        \*/

        [HttpGet("detalles")]
        public async Task<ActionResult<IEnumerable<UsuarioPerfil>>> GetUsuariosDetalles()
        {
            try
            {
                return await context.V_USUARIOS_PERFILES.ToListAsync();
            }
            catch (Exception e)
            {

                throw e;
            }
            
        }

        [HttpGet("detalles/{IdUsuario:int}")]
        public async Task<ActionResult<IEnumerable<UsuarioPerfil>>> GetUsuarioDetalle(int IdUsuario)
        {
            try
            {
                var usuario = await context.V_USUARIOS_PERFILES.Where(x => x.Id_Usuario == IdUsuario).ToListAsync();

                if (usuario.Count == 0)
                {
                    return BadRequest($"Ya existe un usuario con ese ID: {IdUsuario}");
                }

                return usuario;
            }
            catch (Exception e)
            {

                throw e;
            }
            
        }

        /*\
         * =====================================================
         *                          POST
         * =====================================================
        \*/

        [HttpPost("alta_usuario")]
        public async Task<ActionResult> AltaUsuario([FromBody] UsuarioCreacionDTO usuarioCreacionDTO)
        {
            try
            {
                var existeUsuarioConElMismoEmail = await context.USUARIOS.AnyAsync(x => x.Email == usuarioCreacionDTO.Email);

                if (existeUsuarioConElMismoEmail)
                {
                    return BadRequest($"Ya existe un usuario con el email: {usuarioCreacionDTO.Email}");
                }

                var existePerfil = await context.PERFILES.AnyAsync(x => x.Id_Perfil == usuarioCreacionDTO.Id_Perfil);

                if (!existePerfil)
                {
                    return BadRequest($"No existe un perfil con ese ID: {usuarioCreacionDTO.Id_Perfil}");
                }

                string PA_ALTA_USUARIO = "EXEC PA_ALTA_USUARIO " +
                            "@USUARIO = '" + usuarioCreacionDTO.usuario + "' ," +
                            "@PASSWORD = '" + usuarioCreacionDTO.Password + "' ," +
                            "@ID_PERFIL = " + usuarioCreacionDTO.Id_Perfil + " ," +
                            "@EMAIL = '" + usuarioCreacionDTO.Email + "' ," +
                            "@INVOKER = " + 0 + "," +
                            "@RETCODE = " + 0 + "," +
                            "@MENSAJE = ' ' ";

                return Ok(context.Database.ExecuteSqlRaw(PA_ALTA_USUARIO));
            }
            catch (Exception e)
            {

                throw e;
            }

        }

        [HttpPost("editar_usuario")]
        public async Task<ActionResult> CambiarUsuario([FromBody] UsuarioDTO usuarioDTO)
        {
            try
            {
                var existeUsuario = await context.USUARIOS.AnyAsync(x => x.Id_Usuario == usuarioDTO.Id_Usuario);

                if (!existeUsuario)
                {
                    return BadRequest($"No existe un usuario con el ID: {usuarioDTO.Id_Usuario}");
                }

                var existeUsuarioConElMismoEmail = await context.USUARIOS.AnyAsync(x => x.Email == usuarioDTO.Email);

                if (existeUsuarioConElMismoEmail)
                {
                    return BadRequest($"Ya existe un usuario con el email: {usuarioDTO.Email}");
                }

                var existePerfil = await context.PERFILES.AnyAsync(x => x.Id_Perfil == usuarioDTO.Id_Perfil);

                if (!existePerfil)
                {
                    return BadRequest($"No existe un perfil con ese ID: {usuarioDTO.Id_Perfil}");
                }

                string PA_CAMBIAR_USUARIO = "EXEC PA_CAMBIAR_USUARIO " +
                            "@ID_USUARIO = '" + usuarioDTO.Id_Usuario + "' ," +
                            "@USUARIO = '" + usuarioDTO.usuario + "' ," +
                            "@PASSWORD = '" + usuarioDTO.Password + "' ," +
                            "@ID_PERFIL = " + usuarioDTO.Id_Perfil + " ," +
                            "@EMAIL = '" + usuarioDTO.Email + "' ," +
                            "@INVOKER = " + 0 + "," +
                            "@RETCODE = " + 0 + "," +
                            "@MENSAJE = ' ' ";

                return Ok(context.Database.ExecuteSqlRaw(PA_CAMBIAR_USUARIO));
            }
            catch (Exception e) 
            { 
                throw e; 
            }
        }

        [HttpPost("baja_usuario")]
        public async Task<ActionResult> BajaUsuario(int IdUsuario)
        {
            try
            {
                var existeUsuario = await context.USUARIOS.AnyAsync(x => x.Id_Usuario == IdUsuario);

                if (!existeUsuario)
                {
                    return BadRequest($"No existe un usuario con el ID: {IdUsuario}");
                }

                string PA_BAJA_USUARIO = "EXEC PA_BAJA_USUARIO " +
                            "@ID_USUARIO = '" + IdUsuario + "' ," +
                            "@INVOKER = " + 0 + "," +
                            "@RETCODE = " + 0 + "," +
                            "@MENSAJE = ' ' ";

                return Ok(context.Database.ExecuteSqlRaw(PA_BAJA_USUARIO));
            }
            catch (Exception e)
            {
                throw e;
            }
        }


    }
}

