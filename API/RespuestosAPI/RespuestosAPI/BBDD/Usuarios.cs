using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RespuestosAPI.DTOs;
using RespuestosAPI.Entidades;

namespace RespuestosAPI.BBDD
{
    public class Usuarios : IEntityTypeConfiguration<UsuarioDTO>
    {
        public void Configure(EntityTypeBuilder<UsuarioDTO> builder)
        {
            builder.ToTable(nameof(UsuarioDTO));
            builder.HasKey(x => x.Id_Usuario);
            builder.Property(x => x.usuario);
            builder.Property(x => x.Password);
            builder.Property(x => x.Email);
            builder.Property(x => x.Id_Perfil);
            builder.Property(x => x.Activo);
            builder.Property(x => x.Salt);
        }
    }
}
