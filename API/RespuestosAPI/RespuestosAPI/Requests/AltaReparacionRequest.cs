namespace RespuestosAPI.Requests
{
    public class AltaReparacionRequest
    {
        public int Id_Articulo { get; set; }
        public string Recogida_Calle { get; set; }
        public string Recogida_Numero { get; set; }
        public string Recogida_Poblacion { get; set; }
        public string Recogida_Provincia { get; set; }
        public string Recogida_Codigo_Postal { get; set; }
        public string Recogida_Persona_Contacto { get; set; }
        public string Recogida_Telefono { get; set; }
        public string Envio_Calle { get; set; }
        public string Envio_Numero { get; set; }
        public string Envio_Poblacion { get; set; }
        public string Envio_Provincia { get; set; }
        public string Envio_Codigo_Postal { get; set; }
        public string Envio_Persona_Contacto { get; set; }
        public string Envio_Telefono { get; set; }
        public int[] Sintomas { get; set; }
        public int[] Repuestos { get; set; }
    }
}
