using System.ComponentModel.DataAnnotations;

namespace RespuestosAPI.DTOs
{
    public class ArticuloCreacionDTO
    {
        [Required]
        public string Marca { get; set; }
        [Required]
        public string Modelo { get; set; }
    }
}
