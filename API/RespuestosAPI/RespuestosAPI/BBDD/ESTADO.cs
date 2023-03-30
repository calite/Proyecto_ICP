using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RespuestosAPI.DTOs;

namespace RespuestosAPI.BBDD
{
    public class ESTADO : IEntityTypeConfiguration<EstadoDTO>
    {
        public void Configure(EntityTypeBuilder<EstadoDTO> builder)
        {
            builder.ToTable(nameof(EstadoDTO));
            builder.HasKey(x => x.Id_Estado);
            builder.Property(x => x.Descripcion_Estado);
        }
    }
}
