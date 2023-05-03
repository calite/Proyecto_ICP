using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using RespuestosAPI.BBDD;
using RespuestosAPI.DTOs;
using RespuestosAPI.Entidades;
using RespuestosAPI.Requests;
using RespuestosAPI.Servicios;

namespace RespuestosAPI.Controllers
{
    [ApiController]
    [Route("api/articulos")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class ArticulosController : Controller
    {

        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;

        public ArticulosController(ApplicationDbContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        /*\
            * =====================================================
            *                         GET
            * =====================================================
        \*/

        [HttpGet("all")]
        [AllowAnonymous]
        public async Task<ActionResult<ArticuloDTO>> GetTodosLosArticulos()
        {
            try
            {
                var articulos = await context.ARTICULOS.ToListAsync();

                if (articulos.Count == 0)
                {
                    return BadRequest($"No existen ARTICULOS");
                }

                return Ok(mapper.Map<List<ArticuloDTO>>(articulos));
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        [HttpGet("all_visibles")]
        [AllowAnonymous]
        public async Task<ActionResult<ArticuloDTO>> GetTodosLosArticulosVisibles()
        {
            try
            {
                var articulos = await context.ARTICULOS.Where(x => x.Activo == 1).ToListAsync();

                if (articulos.Count == 0)
                {
                    return BadRequest($"No existen ARTICULOS");
                }

                return Ok(mapper.Map<List<ArticuloDTO>>(articulos));
            }
            catch (Exception e)
            {
                throw e;
            }
        }


        [HttpGet("{IdArticulo:int}")]
        [AutorizacionPorPerfil(new string[] { "administrador","gestor","operador" })]
        public async Task<ActionResult<ArticuloDTO>> GetArticuloPorId(int IdArticulo)
        {
            try
            {
                var articulos = await context.ARTICULOS.Where(x => x.Id_Articulo == IdArticulo).ToListAsync();

                if (articulos.Count == 0)
                {
                    return BadRequest($"No existe un ARTICULO con ese ID: {IdArticulo}");
                }

                return Ok(mapper.Map<List<ArticuloDTO>>(articulos));
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

        [HttpPost("alta_articulo")]
        [AutorizacionPorPerfil(new string[] { "administrador" })]
        public async Task<ActionResult> AltaArticulo(ArticuloCreacionDTO a)
        {
            try
            {
                var marca = new SqlParameter("@MARCA", System.Data.SqlDbType.VarChar)
                {
                    Direction = System.Data.ParameterDirection.Input,
                    Value = a.Marca,
                    Size = 50
                };

                var modelo = new SqlParameter("@MODELO", System.Data.SqlDbType.VarChar)
                {
                    Direction = System.Data.ParameterDirection.Input,
                    Value = a.Modelo,
                    Size = 50
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

                SqlParameter[] parametros = new SqlParameter[5]
                {
                    marca,
                    modelo,
                    invoker,
                    retcode,
                    mensaje
                };

                string PA_ALTA_ARTICULO = "EXEC PA_ALTA_ARTICULO @MARCA,@MODELO,@INVOKER,@RETCODE OUTCODE,@MENSAJE OUTCODE";

                await context.Database.ExecuteSqlRawAsync(PA_ALTA_ARTICULO, parametros);

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

        [HttpPost("baja_articulo")]
        [AutorizacionPorPerfil(new string[] { "administrador" })]
        public async Task<ActionResult> BajaArticulo(CambiarEstadoArticuloRequest request)
        {
            try
            {
                var existeArticulo = await context.ARTICULOS.AnyAsync(x => x.Id_Articulo == request.IdArticulo);

                if (!existeArticulo)
                {
                    return BadRequest($"No existe un ARTICULO con el ID: {request.IdArticulo}");
                }

                var idArticulo = new SqlParameter("@ID_ARTICULO", System.Data.SqlDbType.Int)
                {
                    Direction = System.Data.ParameterDirection.Input,
                    Value = request.IdArticulo
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
                    idArticulo,
                    invoker,
                    retcode,
                    mensaje
                 };

                string PA_BAJA_ARTICULO = "EXEC PA_BAJA_ARTICULO @ID_ARTICULO,@INVOKER,@RETCODE OUTCODE,@MENSAJE OUTCODE";

                await context.Database.ExecuteSqlRawAsync(PA_BAJA_ARTICULO, parametros);
                
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

        [HttpPost("editar_articulo")]
        [AutorizacionPorPerfil(new string[] { "administrador" })]
        public async Task<ActionResult> EditarArticulo(ArticuloEdicionDTO a)
        {
            try
            {
                var existeArticulo = await context.ARTICULOS.AnyAsync(x => x.Id_Articulo == a.Id_Articulo);

                if (!existeArticulo)
                {
                    return BadRequest($"No existe un ARTICULO con el ID: {a.Id_Articulo}");
                }

                var idArticulo = new SqlParameter("@ID_ARTICULO", System.Data.SqlDbType.Int)
                {
                    Direction = System.Data.ParameterDirection.Input,
                    Value = a.Id_Articulo
                };

                var marca = new SqlParameter("@MARCA", System.Data.SqlDbType.VarChar)
                {
                    Direction = System.Data.ParameterDirection.Input,
                    Value = a.Marca,
                    Size = 30
                };

                var modelo = new SqlParameter("@MODELO", System.Data.SqlDbType.VarChar)
                {
                    Direction = System.Data.ParameterDirection.Input,
                    Value = a.Modelo,
                    Size = 30
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

                SqlParameter[] parametros = new SqlParameter[6]
                {
                    idArticulo,
                    marca,
                    modelo,
                    invoker,
                    retcode,
                    mensaje
                 };

                string PA_CAMBIAR_ARTICULO = "EXEC PA_CAMBIAR_ARTICULO @ID_ARTICULO,@MARCA,@MODELO,@INVOKER,@RETCODE OUTPUT,@MENSAJE OUTPUT";

                return Ok(await context.Database.ExecuteSqlRawAsync(PA_CAMBIAR_ARTICULO, parametros));
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }

}
