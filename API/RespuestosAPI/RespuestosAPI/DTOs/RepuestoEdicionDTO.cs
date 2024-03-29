﻿using System.ComponentModel.DataAnnotations;

namespace RespuestosAPI.DTOs
{
    public class RepuestoEdicionDTO
    {
        [Required]
        public int Id_Repuesto { get; set; }
        [Required]
        public string Descripcion_Repuesto { get; set; }
        [Required]
        public string Fabricante { get; set; }
        [Required]
        public int Peso { get; set; }
        [Required]
        public int Alto { get; set; }
        [Required]
        public int Largo { get; set; }
        [Required]
        public int Ancho { get; set; }
        [Required]
        public string Imagen { get; set; }
    }
}
