namespace RespuestosAPI.Entidades
{
    public class Envio
    {
        public int Id_Envio { get; set; }
        public int Id_Reparacion { get; set; }
        public string Calle { get; set; }
        public int Numero { get; set; }
        public string Poblacion { get; set; }
        public string Provincia { get; set; }
        public string Codigo_Postal { get; set; }
        public string Persona_Contacto { get; set; }
        public int Telefono { get; set; }
    }
}
