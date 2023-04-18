using System.ComponentModel.DataAnnotations;

namespace RespuestosAPI.DTOs
{
    public class UsuarioCreacionDTO
    {
        [Required]
        public string Usuario { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        public int Id_Perfil { get; set; }
    }
}
