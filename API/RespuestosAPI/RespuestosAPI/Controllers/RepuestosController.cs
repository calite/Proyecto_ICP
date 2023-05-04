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

namespace RespuestosAPI.Controllers
{
    [ApiController]
    [Route("api/repuestos")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class RepuestosController : Controller
    {
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;

        public RepuestosController(ApplicationDbContext context, IMapper mapper)
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
        [AutorizacionPorPerfil(new string[] { "administrador", "gestor" })]
        public async Task<ActionResult<RepuestoDTO>> GetTodosLosRepuestos()
        {
            try
            {
                var repuestos = await context.REPUESTOS.ToListAsync();

                if (repuestos.Count == 0)
                {
                    return BadRequest($"No existen REPUESTOS");
                }

                return Ok(mapper.Map<List<RepuestoDTO>>(repuestos));
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        [HttpGet("{IdRepuesto:int}")]
        [AutorizacionPorPerfil(new string[] { "administrador", "gestor" })]
        public async Task<ActionResult<RepuestoDTO>> GetRepuestoPorId(int IdRepuesto)
        {
            try
            {
                var repuesto = await context.REPUESTOS.Where(x => x.Id_Repuesto == IdRepuesto).ToListAsync();

                if (repuesto.Count == 0)
                {
                    return BadRequest($"No existe un REPUESTO con ese ID: {IdRepuesto}");
                }

                return Ok(mapper.Map<List<RepuestoDTO>>(repuesto));
            }
            catch (Exception e)
            {

                throw e;
            }
        }

        /*\
         * =====================================================
         *                         VISTA
         * =====================================================
        \*/
        [HttpGet("stock")]
        [AutorizacionPorPerfil(new string[] { "administrador", "gestor" })]
        public async Task<ActionResult<IEnumerable<StockRepuesto>>> GetStockRepuestos()
        {
            try
            {
                var stock_repuestos = await context.V_STOCKS_REPUESTOS.ToListAsync();

                if (stock_repuestos.Count == 0)
                {
                    return BadRequest($"No existen REPUESTOS");
                }

                return Ok(stock_repuestos);
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
        [HttpPost("alta_repuesto")]
        [AutorizacionPorPerfil(new string[] { "administrador" })]
        public async Task<ActionResult> AltaRepuesto(RepuestoCreacionDTO r)
        {//string descripcionRepuesto, string fabricante, int peso, int alto, int largo, int ancho, string imagen, int cantidad
            try
            {

                var descripcionRepuesto = new SqlParameter("@DESCRIPCION_REPUESTO", System.Data.SqlDbType.VarChar)
                {
                    Direction = System.Data.ParameterDirection.Input,
                    Value = r.Descripcion_Repuesto,
                    Size = 50
                };
                var fabricante = new SqlParameter("@FABRICANTE", System.Data.SqlDbType.VarChar)
                {
                    Direction = System.Data.ParameterDirection.Input,
                    Value = r.Fabricante,
                    Size = 50
                };
                var peso = new SqlParameter("@PESO", System.Data.SqlDbType.Int)
                {
                    Direction = System.Data.ParameterDirection.Input,
                    Value = r.Peso
                };
                var alto = new SqlParameter("@ALTO", System.Data.SqlDbType.Int)
                {
                    Direction = System.Data.ParameterDirection.Input,
                    Value = r.Alto
                };
                var largo = new SqlParameter("@LARGO", System.Data.SqlDbType.Int)
                {
                    Direction = System.Data.ParameterDirection.Input,
                    Value = r.Largo
                };
                var ancho = new SqlParameter("@ANCHO", System.Data.SqlDbType.Int)
                {
                    Direction = System.Data.ParameterDirection.Input,
                    Value = r.Ancho,
                };
                var imagen = new SqlParameter("@IMAGEN", System.Data.SqlDbType.VarChar)
                {
                    Direction = System.Data.ParameterDirection.Input,
                    Value = r.Imagen,
                    Size = int.MaxValue
                };
                var cantidad = new SqlParameter("@CANTIDAD", System.Data.SqlDbType.Int)
                {
                    Direction = System.Data.ParameterDirection.Input,
                    Value = r.Cantidad,
                };
                var descripcionSintoma = new SqlParameter("@DESCRIPCION_SINTOMA", System.Data.SqlDbType.VarChar)
                {
                    Direction = System.Data.ParameterDirection.Input,
                    Value = r.Descripcion_Sintoma,
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


                SqlParameter[] parametros = new SqlParameter[12]
                {
                    descripcionRepuesto,
                    fabricante,
                    peso,
                    alto,
                    largo,
                    ancho,
                    imagen,
                    cantidad,
                    descripcionSintoma,
                    invoker,
                    retcode,
                    mensaje
                };

                string PA_ALTA_REPUESTO = "EXEC PA_ALTA_REPUESTO @DESCRIPCION_REPUESTO,@FABRICANTE,@PESO,@ALTO,@LARGO,@ANCHO,@IMAGEN,@CANTIDAD,@DESCRIPCION_SINTOMA,@INVOKER,@RETCODE OUTPUT,@MENSAJE OUTPUT";

                await context.Database.ExecuteSqlRawAsync(PA_ALTA_REPUESTO, parametros);

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
        [HttpPost("editar_repuesto")]
        [AutorizacionPorPerfil(new string[] { "administrador" })]
        public async Task<ActionResult> EditarRepuesto(RepuestoEdicionDTO r)
        {//string id, descripcionRepuesto, string fabricante, int peso, int alto, int largo, int ancho, string imagen
            try
            {
                var idRepuesto = new SqlParameter("@ID_REPUESTO", System.Data.SqlDbType.Int)
                {
                    Direction = System.Data.ParameterDirection.Input,
                    Value = r.Id_Repuesto
                };

                var descripcionRepuesto = new SqlParameter("@DESCRIPCION_REPUESTO", System.Data.SqlDbType.VarChar)
                {
                    Direction = System.Data.ParameterDirection.Input,
                    Value = r.Descripcion_Repuesto,
                    Size = 50
                };

                var fabricante = new SqlParameter("@FABRICANTE", System.Data.SqlDbType.VarChar)
                {
                    Direction = System.Data.ParameterDirection.Input,
                    Value = r.Fabricante,
                    Size = 50
                };

                var peso = new SqlParameter("@PESO", System.Data.SqlDbType.Int)
                {
                    Direction = System.Data.ParameterDirection.Input,
                    Value = r.Peso
                };

                var alto = new SqlParameter("@ALTO", System.Data.SqlDbType.Int)
                {
                    Direction = System.Data.ParameterDirection.Input,
                    Value = r.Alto
                };

                var largo = new SqlParameter("@LARGO", System.Data.SqlDbType.Int)
                {
                    Direction = System.Data.ParameterDirection.Input,
                    Value = r.Largo
                };

                var ancho = new SqlParameter("@ANCHO", System.Data.SqlDbType.Int)
                {
                    Direction = System.Data.ParameterDirection.Input,
                    Value = r.Ancho,
                };

                var imagen = new SqlParameter("@IMAGEN", System.Data.SqlDbType.VarChar)
                {
                    Direction = System.Data.ParameterDirection.Input,
                    Value = r.Imagen,
                    Size = int.MaxValue
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

                SqlParameter[] parametros = new SqlParameter[11]
                {
                    idRepuesto,
                    descripcionRepuesto,
                    fabricante,
                    peso,
                    alto,
                    largo,
                    ancho,
                    imagen,
                    invoker,
                    retcode,
                    mensaje
                };

                string PA_EDITAR_REPUESTO = "EXEC PA_EDITAR_REPUESTO @ID_REPUESTO,@DESCRIPCION_REPUESTO,@FABRICANTE,@PESO,@ALTO,@LARGO,@ANCHO,@IMAGEN,@INVOKER,@RETCODE OUTPUT,@MENSAJE OUTPUT";

                await context.Database.ExecuteSqlRawAsync(PA_EDITAR_REPUESTO, parametros);

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
        [HttpPost("baja_repuesto")]
        [AutorizacionPorPerfil(new string[] { "administrador" })]
        public async Task<ActionResult> BajaRepuesto(CambiarEstadoRepuestoRequest request)
        {
            try
            {
                var existeRepuesto = await context.REPUESTOS.AnyAsync(x => x.Id_Repuesto == request.IdRepuesto);

                if (!existeRepuesto)
                {
                    return BadRequest($"No existe un repuesto con el ID: {request.IdRepuesto}");
                }

                var idRepuesto = new SqlParameter("@ID_REPUESTO", System.Data.SqlDbType.Int)
                {
                    Direction = System.Data.ParameterDirection.Input,
                    Value = request.IdRepuesto
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
                    idRepuesto,
                    invoker,
                    retcode,
                    mensaje
                };

                string PA_BAJA_REPUESTO = "EXEC PA_BAJA_REPUESTO @ID_REPUESTO, @INVOKER, @RETCODE OUTPUT, @MENSAJE OUTPUT";

                context.Database.ExecuteSqlRaw(PA_BAJA_REPUESTO, parametros);
                
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
        [HttpPost("cambiar_stocks")]
        [AutorizacionPorPerfil(new string[] { "administrador", "gestor" })]
        public async Task<ActionResult> CambiarStock([FromBody] CambiarStockRequest request)
        {
            try
            {
                var existeRepuesto = await context.STOCKS.AnyAsync(x => x.Id_Repuesto == request.IdRepuesto);

                if (!existeRepuesto)
                {
                    return BadRequest($"No existe un REPUESTO con el ID: {request.IdRepuesto}");
                }

                var idRepuesto = new SqlParameter("@ID_REPUESTO", System.Data.SqlDbType.Int)
                {
                    Direction = System.Data.ParameterDirection.Input,
                    Value = request.IdRepuesto
                };

                var cantidad = new SqlParameter("@CANTIDAD", System.Data.SqlDbType.Int)
                {
                    Direction = System.Data.ParameterDirection.Input,
                    Value = request.Cantidad
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
                    idRepuesto,
                    cantidad,
                    invoker,
                    retcode,
                    mensaje
                };

                string PA_CAMBIAR_STOCK = "EXEC PA_CAMBIAR_STOCK @ID_REPUESTO, @CANTIDAD, @INVOKER, @RETCODE OUTPUT, @MENSAJE OUTPUT";


                await context.Database.ExecuteSqlRawAsync(PA_CAMBIAR_STOCK, parametros);

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
    }
}
