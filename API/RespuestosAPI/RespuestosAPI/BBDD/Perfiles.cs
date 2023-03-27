using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RespuestosAPI.Entidades;

namespace RespuestosAPI.BBDD
{
    public class Perfiles : IEntityTypeConfiguration<Perfil>
    {
        public void Configure(EntityTypeBuilder<Perfil> builder)
        {
            builder.ToTable(nameof(Usuario));
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id_Perfil);
            builder.Property(x => x.Descripcion);
        }
    }


}
