namespace RespuestosAPI.Requests
{
    public class CambiarEstadoSintomaRequest
    {
        public int IdReparacionSintomaEstado { get; set; }
        public int IdReparacion { get; set; }
        public int IdEstadoSintoma { get; set; }
    }
}
