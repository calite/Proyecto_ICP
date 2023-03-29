using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RespuestosAPI.DTOs;
using RespuestosAPI.Entidades;

namespace RespuestosAPI.BBDD
{
    public class Repuestos : IEntityTypeConfiguration<RepuestoDTO>
    {
        public void Configure(EntityTypeBuilder<RepuestoDTO> builder)
        {
            builder.ToTable(nameof(RepuestoDTO));
            builder.HasKey(x => x.Id_Repuesto);
            builder.Property(x => x.Descripcion_Repuesto);
            builder.Property(x => x.Fabricante);
            builder.Property(x => x.Peso);
            builder.Property(x => x.Alto);
            builder.Property(x => x.Largo);
            builder.Property(x => x.Ancho);
            builder.Property(x => x.Imagen);
            builder.Property(x => x.Activo);
        }
    }
}
