using RespuestosAPI.Entidades;

namespace RespuestosAPI.DTOs
{
    public class UsuarioDTO
    {
        public int Id { get; set; }
        public string usuario { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public Perfil perfil { get; set; }
    }
}
