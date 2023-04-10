namespace RespuestosAPI.Requests
{
    public class CambiarEstadoSintomaRequest
    {
        public int IdReparacion { get; set; }
        public int IdReparacionEstado { get; set; }
        public int IdEstado { get; set; }
    }
}
