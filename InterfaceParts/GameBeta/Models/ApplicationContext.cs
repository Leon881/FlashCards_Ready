using Microsoft.EntityFrameworkCore;

namespace GameBeta.Models
{
    public class ApplicationContext : DbContext
    {
        public DbSet<Pack> Packs { get; set; }
        public DbSet<MyPack> UserPacks { get; set; }
        public ApplicationContext(DbContextOptions<ApplicationContext> options)
            : base(options)
        {
            Database.EnsureCreated();   // создаем базу данных при первом обращении
        }
    }
}