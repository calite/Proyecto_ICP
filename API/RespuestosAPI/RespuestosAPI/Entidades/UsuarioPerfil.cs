namespace RespuestosAPI.Entidades
{
    public class UsuarioPerfil
    {
        public int Id_Usuario { get; set; }
        public string Usuario { get; set; }
        public string Password { get; set; }
        public string Descripcion { get; set; }
        public string Email { get; set; }
        public int Activo { get; set; }
    }
}
