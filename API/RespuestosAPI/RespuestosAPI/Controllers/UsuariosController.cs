﻿using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using RespuestosAPI.DTOs;
using RespuestosAPI.Entidades;
using RespuestosAPI.Requests;
using System.Text;

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
        public async Task<ActionResult> CambiarUsuario([FromBody] CambiarDatosUsuarioRequest request)
        {
            try
            {
                var existeUsuario = await context.USUARIOS.AnyAsync(x => x.Id_Usuario == request.Id_Usuario);

                if (!existeUsuario)
                {
                    return BadRequest($"No existe un usuario con el ID: {request.Id_Usuario}");
                }

                var existeUsuarioConElMismoEmail = await context.USUARIOS.AnyAsync(x => x.Email == request.Email);

                if (existeUsuarioConElMismoEmail)
                {
                    return BadRequest($"Ya existe un usuario con el email: {request.Email}");
                }

                var existePerfil = await context.PERFILES.AnyAsync(x => x.Id_Perfil == request.Id_Perfil);

                if (!existePerfil)
                {
                    return BadRequest($"No existe un perfil con ese ID: {request.Id_Perfil}");
                }

                string PA_EDITAR_USUARIO = "EXEC PA_EDITAR_USUARIO " +
                            "@ID_USUARIO = '" + request.Id_Usuario + "' ," +
                            "@USUARIO = '" + request.Usuario + "' ," +
                            //"@PASSWORD = '" + usuarioDTO.Password + "' ," +
                            "@ID_PERFIL = " + request.Id_Perfil + " ," +
                            "@EMAIL = '" + request.Email + "' ," +
                            "@INVOKER = " + 0 + "," +
                            "@RETCODE = " + 0 + "," +
                            "@MENSAJE = ' ' ";

                return Ok(context.Database.ExecuteSqlRaw(PA_EDITAR_USUARIO));
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        [HttpPost("baja_usuario")]
        public async Task<ActionResult> BajaUsuario(CambiarEstadoUsuarioRequest request)
        {
            try
            {
                var existeUsuario = await context.USUARIOS.AnyAsync(x => x.Id_Usuario == request.IdUsuario);

                if (!existeUsuario)
                {
                    return BadRequest($"No existe un usuario con el ID: {request.IdUsuario}");
                }

                string PA_BAJA_USUARIO = "EXEC PA_BAJA_USUARIO " +
                            "@ID_USUARIO = '" + request.IdUsuario + "' ," +
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

        [HttpPost("login")]
        public async Task<ActionResult<ResponseWrapper<Usuario>>> loginUsuario([FromBody] LoginRequest request)
        {
            try
            {
                //var usuario = await context.USUARIOS.AnyAsync(x => x.usuario == request.Usuario && x.Password == request.Password);

                //if (!usuario)
                //{
                //    return BadRequest("Datos Incorrectos, o el usuario esta dado de baja.");
                //}

                var retcode = new SqlParameter("@RETCODE", System.Data.SqlDbType.Int)
                {
                    Direction = System.Data.ParameterDirection.Output,
                };
                var mensaje = new SqlParameter("@MENSAJE", System.Data.SqlDbType.VarChar)
                {
                    Direction = System.Data.ParameterDirection.Output,
                    Size = 8000
                };
                var jsonOut = new SqlParameter("@JSON_OUT", System.Data.SqlDbType.VarChar)
                {
                    Direction = System.Data.ParameterDirection.Output,
                    Size = 8000
                };

                SqlParameter[] parametros = new SqlParameter[6]
                {

                    new SqlParameter("@LOGIN", System.Data.SqlDbType.VarChar)
                    {
                        Direction = System.Data.ParameterDirection.Input,
                        Value = request.Usuario,
                        Size = 30
                    },
                    new SqlParameter("@PASSWORD", System.Data.SqlDbType.VarChar)
                    {
                        Direction = System.Data.ParameterDirection.Input,
                        Value = request.Password,
                        Size = 30
                    },
                    new SqlParameter("@INVOKER", System.Data.SqlDbType.Int)
                    {
                        Direction = System.Data.ParameterDirection.Output,
                    },
                    jsonOut,
                    retcode,
                    mensaje
                 };

                string PA_LOGIN = "EXEC PA_LOGIN @LOGIN, @PASSWORD, @INVOKER, @JSON_OUT OUTPUT, @RETCODE OUTPUT, @MENSAJE OUTPUT";

                await context.Database.ExecuteSqlRawAsync(PA_LOGIN, parametros);

                if ((int)retcode.Value > 0)
                {
                    return BadRequest(new ResponseWrapper<Usuario>() { 
                        Mensaje = mensaje.Value.ToString(), 
                        RetCode = (int)retcode.Value });
                }

                if ((int)retcode.Value == 0)
                {
                    return Ok(new ResponseWrapper<Usuario>()
                    {
                        Mensaje = mensaje.Value.ToString(),
                        RetCode = (int)retcode.Value,
                        Value = JsonConvert.DeserializeObject<Usuario>(jsonOut.Value.ToString())
                    });
                }

                if ((int)retcode.Value < 0)
                {
                    return StatusCode(500, new ResponseWrapper<Usuario>()
                    {
                        Mensaje = mensaje.Value.ToString(),
                        RetCode = (int)retcode.Value,
                    });
                }


                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode(500, new ResponseWrapper<Usuario>()
                {
                    Mensaje = e.Message,
                    RetCode = -1
                });
            }
        }


    }
}

