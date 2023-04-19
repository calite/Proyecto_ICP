using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using RespuestosAPI.BBDD;
using RespuestosAPI.Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace RespuestosAPI
{
    public class ApplicationDbContext : IdentityDbContext
    {
        internal readonly object output;

        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Usuario>()
                .HasKey(u => new { u.Id_Usuario });

            modelBuilder.Entity<Perfil>()
                .HasKey(p => new { p.Id_Perfil });

            modelBuilder.Entity<Articulo>()
                .HasKey(a => new { a.Id_Articulo });

            modelBuilder.Entity<Repuesto>()
                .HasKey(r => new { r.Id_Repuesto });

            modelBuilder.Entity<Stock>()
                .HasKey(s => new { s.Id_Stock });

            modelBuilder.Entity<Reparacion>()
                .HasKey(r => new { r.Id_Reparacion });

            modelBuilder.Entity<ReparacionEstado>()
                .HasKey(s => new { s.Id_Reparacion });

            modelBuilder.Entity<Sintoma>()
                .HasKey(s => new { s.Id_Sintoma });

            modelBuilder.Entity<EstadoReparacion>()
            .HasKey(s => new { s.Id_Estado_Reparacion });

            modelBuilder.Entity<EstadoSintoma>()
                .HasKey(s => new { s.Id_Estado_Sintoma });

            modelBuilder.Entity<StockRepuesto>().ToView("V_STOCKS_REPUESTOS")
                .HasNoKey();

            modelBuilder.Entity<ReparacionEstado>().ToView("V_REPARACIONES_ESTADO")
                .HasKey(X => X.Id_Reparacion);

            modelBuilder.Entity<ReparacionSintomas>().ToView("v_REPARACION_SINTOMAS")
                .HasNoKey();
                //.HasKey(X => X.Id_Reparacion);
            modelBuilder.Entity<UsuarioPerfil>().ToView("V_USUARIOS_PERFILES")
                .HasNoKey();

            modelBuilder.Entity<Envio>().ToView("V_ENVIOS")
                .HasNoKey();

            modelBuilder.Entity<Recogida>().ToView("V_RECOGIDAS")
                .HasNoKey();

        }

        public DbSet<Usuario> USUARIOS { get; set; }
        public DbSet<Perfil> PERFILES { get; set; }
        public DbSet<Articulo> ARTICULOS { get; set; }
        public DbSet<Repuesto> REPUESTOS { get; set; }
        public DbSet<Stock> STOCKS { get; set; }
        public DbSet<Reparacion> REPARACIONES { get; set; }
        public DbSet<ReparacionEstado> ESTADOSREPARACION { get; set; }
        public DbSet<EstadoReparacion> ESTADOS_REPARACION { get; set; }
        public DbSet<EstadoSintoma> ESTADOS_SINTOMA { get; set; }
        public DbSet<Sintoma> SINTOMAS { get; set; }
        public DbSet<StockRepuesto> V_STOCKS_REPUESTOS { get; set; }
        public DbSet<ReparacionEstado> V_REPARACIONES_ESTADO { get; set; }
        public DbSet<ReparacionSintomas> V_REPARACION_SINTOMAS { get; set; }
        public DbSet<UsuarioPerfil> V_USUARIOS_PERFILES { get; set; }
        public DbSet<Envio> V_ENVIOS { get; set; }
        public DbSet<Recogida> V_RECOGIDAS { get; set; }

    }
}
