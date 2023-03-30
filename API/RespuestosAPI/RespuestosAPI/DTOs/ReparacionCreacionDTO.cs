using System.ComponentModel.DataAnnotations;

namespace RespuestosAPI.DTOs
{
    public class ReparacionCreacionDTO
    {
        [Required]
        public int Id_Articulo { get; set; }
    }
}
