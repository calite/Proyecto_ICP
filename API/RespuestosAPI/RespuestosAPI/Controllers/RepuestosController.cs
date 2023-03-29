using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RespuestosAPI.DTOs;

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

        [HttpGet("all")]
        public async Task<List<RepuestoDTO>> GetTodosLosRepuestos()
        {
            var repuestos = await context.Repuestos.ToListAsync();

            return mapper.Map<List<RepuestoDTO>>(repuestos);
        }

        [HttpGet("{id:int}")]
        public async Task<List<RepuestoDTO>> GetRepuestoPorId(int id)
        {
            var repuestos = await context.Repuestos.Where(x => x.Id_Repuesto == id).ToListAsync();

            return mapper.Map<List<RepuestoDTO>>(repuestos);
        }




        //FALTARIA DEVOLVER LA VISTA -> V_STOCKS_REPUESTOS




        [HttpPost("alta_repuesto")]
        public async Task<ActionResult> AltaRepuesto([FromBody] RepuestoCreacionDTO repuestoCreacionDTO)
        {

            string PA_ALTA_REPUESTO = "EXEC PA_ALTA_REPUESTO " +
                        "@DESCRIPCION_REPUESTO = '" + repuestoCreacionDTO.Descripcion_Repuesto + "' ," +
                        "@FABRICANTE = '" + repuestoCreacionDTO.Fabricante + "' ," +
                        "@PESO = " + repuestoCreacionDTO.Peso + " ," +
                        "@ALTO = " + repuestoCreacionDTO.Alto + " ," +
                        "@LARGO = " + repuestoCreacionDTO.Largo + "," +
                        "@ANCHO = " + repuestoCreacionDTO.Ancho + "," +
                        "@IMAGEN = '" + repuestoCreacionDTO.Imagen + "' ," +
                        "@CANTIDAD = " + repuestoCreacionDTO.Cantidad + "," +
                        "@INVOKER = " + 0 + "," +
                        "@RETCODE = " + 0 + "," +
                        "@MENSAJE = ' ' ";

            return Ok(context.Database.ExecuteSqlRaw(PA_ALTA_REPUESTO));

        }

        [HttpPost("baja_repuesto")]
        public async Task<ActionResult> BajaRepuesto([FromBody] int id)
        {
            var existeRepuesto = await context.Repuestos.AnyAsync(x => x.Id_Repuesto == id);

            if (!existeRepuesto)
            {
                return BadRequest($"No existe un repuesto con el ID: {id}");
            }

            string PA_BAJA_REPUESTO = "EXEC PA_BAJA_REPUESTO " +
                        "@ID_REPUESTO = '" + id + "' ," +
                        "@INVOKER = " + 0 + "," +
                        "@RETCODE = " + 0 + "," +
                        "@MENSAJE = ' ' ";

            return Ok(context.Database.ExecuteSqlRaw(PA_BAJA_REPUESTO));

        }

        [HttpPost("cambiar_stocks")]
        public async Task<ActionResult> CambiarStock(int id, int cantidad)
        {
            var existeRepuesto = await context.Stocks.AnyAsync(x => x.Id_Repuesto == id);

            if (!existeRepuesto)
            {
                return BadRequest($"No existe un repuesto con el ID: {id}");
            }

            string PA_CAMBIAR_STOCK = "EXEC PA_CAMBIAR_STOCK " +
                        "@ID_REPUESTO = '" + id + "' ," +
                        "@CANTIDAD = " + cantidad + "," + 
                        "@INVOKER = " + 0 + "," +
                        "@RETCODE = " + 0 + "," +
                        "@MENSAJE = ' ' ";

            return Ok(context.Database.ExecuteSqlRaw(PA_CAMBIAR_STOCK));

        }
    }
}
