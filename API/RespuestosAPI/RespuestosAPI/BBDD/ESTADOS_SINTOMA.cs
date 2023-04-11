using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RespuestosAPI.DTOs;

namespace RespuestosAPI.BBDD
{
    public class ESTADOS_SINTOMA : IEntityTypeConfiguration<EstadoSintomaDTO>
    {
        public void Configure(EntityTypeBuilder<EstadoSintomaDTO> builder)
        {
            builder.ToTable(nameof(EstadoSintomaDTO));
            builder.HasKey(x => x.Id_Estado_Sintoma);
            builder.Property(x => x.Descripcion_Estado);
        }
    }
}
