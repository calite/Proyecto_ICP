using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RespuestosAPI.DTOs;
using RespuestosAPI.Entidades;

namespace RespuestosAPI.BBDD
{
    public class Perfiles : IEntityTypeConfiguration<PerfilDTO>
    {
        public void Configure(EntityTypeBuilder<PerfilDTO> builder)
        {
            builder.ToTable(nameof(PerfilDTO));
            builder.HasKey(x => x.Id_Perfil);
            builder.Property(x => x.Descripcion_Perfil);
        }
    }


}
