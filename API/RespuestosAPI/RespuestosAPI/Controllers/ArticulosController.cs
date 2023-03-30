using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using RespuestosAPI.BBDD;
using RespuestosAPI.DTOs;
using RespuestosAPI.Entidades;

namespace RespuestosAPI.Controllers
{
    [ApiController]
    [Route("api/articulos")]
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

        [HttpGet("{IdArticulo:int}")]
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
            *                         VISTA
            * =====================================================
        \*/



        /*\
            * =====================================================
            *                          POST
            * =====================================================
        \*/

        [HttpPost("alta_articulo")]
        public async Task AltaArticulo(string marca, string modelo)
        {
            try
            {
                SqlParameter[] parametros = new SqlParameter[5]
                {
                    new SqlParameter("@MARCA", System.Data.SqlDbType.VarChar)
                    {
                        Direction = System.Data.ParameterDirection.Input,
                        Value = marca,
                        Size = 50
                    },
                    new SqlParameter("@MODELO", System.Data.SqlDbType.VarChar)
                    {
                        Direction = System.Data.ParameterDirection.Input,
                        Value = modelo,
                        Size = 50
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

                string PA_ALTA_ARTICULO = "EXEC PA_ALTA_ARTICULO @MARCA,@MODELO,@INVOKER,@RETCODE,@MENSAJE";

                await context.Database.ExecuteSqlRawAsync(PA_ALTA_ARTICULO, parametros);

            }
            catch (Exception e)
            {
                throw e;
            }

        }

        [HttpPost("baja_articulo/{IdArticulo:int}")]
        public async Task<ActionResult> BajaArticulo(int IdArticulo)
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

                string PA_BAJA_ARTICULO = "EXEC PA_BAJA_ARTICULO @ID_ARTICULO,@INVOKER,@RETCODE,@MENSAJE";

                return Ok(await context.Database.ExecuteSqlRawAsync(PA_BAJA_ARTICULO, parametros));
            }
            catch (Exception e)
            {
                throw e;
            }

        }

        [HttpPost("cambiar_articulo/{IdArticulo:int}")]
        public async Task<ActionResult> CambiarArticulo(int IdArticulo, string marca, string modelo)
        {
            try
            {
                var existeArticulo = await context.ARTICULOS.AnyAsync(x => x.Id_Articulo == IdArticulo);

                if (!existeArticulo)
                {
                    return BadRequest($"No existe un ARTICULO con el ID: {IdArticulo}");
                }

                SqlParameter[] parametros = new SqlParameter[6]
                {
                     new SqlParameter("@ID_ARTICULO", System.Data.SqlDbType.Int)
                    {
                        Direction = System.Data.ParameterDirection.Input,
                        Value = IdArticulo
                    },
                    new SqlParameter("@MARCA", System.Data.SqlDbType.VarChar)
                    {
                        Direction = System.Data.ParameterDirection.Input,
                        Value = marca,
                        Size = 30
                    },
                    new SqlParameter("@MODELO", System.Data.SqlDbType.VarChar)
                    {
                        Direction = System.Data.ParameterDirection.Input,
                        Value = modelo,
                        Size = 30
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

                string PA_CAMBIAR_ARTICULO = "EXEC PA_CAMBIAR_ARTICULO @ID_ARTICULO,@MARCA,@MODELO,@INVOKER,@RETCODE,@MENSAJE";

                return Ok(await context.Database.ExecuteSqlRawAsync(PA_CAMBIAR_ARTICULO, parametros));
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }

}
