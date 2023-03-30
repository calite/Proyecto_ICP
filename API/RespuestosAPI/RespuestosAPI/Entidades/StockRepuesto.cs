namespace RespuestosAPI.Entidades
{
    public class StockRepuesto
    {
        //AVISO PARA NAVEGANTES: al tratarse de una vista los nombres de los campos deben de ser iguales a los alias si existen.
        public int Id_Repuesto { get; set; }
        public string Descripcion_Repuesto { get; set; }
        public string Fabricante { get; set; }
        public int Peso { get; set; }
        public int Alto { get; set; }
        public int Largo { get; set; }
        public int Ancho { get; set; }
        public string Imagen { get; set; }
        public int Stock { get; set; }
    }
}
