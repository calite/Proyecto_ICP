using System.ComponentModel.DataAnnotations;

namespace RespuestosAPI.DTOs
{
    public class ArticuloEdicionDTO
    {
        [Required]
        public int Id_Articulo { get; set; }
        [Required]
        public string Marca { get; set; }
        [Required]
        public string Modelo { get; set; }

    }
}
