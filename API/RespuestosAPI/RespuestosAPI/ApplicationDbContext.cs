using Microsoft.EntityFrameworkCore;
using RespuestosAPI.Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace RespuestosAPI
{
    public class ApplicationDbContext : DbContext
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

            modelBuilder.Entity<Repuesto>()
                .HasKey(r => new { r.Id_Repuesto });

            modelBuilder.Entity<Stock>()
                .HasKey(s => new { s.Id_Stock });
        }

        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Perfil> Perfiles { get; set; }
        public DbSet<Repuesto> Repuestos { get; set; }
        public DbSet<Stock> Stocks { get; internal set; }
    }
}
