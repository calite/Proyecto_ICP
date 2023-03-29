namespace RespuestosAPI.Entidades
{
    public class Repuesto
    {
        public int Id_Repuesto { get; set; }
        public string Descripcion_Repuesto { get; set; }
        public string Fabricante { get; set; }
        public int Peso { get; set; }
        public int Alto { get; set; }
        public int Largo { get; set; }
        public int Ancho { get; set; }
        public string Imagen { get; set; }
        public int Activo { get; set; }
    }
}
