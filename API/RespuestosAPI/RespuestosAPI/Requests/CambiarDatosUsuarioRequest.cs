namespace RespuestosAPI.Requests
{
    public class CambiarDatosUsuarioRequest
    {
        public int Id_Usuario { get; set; }
        public string Usuario { get; set; }
        public string Password { get; set; }
        public int Id_Perfil { get; set; }
        public string Email { get; set; }
    }
}
