using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using RespuestosAPI.DTOs;
using RespuestosAPI.Entidades;
using RespuestosAPI.Requests;
using RespuestosAPI.Servicios;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using WebAPIAutores.DTOs;

namespace RespuestosAPI.Controllers
{

    [ApiController]
    [Route("api/usuarios")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class UsuariosController : ControllerBase
    {
        private readonly ApplicationDbContext context;
        private readonly IConfiguration configuration;
        private readonly IMapper mapper;
        private readonly TokenService tokenService;
        private readonly HashService hashService;

        public UsuariosController(ApplicationDbContext context, IConfiguration configuration, IMapper mapper, TokenService tokenService, HashService hashService)
        {
            this.context = context;
            this.configuration = configuration;
            this.mapper = mapper;
            this.tokenService = tokenService;
            this.hashService = hashService;
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

        [HttpGet("perfiles")]
        public async Task<List<PerfilDTO>> GetPerfiles()
        {
            var perfil = await context.PERFILES.ToListAsync();

            return mapper.Map<List<PerfilDTO>>(perfil);
        }

        /*\
         * =====================================================
         *                         VISTA
         * =====================================================
        \*/
        [HttpGet("detalles")]
        [AutorizacionPorPerfil(new string[] { "administrador" })]
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
        [AutorizacionPorPerfil(new string[] { "administrador" })]
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
        [AutorizacionPorPerfil(new string[] { "administrador" })]
        public async Task<ActionResult> AltaUsuario([FromBody] UsuarioCreacionDTO request)
        {
            try
            {

                //generado de hash de contraseña
                var cifrado = hashService.Hash(request.Password);

                var usuario = new SqlParameter("@USUARIO", System.Data.SqlDbType.VarChar)
                {
                    Direction = System.Data.ParameterDirection.Input,
                    Value = request.Usuario,
                    Size = 50
                };
                var password = new SqlParameter("@PASSWORD", System.Data.SqlDbType.VarChar)
                {
                    Direction = System.Data.ParameterDirection.Input,
                    Value = cifrado.Hash,
                    Size = 500
                };
                var idPerfil = new SqlParameter("@ID_PERFIL", System.Data.SqlDbType.Int)
                {
                    Direction = System.Data.ParameterDirection.Input,
                    Value = request.Id_Perfil
                };
                var email = new SqlParameter("@EMAIL", System.Data.SqlDbType.VarChar)
                {
                    Direction = System.Data.ParameterDirection.Input,
                    Value = request.Email,
                    Size = 50
                };
                var salt = new SqlParameter("@SALT", System.Data.SqlDbType.VarChar)
                {
                    Direction = System.Data.ParameterDirection.Input,
                    Value = Convert.ToBase64String(cifrado.Sal),
                    Size = 500
                };
                var invoker = new SqlParameter("@INVOKER", System.Data.SqlDbType.Int)
                {
                    Direction = System.Data.ParameterDirection.Output,
                };
                var retcode = new SqlParameter("@RETCODE", System.Data.SqlDbType.Int)
                {
                    Direction = System.Data.ParameterDirection.Output,
                };
                var mensaje = new SqlParameter("@MENSAJE", System.Data.SqlDbType.VarChar)
                {
                    Direction = System.Data.ParameterDirection.Output,
                    Size = 8000
                };

                SqlParameter[] parametros = new SqlParameter[8]
               {
                    usuario,
                    password,
                    idPerfil,
                    email,
                    salt,
                    invoker,
                    retcode,
                    mensaje
                };



                string PA_ALTA_USUARIO = "EXEC PA_ALTA_USUARIO @USUARIO, @PASSWORD, @ID_PERFIL, @EMAIL, @SALT,@INVOKER, @RETCODE OUTPUT, @MENSAJE OUTPUT";

                await context.Database.ExecuteSqlRawAsync(PA_ALTA_USUARIO, parametros);

                if ((int)retcode.Value > 0)
                {
                    return BadRequest(new ResponseWrapper<bool, bool>()
                    {
                        Mensaje = mensaje.Value.ToString(),
                        RetCode = (int)retcode.Value
                    });
                }

                if ((int)retcode.Value == 0)
                {
                    return base.Ok(new ResponseWrapper<bool, bool>()
                    {
                        Mensaje = mensaje.Value.ToString(),
                        RetCode = (int)retcode.Value
                    });
                }

                if ((int)retcode.Value < 0)
                {
                    return StatusCode(500, new ResponseWrapper<bool, bool>()
                    {
                        Mensaje = mensaje.Value.ToString(),
                        RetCode = (int)retcode.Value
                    });
                }


                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode(500, new ResponseWrapper<bool, bool>()
                {
                    Mensaje = e.Message,
                    RetCode = -1
                });
            }

        }
        [HttpPost("editar_usuario")]
        [AutorizacionPorPerfil(new string[] { "administrador" })]
        public async Task<ActionResult> CambiarUsuario([FromBody] CambiarDatosUsuarioRequest request)
        {
            try
            {
                var existeUsuario = await context.USUARIOS.AnyAsync(x => x.Id_Usuario == request.Id_Usuario);

                if (!existeUsuario)
                {
                    return BadRequest($"No existe un usuario con el ID: {request.Id_Usuario}");
                }

                //generado de hash de contraseña
                var cifrado = hashService.Hash(request.Password);

                var idUsuario = new SqlParameter("@ID_USUARIO", System.Data.SqlDbType.Int)
                {
                    Direction = System.Data.ParameterDirection.Input,
                    Value = request.Id_Usuario,
                };
                var usuario = new SqlParameter("@USUARIO", System.Data.SqlDbType.VarChar)
                {
                    Direction = System.Data.ParameterDirection.Input,
                    Value = request.Usuario,
                    Size = 50
                };
                var password = new SqlParameter("@PASSWORD", System.Data.SqlDbType.VarChar)
                {
                    Direction = System.Data.ParameterDirection.Input,
                    Value = cifrado.Hash,
                    Size = 500
                };
                var idPerfil = new SqlParameter("@ID_PERFIL", System.Data.SqlDbType.Int)
                {
                    Direction = System.Data.ParameterDirection.Input,
                    Value = request.Id_Perfil
                };
                var email = new SqlParameter("@EMAIL", System.Data.SqlDbType.VarChar)
                {
                    Direction = System.Data.ParameterDirection.Input,
                    Value = request.Email,
                    Size = 50
                };
                var salt = new SqlParameter("@SALT", System.Data.SqlDbType.VarChar)
                {
                    Direction = System.Data.ParameterDirection.Input,
                    Value = Convert.ToBase64String(cifrado.Sal),
                    Size = 500
                };
                var invoker = new SqlParameter("@INVOKER", System.Data.SqlDbType.Int)
                {
                    Direction = System.Data.ParameterDirection.Output,
                };
                var retcode = new SqlParameter("@RETCODE", System.Data.SqlDbType.Int)
                {
                    Direction = System.Data.ParameterDirection.Output,
                };
                var mensaje = new SqlParameter("@MENSAJE", System.Data.SqlDbType.VarChar)
                {
                    Direction = System.Data.ParameterDirection.Output,
                    Size = 8000
                };

                SqlParameter[] parametros = new SqlParameter[9]
               {
                    idUsuario,
                    usuario,
                    password,
                    idPerfil,
                    email,
                    salt,
                    invoker,
                    retcode,
                    mensaje
                };

                string PA_EDITAR_USUARIO = "EXEC PA_EDITAR_USUARIO @ID_USUARIO, @USUARIO, @PASSWORD, @ID_PERFIL, @EMAIL, @SALT, @INVOKER, @RETCODE OUTPUT, @MENSAJE OUTPUT";

                await context.Database.ExecuteSqlRawAsync(PA_EDITAR_USUARIO, parametros);

                if ((int)retcode.Value > 0)
                {
                    return BadRequest(new ResponseWrapper<bool, bool>()
                    {
                        Mensaje = mensaje.Value.ToString(),
                        RetCode = (int)retcode.Value
                    });
                }

                if ((int)retcode.Value == 0)
                {
                    return base.Ok(new ResponseWrapper<bool, bool>()
                    {
                        Mensaje = mensaje.Value.ToString(),
                        RetCode = (int)retcode.Value
                    });
                }

                if ((int)retcode.Value < 0)
                {
                    return StatusCode(500, new ResponseWrapper<bool, bool>()
                    {
                        Mensaje = mensaje.Value.ToString(),
                        RetCode = (int)retcode.Value
                    });
                }


                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode(500, new ResponseWrapper<bool, bool>()
                {
                    Mensaje = e.Message,
                    RetCode = -1
                });
            }
        }
        [HttpPost("baja_usuario")]
        [AutorizacionPorPerfil(new string[] { "administrador" })]
        public async Task<ActionResult> BajaUsuario(CambiarEstadoUsuarioRequest request)
        {
            try
            {
                var existeUsuario = await context.USUARIOS.AnyAsync(x => x.Id_Usuario == request.Id_Usuario);

                if (!existeUsuario)
                {
                    return BadRequest($"No existe un usuario con el ID: {request.Id_Usuario}");
                }

                var idUsuario = new SqlParameter("@ID_USUARIO", System.Data.SqlDbType.Int)
                {
                    Direction = System.Data.ParameterDirection.Input,
                    Value = request.Id_Usuario,
                };
                var invoker = new SqlParameter("@INVOKER", System.Data.SqlDbType.Int)
                {
                    Direction = System.Data.ParameterDirection.Output,
                };
                var retcode = new SqlParameter("@RETCODE", System.Data.SqlDbType.Int)
                {
                    Direction = System.Data.ParameterDirection.Output,
                };
                var mensaje = new SqlParameter("@MENSAJE", System.Data.SqlDbType.VarChar)
                {
                    Direction = System.Data.ParameterDirection.Output,
                    Size = 8000
                };

                SqlParameter[] parametros = new SqlParameter[4]
                {
                    idUsuario,
                    invoker,
                    retcode,
                    mensaje
                 };


                string PA_BAJA_USUARIO = "EXEC PA_BAJA_USUARIO @ID_USUARIO, @INVOKER, @RETCODE OUTPUT, @MENSAJE OUTPUT";

                await context.Database.ExecuteSqlRawAsync(PA_BAJA_USUARIO, parametros);

                if ((int)retcode.Value > 0)
                {
                    return BadRequest(new ResponseWrapper<bool, bool>()
                    {
                        Mensaje = mensaje.Value.ToString(),
                        RetCode = (int)retcode.Value
                    });
                }

                if ((int)retcode.Value == 0)
                {
                    return base.Ok(new ResponseWrapper<bool, bool>()
                    {
                        Mensaje = mensaje.Value.ToString(),
                        RetCode = (int)retcode.Value
                    });
                }

                if ((int)retcode.Value < 0)
                {
                    return StatusCode(500, new ResponseWrapper<bool, bool>()
                    {
                        Mensaje = mensaje.Value.ToString(),
                        RetCode = (int)retcode.Value,
                    });
                }

                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode(500, new ResponseWrapper<bool, bool>()
                {
                    Mensaje = e.Message,
                    RetCode = -1
                });
            }
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<ActionResult<ResponseWrapper<Usuario, RespuestaAutenticacion>>> loginUsuario([FromBody] LoginRequest request)
        {
            try
            {
                var usuario = await context.USUARIOS.Where(x => x.usuario == request.Usuario).FirstOrDefaultAsync();

                if (usuario == null)
                {
                    return BadRequest("Usuario o contraseña no conciden.");
                }

                var cifrado = hashService.Hash(request.Password, Convert.FromBase64String(usuario.Salt));


                var login = new SqlParameter("@LOGIN", System.Data.SqlDbType.VarChar)
                {
                    Direction = System.Data.ParameterDirection.Input,
                    Value = request.Usuario,
                    Size = 50
                };
                var password = new SqlParameter("@PASSWORD", System.Data.SqlDbType.VarChar)
                {
                    Direction = System.Data.ParameterDirection.Input,
                    Value = cifrado.Hash,
                    Size = 500
                };
                var invoker = new SqlParameter("@INVOKER", System.Data.SqlDbType.Int)
                {
                    Direction = System.Data.ParameterDirection.Output,
                };
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
                    login,
                    password,
                    invoker,
                    jsonOut,
                    retcode,
                    mensaje
                 };

                string PA_LOGIN = "EXEC PA_LOGIN @LOGIN, @PASSWORD, @INVOKER, @JSON_OUT OUTPUT, @RETCODE OUTPUT, @MENSAJE OUTPUT";

                await context.Database.ExecuteSqlRawAsync(PA_LOGIN, parametros);

                if ((int)retcode.Value > 0)
                {
                    return BadRequest(new ResponseWrapper<Usuario, RespuestaAutenticacion>()
                    {
                        Mensaje = mensaje.Value.ToString(),
                        RetCode = (int)retcode.Value
                    });
                }

                if ((int)retcode.Value == 0)
                {
                    return base.Ok(new ResponseWrapper<Usuario, RespuestaAutenticacion>()
                    {
                        Mensaje = mensaje.Value.ToString(),
                        RetCode = (int)retcode.Value,
                        Value = JsonConvert.DeserializeObject<Usuario>(jsonOut.Value.ToString()),
                        Token = await tokenService.ConstruirToken(request)
                    });
                }

                if ((int)retcode.Value < 0)
                {
                    return StatusCode(500, new ResponseWrapper<Usuario, RespuestaAutenticacion>()
                    {
                        Mensaje = mensaje.Value.ToString(),
                        RetCode = (int)retcode.Value,
                    });
                }

                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode(500, new ResponseWrapper<Usuario, RespuestaAutenticacion>()
                {
                    Mensaje = e.Message,
                    RetCode = -1
                });
            }
        }




    }
}

