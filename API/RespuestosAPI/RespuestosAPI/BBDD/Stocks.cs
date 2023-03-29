using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RespuestosAPI.DTOs;
using RespuestosAPI.Entidades;

namespace RespuestosAPI.BBDD
{
    public class Stocks : IEntityTypeConfiguration<StockDTO>
    {
        public void Configure(EntityTypeBuilder<StockDTO> builder)
        {
            builder.ToTable(nameof(StockDTO));
            builder.HasKey(x => x.Id_Stock);
            builder.Property(x => x.Id_Repuesto);
            builder.Property(x => x.Cantidad);
        }
    }
}
