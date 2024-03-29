﻿using RespuestosAPI.Entidades;

namespace RespuestosAPI.DTOs
{
    public class UsuarioDTO
    {
        public int Id_Usuario { get; set; }
        public string usuario { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public int Id_Perfil { get; set; }
        public int Activo { get; set; }
        public string Salt { get; set; }
    }
}
