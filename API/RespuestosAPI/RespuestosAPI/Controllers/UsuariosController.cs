using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RespuestosAPI.DTOs;

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


        [HttpGet("all")]
        public async Task<List<UsuarioDTO>> GetTodosLosUsuarios()
        {
            var usuarios = await context.Usuarios.ToListAsync();

            return mapper.Map<List<UsuarioDTO>>(usuarios);
        }

        [HttpGet("{id:int}")]
        public async Task<List<UsuarioDTO>> GetUsuarioPorId(int id)
        {
            var usuario = await context.Usuarios.Where(x => x.Id_Usuario == id).ToListAsync();

            return mapper.Map<List<UsuarioDTO>>(usuario);
        }

        [HttpGet("perfil/{id_perfil:int}")]
        public async Task<List<PerfilDTO>> GetPerfilPorId(int id_perfil)
        {
            var perfil = await context.Perfiles
                .Where(x => x.Id_Perfil == id_perfil)
                .ToListAsync();

            return mapper.Map<List<PerfilDTO>>(perfil);
        }




        //FALTARIA DEVOLVER LA VISTA -> V_USUARIOS_PERFILES





        [HttpPost("alta_usuario")]
        public async Task<ActionResult> AltaUsuario([FromBody] UsuarioCreacionDTO usuarioCreacionDTO)
        {
            var existeUsuarioConElMismoEmail = await context.Usuarios.AnyAsync(x => x.Email == usuarioCreacionDTO.Email);

            if (existeUsuarioConElMismoEmail)
            {
                return BadRequest($"Ya existe un usuario con el email: {usuarioCreacionDTO.Email}");
            }
            
            var existePerfil = await context.Perfiles.AnyAsync(x => x.Id_Perfil == usuarioCreacionDTO.Id_Perfil);
            
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

        [HttpPost("editar_usuario")]
        public async Task<ActionResult> CambiarUsuario([FromBody] UsuarioDTO usuarioDTO)
        {
            var existeUsuario = await context.Usuarios.AnyAsync(x => x.Id_Usuario == usuarioDTO.Id_Usuario);

            if (!existeUsuario)
            {
                return BadRequest($"No existe un usuario con el ID: {usuarioDTO.Id_Usuario}");
            }

            var existeUsuarioConElMismoEmail = await context.Usuarios.AnyAsync(x => x.Email == usuarioDTO.Email);

            if (existeUsuarioConElMismoEmail)
            {
                return BadRequest($"Ya existe un usuario con el email: {usuarioDTO.Email}");
            }

            var existePerfil = await context.Perfiles.AnyAsync(x => x.Id_Perfil == usuarioDTO.Id_Perfil);

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

        [HttpPost("baja_usuario")]
        public async Task<ActionResult> BajaUsuario(int id)
        {
            var existeUsuario = await context.Usuarios.AnyAsync(x => x.Id_Usuario == id);

            if (!existeUsuario)
            {
                return BadRequest($"No existe un usuario con el ID: {id}");
            }

            string PA_BAJA_USUARIO = "EXEC PA_BAJA_USUARIO " +
                        "@ID_USUARIO = '" + id + "' ," +
                        "@INVOKER = " + 0 + "," +
                        "@RETCODE = " + 0 + "," +
                        "@MENSAJE = ' ' ";

            return Ok(context.Database.ExecuteSqlRaw(PA_BAJA_USUARIO));

        }


    }
}

