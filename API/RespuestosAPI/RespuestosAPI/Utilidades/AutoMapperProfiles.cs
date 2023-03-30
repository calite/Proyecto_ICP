using AutoMapper;
using RespuestosAPI.DTOs;
using RespuestosAPI.Entidades;

namespace RespuestosAPI.Utilidades
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Usuario, UsuarioDTO>().ReverseMap();
            CreateMap<UsuarioCreacionDTO, Usuario>().ReverseMap();

            CreateMap<Perfil, PerfilDTO>().ReverseMap();

            CreateMap<Articulo, ArticuloDTO>().ReverseMap();
            CreateMap<ArticuloCreacionDTO, Articulo>().ReverseMap();

            CreateMap<Repuesto, RepuestoDTO>().ReverseMap();
            CreateMap<RepuestoCreacionDTO, Repuesto>().ReverseMap();

            CreateMap<Stock, StockDTO>().ReverseMap();

            CreateMap<Reparacion, ReparacionDTO>().ReverseMap();
            CreateMap<ReparacionCreacionDTO, Repuesto>().ReverseMap();

            CreateMap<Estado, EstadoDTO>().ReverseMap();

            CreateMap<Sintoma, SintomaDTO>().ReverseMap();
        }

    }
}
