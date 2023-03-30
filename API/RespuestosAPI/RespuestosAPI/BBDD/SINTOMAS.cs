using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RespuestosAPI.DTOs;

namespace RespuestosAPI.BBDD
{
    public class SINTOMAS : IEntityTypeConfiguration<SintomaDTO>
    {
        public void Configure(EntityTypeBuilder<SintomaDTO> builder)
        {
            builder.ToTable(nameof(SintomaDTO));
            builder.HasKey(x => x.Id_Sintoma);
            builder.Property(x => x.Descripcion_Sintoma);
        }
    }
}

