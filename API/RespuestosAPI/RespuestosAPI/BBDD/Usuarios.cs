using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RespuestosAPI.Entidades;

namespace RespuestosAPI.BBDD
{
    public class Usuarios : IEntityTypeConfiguration<Usuario>
    {
        public void Configure(EntityTypeBuilder<Usuario> builder)
        {
            builder.ToTable(nameof(Usuario));
            builder.HasKey(x => x.Id);
            builder.Property(x => x.usuario);
            builder.Property(x => x.Password);
            builder.Property(x => x.Email);
            builder.Property(x => x.Id_Perfil);
        }
    }
}
