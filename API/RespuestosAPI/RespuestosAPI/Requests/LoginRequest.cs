using System.ComponentModel.DataAnnotations;

namespace RespuestosAPI.Requests
{
    public class LoginRequest
    {
        [Required]
        public string Usuario { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
