using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RespuestosAPI.DTOs;

namespace RespuestosAPI.BBDD
{
    public class ESTADOS_REPARACION : IEntityTypeConfiguration<EstadoReparacionDTO>
    {
        public void Configure(EntityTypeBuilder<EstadoReparacionDTO> builder)
        {
            builder.ToTable(nameof(EstadoReparacionDTO));
            builder.HasKey(x => x.Id_Estado_Reparacion);
            builder.Property(x => x.Descripcion_Estado);
        }
    }
}
