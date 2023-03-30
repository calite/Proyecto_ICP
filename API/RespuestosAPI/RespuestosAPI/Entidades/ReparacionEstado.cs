namespace RespuestosAPI.Entidades
{
    public class ReparacionEstado
    {
        //AVISO PARA NAVEGANTES: al tratarse de una vista los nombres de los campos deben de ser iguales a los alias si existen.
        public int Id_Reparacion { get; set; }
        public string Marca { get; set; }
        public string Modelo { get; set; }
        public string Estado { get; set; }
    }
}
