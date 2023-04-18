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
        /*
        [HttpGet("all")]
        public async Task<List<ReparacionDTO>> GetTodosLasReparaciones()
        {
            var reparaciones = await context.REPARACIONES.ToListAsync();

            return mapper.Map<List<ReparacionDTO>>(reparaciones);
        }

        [HttpGet("{IdReparacion:int}")]
        public async Task<List<ReparacionDTO>> GetReparacionPorId(int IdReparacion)
        {
            var reparacion = await context.REPARACIONES.Where(x => x.Id_Reparacion == IdReparacion).ToListAsync();

            return mapper.Map<List<ReparacionDTO>>(reparacion);
        }

        [HttpGet("estado/{IdEstado:int}")]
        public async Task<List<EstadoDTO>> GetEstadoPorId(int IdEstado)
        {
            try
            {
                var estado = await context.ESTADOS
                    .Where(x => x.Id_Estado == IdEstado)
                    .ToListAsync();

                return mapper.Map<List<EstadoDTO>>(estado);

            }
            catch (Exception ex)
            {
                throw ex;
            }

        }
        */

        [HttpGet("sintomas")]
        [AllowAnonymous]
        public async Task<List<SintomaDTO>> GetSintomas()
        {
            var sintoma = await context.SINTOMAS.ToListAsync();

            return mapper.Map<List<SintomaDTO>>(sintoma);
        }
        
        /*\
         * =====================================================
         *                         VISTAS
         * =====================================================
        \*/

        [HttpGet("detalles")]
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

                SqlParameter[] parametros = new SqlParameter[8]
                {
                    new SqlParameter("@ID_ARTICULO", System.Data.SqlDbType.Int)
                    {
                        Direction = System.Data.ParameterDirection.Input,
                        Value = request.Id_Articulo
                    },
                    new SqlParameter("@SINTOMAS_JSON", System.Data.SqlDbType.VarChar)
                    {
                        Direction = System.Data.ParameterDirection.Input,
                        Value = sintomasJson
                    },
                    new SqlParameter("@REPUESTOS_JSON", System.Data.SqlDbType.VarChar)
                    {
                        Direction = System.Data.ParameterDirection.Input,
                        Value = repuestosJson
                    },
                    new SqlParameter("@RECOGIDA_JSON", System.Data.SqlDbType.VarChar)
                    {
                        Direction = System.Data.ParameterDirection.Input,
                        Value = recogidaJson
                    },
                    new SqlParameter("@ENVIO_JSON", System.Data.SqlDbType.VarChar)
                    {
                        Direction = System.Data.ParameterDirection.Input,
                        Value = envioJson
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

                string PA_ALTA_REPARACION = "EXEC PA_ALTA_REPARACION @ID_ARTICULO,@SINTOMAS_JSON,@REPUESTOS_JSON,@RECOGIDA_JSON,@ENVIO_JSON,@INVOKER,@RETCODE,@MENSAJE";

                return Ok(await context.Database.ExecuteSqlRawAsync(PA_ALTA_REPARACION, parametros));

            }
            catch (Exception e)
            {
                throw e;
            }
        }

        [HttpPost("cambiar_estado_reparacion")]
        public async Task<ActionResult> CambiarEstadoReparacion([FromBody] CambiarEstadoReparacionRequest request)
        {
            try
            {
                
                var existeReparacion = await context.REPARACIONES.Where(x => x.Id_Reparacion == request.IdReparacion).AnyAsync();

                if (!existeReparacion)
                {
                    return BadRequest($"No existe una Reparacion con ese ID de reparacion: {request.IdReparacion}");
                }
                
                SqlParameter[] parametros = new SqlParameter[5]
                {
                    new SqlParameter("@ID_REPARACION", System.Data.SqlDbType.Int)
                    {
                        Direction = System.Data.ParameterDirection.Input,
                        Value = request.IdReparacion
                    },
                    new SqlParameter("@ID_ESTADO_REPARACION", System.Data.SqlDbType.Int)
                    {
                        Direction = System.Data.ParameterDirection.Input,
                        Value = request.IdEstadoReparacion
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

                string PA_CAMBIAR_ESTADO_REPARACION = "EXEC PA_CAMBIAR_ESTADO_REPARACION @ID_REPARACION,@ID_ESTADO_REPARACION,@INVOKER,@RETCODE,@MENSAJE";


                return Ok(await context.Database.ExecuteSqlRawAsync(PA_CAMBIAR_ESTADO_REPARACION, parametros));

            }
            catch (Exception e)
            {
                throw e;
            }
        }

        [HttpPost("cambiar_estado_sintoma")]
        public async Task<ActionResult> CambiarEstadoSintoma([FromBody] CambiarEstadoSintomaRequest request)
        {
            try
            {

                var existeReparacion = await context.REPARACIONES.Where(x => x.Id_Reparacion == request.IdReparacion).AnyAsync();

                if (!existeReparacion)
                {
                    return BadRequest($"No existe una Reparacion con ese ID de reparacion: {request.IdReparacion}");
                }

                SqlParameter[] parametros = new SqlParameter[6]
                {
                    new SqlParameter("@ID_REPARACION_SINTOMA_ESTADO", System.Data.SqlDbType.Int)
                    {
                        Direction = System.Data.ParameterDirection.Input,
                        Value = request.IdReparacionSintomaEstado
                    },
                    new SqlParameter("@ID_REPARACION", System.Data.SqlDbType.Int)
                    {
                        Direction = System.Data.ParameterDirection.Input,
                        Value = request.IdReparacion
                    },
                    new SqlParameter("@ID_ESTADO_SINTOMA", System.Data.SqlDbType.Int)
                    {
                        Direction = System.Data.ParameterDirection.Input,
                        Value = request.IdEstadoSintoma
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

                string PA_CAMBIAR_ESTADO_SINTOMA = "EXEC PA_CAMBIAR_ESTADO_SINTOMA @ID_REPARACION_SINTOMA_ESTADO,@ID_REPARACION,@ID_ESTADO_SINTOMA,@INVOKER,@RETCODE,@MENSAJE";


                return Ok(await context.Database.ExecuteSqlRawAsync(PA_CAMBIAR_ESTADO_SINTOMA, parametros));

            }
            catch (Exception e)
            {
                throw e;
            }
        }

    }
}
