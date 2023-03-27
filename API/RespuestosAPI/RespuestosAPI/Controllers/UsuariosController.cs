using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RespuestosAPI.Entidades;

namespace RespuestosAPI.Controllers
{

    [ApiController]
    [Route("api/usuarios")]
    public class UsuariosController : ControllerBase
    {
        private readonly ApplicationDbContext context;

        public UsuariosController(ApplicationDbContext context)
        {
            this.context = context;
        }


        [HttpGet("/all")]
        public async Task<ActionResult<Usuario>> Get()
        {
            var usuarios = await context.Usuarios.ToListAsync();
            return Ok(usuarios);
        }

        [HttpGet("/{id}")]
        public async Task<ActionResult<Usuario>> Get(int id)
        {
            var usuarios = await context.Usuarios.Where(x => x.Id == id).ToListAsync();
            return Ok(usuarios);
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] Usuario u)
        {

            var usuario = new Usuario
            {
                usuario = u.usuario,
                Password = u.Password,
                Email = u.Email,
                Id_Perfil = u.Id_Perfil
            };

            context.Add(usuario);
            await context.SaveChangesAsync();
            return Ok(usuario);

        }

    }
}

