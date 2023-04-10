using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using RespuestosAPI.DTOs;
using RespuestosAPI.Entidades;
using RespuestosAPI.Requests;

namespace RespuestosAPI.Controllers
{
    [ApiController]
    [Route("api/reparaciones")]
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
        
        [HttpGet("sintoma/{IdSintoma:int}")]
        public async Task<List<SintomaDTO>> GetSintomaPorId(int IdSintoma)
        {
            var sintoma = await context.SINTOMAS
                .Where(x => x.Id_Sintoma == IdSintoma)
                .ToListAsync();

            return mapper.Map<List<SintomaDTO>>(sintoma);
        }
        */
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
        public async Task<ActionResult<IEnumerable<Envio>>> GetEnvio(int IdReparacion)
        {
            try
            {
                var envio = await context.V_ENVIOS.Where(x => x.Id_Reparacion == IdReparacion).ToListAsync();

                if(envio.Count == 0)
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
        public async Task<ActionResult<IEnumerable<Recogida>>> GetRecogida(int IdReparacion)
        {
            try
            {
                var recogida = await context.V_RECOGIDAS.Where(x => x.Id_Reparacion == IdReparacion).ToListAsync();

                if(recogida.Count == 0)
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
        public async Task<ActionResult<IEnumerable<ReparacionEstado>>> GetReparacionEstadoPorId(int IdReparacion)
        {
            try
            {
                var reparaciones = await context.V_REPARACIONES_ESTADO.Where(x => x.Id_Reparacion == IdReparacion).ToListAsync();

                if(reparaciones.Count == 0)
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
                    return BadRequest($"Ya existe una reparacion con ese ID: {IdReparacion}");
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
        public async Task<ActionResult> AltaReparacion(int IdArticulo)
        {
            try
            {
                var existeArticulo = await context.ARTICULOS.AnyAsync(x => x.Id_Articulo == IdArticulo);

                if (!existeArticulo)
                {
                    return BadRequest($"No existe un ARTICULO con el ID: {IdArticulo}");
                }

                SqlParameter[] parametros = new SqlParameter[4]
                {
                     new SqlParameter("@ID_ARTICULO", System.Data.SqlDbType.Int)
                    {
                        Direction = System.Data.ParameterDirection.Input,
                        Value = IdArticulo
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

                string PA_ALTA_REPARACION = "EXEC PA_ALTA_REPARACION @ID_ARTICULO,@INVOKER,@RETCODE,@MENSAJE";



                //AQUI HAY QUE GESTIONAR LA INSERCION DE REPARACIONES_ESTADO, REPARACIONES_SINTOMA 
                //EL PA PODRIA INSERTAR EN ENVIO Y REPARACION_ESTADO, PERO REPARACION_SINTOMAS DEBE HACERSE AQUI
                //BUCLE -> N SINTOMAS (LLAMADA AL PA)



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
                    new SqlParameter("@ID_ESTADO", System.Data.SqlDbType.Int)
                    {
                        Direction = System.Data.ParameterDirection.Input,
                        Value = request.IdEstado
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

                string PA_CAMBIAR_ESTADO_REPARACION = "EXEC PA_CAMBIAR_ESTADO_REPARACION @ID_REPARACION,@ID_ESTADO,@INVOKER,@RETCODE,@MENSAJE";


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
                    new SqlParameter("@ID_REPARACION", System.Data.SqlDbType.Int)
                    {
                        Direction = System.Data.ParameterDirection.Input,
                        Value = request.IdReparacion
                    },
                    new SqlParameter("@ID_REPARACION_ESTADO", System.Data.SqlDbType.Int)
                    {
                        Direction = System.Data.ParameterDirection.Input,
                        Value = request.IdReparacionEstado
                    },
                    new SqlParameter("@ID_ESTADO", System.Data.SqlDbType.Int)
                    {
                        Direction = System.Data.ParameterDirection.Input,
                        Value = request.IdEstado
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

                string PA_CAMBIAR_ESTADO_SINTOMA = "EXEC PA_CAMBIAR_ESTADO_SINTOMA @ID_REPARACION,@ID_REPARACION_ESTADO,@ID_ESTADO,@INVOKER,@RETCODE,@MENSAJE";


                return Ok(await context.Database.ExecuteSqlRawAsync(PA_CAMBIAR_ESTADO_SINTOMA, parametros));

            }
            catch (Exception e)
            {
                throw e;
            }
        }

    }
}
