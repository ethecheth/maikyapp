using maikyapi.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using System.Xml;

namespace maikyapi.Data
{
    public class ApplicationDbContext: DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }
        public DbSet<Product> Products { get; set;}
        public DbSet<ProductCategory> ProductCategories { get; set;}
        public DbSet<UserProfile> UserProfiles { get; set; }
    }
}
