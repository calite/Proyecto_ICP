using AutoMapper;
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
        /*
        [HttpPost("alta_repuesto")]
        public async Task<ActionResult> AltaRepuesto(RepuestoCreacionDTO r)
        {//string descripcionRepuesto, string fabricante, int peso, int alto, int largo, int ancho, string imagen, int cantidad
            try
            {
                SqlParameter[] parametros = new SqlParameter[11]
                {
                    new SqlParameter("@DESCRIPCION_REPUESTO", System.Data.SqlDbType.VarChar)
                    {
                        Direction = System.Data.ParameterDirection.Input,
                        Value = r.Descripcion_Repuesto,
                        Size = 50
                    },
                    new SqlParameter("@FABRICANTE", System.Data.SqlDbType.VarChar)
                    {
                        Direction = System.Data.ParameterDirection.Input,
                        Value = r.Fabricante,
                        Size = 50
                    },
                    new SqlParameter("@PESO", System.Data.SqlDbType.Int)
                    {
                        Direction = System.Data.ParameterDirection.Input,
                        Value = r.Peso
                    },
                    new SqlParameter("@ALTO", System.Data.SqlDbType.Int)
                    {
                        Direction = System.Data.ParameterDirection.Input,
                        Value = r.Alto
                    },
                    new SqlParameter("@LARGO", System.Data.SqlDbType.Int)
                    {
                        Direction = System.Data.ParameterDirection.Input,
                        Value = r.Largo
                    },
                    new SqlParameter("@ANCHO", System.Data.SqlDbType.Int)
                    {
                        Direction = System.Data.ParameterDirection.Input,
                        Value = r.Ancho,
                    },
                    new SqlParameter("@IMAGEN", System.Data.SqlDbType.VarChar)
                    {
                        Direction = System.Data.ParameterDirection.Input,
                        Value = r.Imagen,
                        Size = 200
                    },
                    new SqlParameter("@CANTIDAD", System.Data.SqlDbType.Int)
                    {
                        Direction = System.Data.ParameterDirection.Input,
                        Value = r.Cantidad,
                    },
                    new SqlParameter("@INVOKER", System.Data.SqlDbType.Int)
                    {
                        Direction = System.Data.ParameterDirection.Output,
                    },
                    new SqlParameter("@RETCODE", System.Data.SqlDbType.Int)
                    {
                        Direction = System.Data.ParameterDirection.Output,
                    },
                    new SqlParameter("@MENSAJE", System.Data.SqlDbType.VarChar)
                    {
                        Direction = System.Data.ParameterDirection.Output,
                        Size = 8000
                    }
                };

                string PA_ALTA_REPUESTO = "EXEC PA_ALTA_REPUESTO @DESCRIPCION_REPUESTO,@FABRICANTE,@PESO,@ALTO,@LARGO,@ANCHO,@IMAGEN,@CANTIDAD,@INVOKER,@RETCODE,@MENSAJE";

                return Ok(await context.Database.ExecuteSqlRawAsync(PA_ALTA_REPUESTO, parametros));

            }
            catch (Exception e)
            {
                throw e;
            }

        }

        [HttpPost("editar_repuesto")]
        public async Task<ActionResult> EditarRepuesto(RepuestoEdicionDTO r)
        {//string id, descripcionRepuesto, string fabricante, int peso, int alto, int largo, int ancho, string imagen
            try
            {
                SqlParameter[] parametros = new SqlParameter[11]
                {
                     new SqlParameter("@ID_REPUESTO", System.Data.SqlDbType.Int)
                    {
                        Direction = System.Data.ParameterDirection.Input,
                        Value = r.Id_Repuesto
                    },
                    new SqlParameter("@DESCRIPCION_REPUESTO", System.Data.SqlDbType.VarChar)
                    {
                        Direction = System.Data.ParameterDirection.Input,
                        Value = r.Descripcion_Repuesto,
                        Size = 50
                    },
                    new SqlParameter("@FABRICANTE", System.Data.SqlDbType.VarChar)
                    {
                        Direction = System.Data.ParameterDirection.Input,
                        Value = r.Fabricante,
                        Size = 50
                    },
                    new SqlParameter("@PESO", System.Data.SqlDbType.Int)
                    {
                        Direction = System.Data.ParameterDirection.Input,
                        Value = r.Peso
                    },
                    new SqlParameter("@ALTO", System.Data.SqlDbType.Int)
                    {
                        Direction = System.Data.ParameterDirection.Input,
                        Value = r.Alto
                    },
                    new SqlParameter("@LARGO", System.Data.SqlDbType.Int)
                    {
                        Direction = System.Data.ParameterDirection.Input,
                        Value = r.Largo
                    },
                    new SqlParameter("@ANCHO", System.Data.SqlDbType.Int)
                    {
                        Direction = System.Data.ParameterDirection.Input,
                        Value = r.Ancho,
                    },
                    new SqlParameter("@IMAGEN", System.Data.SqlDbType.VarChar)
                    {
                        Direction = System.Data.ParameterDirection.Input,
                        Value = r.Imagen,
                        Size = 200
                    },
                    new SqlParameter("@INVOKER", System.Data.SqlDbType.Int)
                    {
                        Direction = System.Data.ParameterDirection.Output,
                    },
                    new SqlParameter("@RETCODE", System.Data.SqlDbType.Int)
                    {
                        Direction = System.Data.ParameterDirection.Output,
                    },
                    new SqlParameter("@MENSAJE", System.Data.SqlDbType.VarChar)
                    {
                        Direction = System.Data.ParameterDirection.Output,
                        Size = 8000
                    }
                };

                string PA_EDITAR_REPUESTO = "EXEC PA_EDITAR_REPUESTO @ID_REPUESTO,@DESCRIPCION_REPUESTO,@FABRICANTE,@PESO,@ALTO,@LARGO,@ANCHO,@IMAGEN,@INVOKER,@RETCODE,@MENSAJE";

                return Ok(await context.Database.ExecuteSqlRawAsync(PA_EDITAR_REPUESTO, parametros));

            }
            catch (Exception e)
            {
                throw e;
            }

        }
        */
        [HttpPost("baja_repuesto")]
        public async Task<ActionResult> BajaRepuesto(CambiarEstadoRepuestoRequest request)
        {
            try
            {
                var existeRepuesto = await context.REPUESTOS.AnyAsync(x => x.Id_Repuesto == request.IdRepuesto);

                if (!existeRepuesto)
                {
                    return BadRequest($"No existe un repuesto con el ID: {request.IdRepuesto}");
                }

                SqlParameter[] parametros = new SqlParameter[4]
                {
                    new SqlParameter("@ID_REPUESTO", System.Data.SqlDbType.Int)
                    {
                        Direction = System.Data.ParameterDirection.Input,
                        Value = request.IdRepuesto
                    },
                    new SqlParameter("@INVOKER", System.Data.SqlDbType.Int)
                    {
                        Direction = System.Data.ParameterDirection.Output,
                    },
                    new SqlParameter("@RETCODE", System.Data.SqlDbType.Int)
                    {
                        Direction = System.Data.ParameterDirection.Output,
                    },
                    new SqlParameter("@MENSAJE", System.Data.SqlDbType.VarChar)
                    {
                        Direction = System.Data.ParameterDirection.Output,
                        Size = 2000
                    }
                };

                string PA_BAJA_REPUESTO = "EXEC PA_BAJA_REPUESTO @ID_REPUESTO, @INVOKER, @RETCODE, @MENSAJE";

                return Ok(context.Database.ExecuteSqlRaw(PA_BAJA_REPUESTO, parametros));
            }
            catch (Exception e)
            {
                throw e;
            }

        }

        [HttpPost("cambiar_stocks")]
        public async Task<ActionResult> CambiarStock([FromBody] CambiarStockRequest request)
        {
            try
            {
                var existeRepuesto = await context.STOCKS.AnyAsync(x => x.Id_Repuesto == request.IdRepuesto);

                if (!existeRepuesto)
                {
                    return BadRequest($"No existe un REPUESTO con el ID: {request.IdRepuesto}");
                }

                SqlParameter[] parametros = new SqlParameter[5]
                {
                    new SqlParameter("@ID_REPUESTO", System.Data.SqlDbType.Int)
                    {
                        Direction = System.Data.ParameterDirection.Input,
                        Value = request.IdRepuesto
                    },
                    new SqlParameter("@CANTIDAD", System.Data.SqlDbType.Int)
                    {
                        Direction = System.Data.ParameterDirection.Input,
                        Value = request.Cantidad
                    },
                    new SqlParameter("@INVOKER", System.Data.SqlDbType.Int)
                    {
                        Direction = System.Data.ParameterDirection.Output,
                    },
                    new SqlParameter("@RETCODE", System.Data.SqlDbType.Int)
                    {
                        Direction = System.Data.ParameterDirection.Output,
                    },
                    new SqlParameter("@MENSAJE", System.Data.SqlDbType.VarChar)
                    {
                        Direction = System.Data.ParameterDirection.Output,
                        Size = 2000
                        
                    }
                };

                string PA_CAMBIAR_STOCK = "EXEC PA_CAMBIAR_STOCK @ID_REPUESTO, @CANTIDAD, @INVOKER, @RETCODE, @MENSAJE";

                var resp = context.Database.ExecuteSqlRaw(PA_CAMBIAR_STOCK, parametros);
                 
                

                return Ok(context.Database.ExecuteSqlRaw(PA_CAMBIAR_STOCK, parametros));
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}
