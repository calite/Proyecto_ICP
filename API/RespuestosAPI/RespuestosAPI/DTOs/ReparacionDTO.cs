namespace RespuestosAPI.DTOs
{
    public class ReparacionDTO
    {
        public int Id_Estado { get; set; }
        public int Id_Articulo { get; set; }
        public DateTime Fecha_Insercion { get; set; }
        public DateTime Fecha_Recuperacion { get; set; }
    }
}
