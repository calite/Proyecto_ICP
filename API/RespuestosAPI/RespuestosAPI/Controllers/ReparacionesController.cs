using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using RespuestosAPI.DTOs;
using RespuestosAPI.Entidades;
using RespuestosAPI.Requests;
using System.Text.Json;

namespace RespuestosAPI.Controllers
{
    [ApiController]
    [Route("api/reparaciones")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class ReparacionesController : Controller
    {
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;

        public ReparacionesController(ApplicationDbContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        /*\
         * =====================================================
         *                         GET
         * =====================================================
        \*/
        

        [HttpGet("estados_reparacion")]
        [AllowAnonymous]
        public async Task<List<EstadoReparacionDTO>> GetEstadosReparacion()
        {
            try
            {
                var estado = await context.ESTADOS_REPARACION
                    .ToListAsync();

                return mapper.Map<List<EstadoReparacionDTO>>(estado);

            }
            catch (Exception ex)
            {
                throw ex;
            }

        }
        
        [HttpGet("estados_sintoma")]
        [AllowAnonymous]
        public async Task<List<EstadoSintomaDTO>> GetEstadosSintomas()
        {
            try
            {
                var estado = await context.ESTADOS_SINTOMA
                    .ToListAsync();

                return mapper.Map<List<EstadoSintomaDTO>>(estado);

            }
            catch (Exception ex)
            {
                throw ex;
            }

        }
        
        [HttpGet("sintomas")]
        [AllowAnonymous]
        public async Task<List<SintomaDTO>> GetSintomas()
        {
            try
            {
                var sintoma = await context.SINTOMAS.ToListAsync();
                return mapper.Map<List<SintomaDTO>>(sintoma);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        
        /*\
         * =====================================================
         *                         VISTAS
         * =====================================================
        \*/

        [HttpGet("detalles")]
        [AutorizacionPorPerfil(new string[] { "administrador", "gestor", "operador" })]
        public async Task<ActionResult<IEnumerable<ReparacionEstado>>> GetReparacionesEstado()
        {
            try
            {
                return await context.V_REPARACIONES_ESTADO.ToListAsync();
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        [HttpGet("envio/{IdReparacion:int}")]
        [AutorizacionPorPerfil(new string[] { "administrador", "gestor", "operador" })]
        public async Task<ActionResult<Envio>> GetEnvio(int IdReparacion)
        {
            try
            {
                var envio = await context.V_ENVIOS.Where(x => x.Id_Reparacion == IdReparacion).FirstOrDefaultAsync();

                if(envio == null)
                {
                    return BadRequest($"No existe un envio con ese ID: {IdReparacion}");
                }

                return envio;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        [HttpGet("recogida/{IdReparacion:int}")]
        [AutorizacionPorPerfil(new string[] { "administrador", "gestor", "operador" })]
        public async Task<ActionResult<Recogida>> GetRecogida(int IdReparacion)
        {
            try
            {
                var recogida = await context.V_RECOGIDAS.Where(x => x.Id_Reparacion == IdReparacion).FirstOrDefaultAsync();

                if(recogida == null)
                {
                    return BadRequest($"No existe una recogida con ese ID: {IdReparacion}");
                }

                return recogida;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        [HttpGet("detalles/{IdReparacion:int}")]
        [AutorizacionPorPerfil(new string[] { "administrador", "gestor", "operador" })]
        public async Task<ActionResult<ReparacionEstado>> GetReparacionEstadoPorId(int IdReparacion)
        {
            try
            {
                var reparaciones = await context.V_REPARACIONES_ESTADO.Where(x => x.Id_Reparacion == IdReparacion).FirstOrDefaultAsync();

                if(reparaciones == null)
                {
                    return BadRequest($"Ya existe una reparacion con ese ID: {IdReparacion}");
                }

                return reparaciones;

            }
            catch (Exception e)
            {
                throw e;
            }
        }

        [HttpGet("sintomas/{IdReparacion:int}")]
        [AutorizacionPorPerfil(new string[] { "administrador", "gestor", "operador" })]
        public async Task<ActionResult<IEnumerable<ReparacionSintomas>>> GetReparacionSintomaPorId(int IdReparacion)
        {
            try
            {
                var reparaciones = await context.V_REPARACION_SINTOMAS.Where(x => x.Id_Reparacion == IdReparacion).ToListAsync();

                if (reparaciones.Count == 0)
                {
                    return BadRequest($"No existe una reparacion con ese ID: {IdReparacion}");
                }

                return reparaciones;

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

        [HttpPost("alta_reparacion")]
        [AllowAnonymous]
        public async Task<ActionResult> AltaReparacion([FromBody] AltaReparacionRequest request)
        {
            try
            {
                var existeArticulo = await context.ARTICULOS.AnyAsync(x => x.Id_Articulo == request.Id_Articulo);

                if (!existeArticulo)
                {
                    return BadRequest($"No existe un ARTICULO con el ID: {request.Id_Articulo}");
                }

                int[] sintomas = request.Sintomas;
                int[] repuestos = request.Repuestos;

                string sintomasJson = JsonSerializer.Serialize(sintomas);
                string repuestosJson = JsonSerializer.Serialize(repuestos);

                var recogida = new RecogidaJson
                {
                    Calle_Recogida = request.Recogida_Calle,
                    Numero_Recogida = Int32.Parse(request.Recogida_Numero),
                    Poblacion_Recogida = request.Recogida_Poblacion,
                    Provincia_Recogida = request.Recogida_Provincia,
                    Codigo_Postal_Recogida = request.Recogida_Codigo_Postal,
                    Persona_Contacto_Recogida = request.Recogida_Persona_Contacto,
                    Telefono_Recogida = Int32.Parse(request.Recogida_Telefono)
                };

                var envio = new EnvioJson
                {
                    Calle_Envio = request.Envio_Calle,
                    Numero_Envio = Int32.Parse(request.Envio_Numero),
                    Poblacion_Envio = request.Envio_Poblacion,
                    Provincia_Envio = request.Envio_Provincia,
                    Codigo_Postal_Envio = request.Envio_Codigo_Postal,
                    Persona_Contacto_Envio = request.Envio_Persona_Contacto,
                    Telefono_Envio = Int32.Parse(request.Envio_Telefono)
                };

                string recogidaJson = JsonSerializer.Serialize(recogida);
                string envioJson = JsonSerializer.Serialize(envio);

                var idArticulo = new SqlParameter("@ID_ARTICULO", System.Data.SqlDbType.Int)
                {
                    Direction = System.Data.ParameterDirection.Input,
                    Value = request.Id_Articulo
                };
                var sintomasJSON = new SqlParameter("@SINTOMAS_JSON", System.Data.SqlDbType.VarChar)
                {
                    Direction = System.Data.ParameterDirection.Input,
                    Value = sintomasJson
                };
                var repuestosJSON = new SqlParameter("@REPUESTOS_JSON", System.Data.SqlDbType.VarChar)
                {
                    Direction = System.Data.ParameterDirection.Input,
                    Value = repuestosJson
                };
                var recogidaJSON = new SqlParameter("@RECOGIDA_JSON", System.Data.SqlDbType.VarChar)
                {
                    Direction = System.Data.ParameterDirection.Input,
                    Value = recogidaJson
                };
                var envioJSON = new SqlParameter("@ENVIO_JSON", System.Data.SqlDbType.VarChar)
                {
                    Direction = System.Data.ParameterDirection.Input,
                    Value = envioJson
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
                    idArticulo,
                    sintomasJSON,
                    repuestosJSON,
                    recogidaJSON,
                    envioJSON,
                    invoker,
                    retcode,
                    mensaje
                 };

                string PA_ALTA_REPARACION = "EXEC PA_ALTA_REPARACION @ID_ARTICULO,@SINTOMAS_JSON,@REPUESTOS_JSON,@RECOGIDA_JSON,@ENVIO_JSON,@INVOKER,@RETCODE OUTPUT,@MENSAJE OUTPUT";

                await context.Database.ExecuteSqlRawAsync(PA_ALTA_REPARACION, parametros);

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

        [HttpPost("cambiar_estado_reparacion")]
        [AutorizacionPorPerfil(new string[] { "administrador", "gestor" })]
        public async Task<ActionResult> CambiarEstadoReparacion([FromBody] CambiarEstadoReparacionRequest request)
        {
            try
            {
                
                var existeReparacion = await context.REPARACIONES.Where(x => x.Id_Reparacion == request.IdReparacion).AnyAsync();

                if (!existeReparacion)
                {
                    return BadRequest($"No existe una Reparacion con ese ID de reparacion: {request.IdReparacion}");
                }

                var IdReparacion = new SqlParameter("@ID_REPARACION", System.Data.SqlDbType.Int)
                {
                    Direction = System.Data.ParameterDirection.Input,
                    Value = request.IdReparacion
                };
                var IdEstadoReparacion = new SqlParameter("@ID_ESTADO_REPARACION", System.Data.SqlDbType.Int)
                {
                    Direction = System.Data.ParameterDirection.Input,
                    Value = request.IdEstadoReparacion
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
                    IdReparacion,
                    IdEstadoReparacion,
                    invoker,
                    retcode,
                    mensaje
                 };

                string PA_CAMBIAR_ESTADO_REPARACION = "EXEC PA_CAMBIAR_ESTADO_REPARACION @ID_REPARACION,@ID_ESTADO_REPARACION,@INVOKER,@RETCODE OUTPUT,@MENSAJE OUTPUT";


                await context.Database.ExecuteSqlRawAsync(PA_CAMBIAR_ESTADO_REPARACION, parametros);

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
                        RetCode = (int)retcode.Value,
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

        [HttpPost("cambiar_estado_sintoma")]
        [AutorizacionPorPerfil(new string[] { "administrador","operador" })]
        public async Task<ActionResult> CambiarEstadoSintoma([FromBody] CambiarEstadoSintomaRequest request)
        {
            try
            {

                var existeReparacion = await context.REPARACIONES.Where(x => x.Id_Reparacion == request.IdReparacion).AnyAsync();

                if (!existeReparacion)
                {
                    return BadRequest($"No existe una Reparacion con ese ID de reparacion: {request.IdReparacion}");
                }

                var IdReparacionSintomaEstado = new SqlParameter("@ID_REPARACION_SINTOMA_ESTADO", System.Data.SqlDbType.Int)
                {
                    Direction = System.Data.ParameterDirection.Input,
                    Value = request.IdReparacionSintomaEstado
                };

                var IdReparacion = new SqlParameter("@ID_REPARACION", System.Data.SqlDbType.Int)
                {
                    Direction = System.Data.ParameterDirection.Input,
                    Value = request.IdReparacion
                };

                var IdEstadoSintoma = new SqlParameter("@ID_ESTADO_SINTOMA", System.Data.SqlDbType.Int)
                {
                    Direction = System.Data.ParameterDirection.Input,
                    Value = request.IdEstadoSintoma
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
                    IdReparacionSintomaEstado,
                    IdReparacion,
                    IdEstadoSintoma,
                    invoker,
                    retcode,
                    mensaje
                 };

                string PA_CAMBIAR_ESTADO_SINTOMA = "EXEC PA_CAMBIAR_ESTADO_SINTOMA @ID_REPARACION_SINTOMA_ESTADO,@ID_REPARACION,@ID_ESTADO_SINTOMA,@INVOKER,@RETCODE OUTPUT,@MENSAJE OUTPUT";


                await context.Database.ExecuteSqlRawAsync(PA_CAMBIAR_ESTADO_SINTOMA, parametros);

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
