using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RespuestosAPI.DTOs;

namespace RespuestosAPI.BBDD
{
    public class ARTICULO : IEntityTypeConfiguration<ArticuloDTO>
    {
        public void Configure(EntityTypeBuilder<ArticuloDTO> builder)
        {
            builder.ToTable(nameof(RepuestoDTO));
            builder.HasKey(x => x.Id_Articulo);
            builder.Property(x => x.Marca);
            builder.Property(x => x.Modelo);
            builder.Property(x => x.Activo);
        }
    }
}
