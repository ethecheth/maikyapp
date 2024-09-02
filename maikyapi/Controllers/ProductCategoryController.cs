using maikyapi.Data;
using maikyapi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace maikyapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductCategoryController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public ProductCategoryController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/<ProductCategoryController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductCategory>>> GetProductCategories()
        {
            return await _context.ProductCategories.ToListAsync();
        }

        // GET api/<ProductCategoryController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductCategory>> GetEntity(int id)
        {
            var entity = await _context.ProductCategories.FindAsync(id);

            if (entity == null)
            {
                return NotFound();
            }

            return entity;
        }

        // POST api/<ProductCategoryController>
        [HttpPost]
        public async Task<ActionResult<ProductCategory>> PostEntity(ProductCategory entity)
        {
            _context.ProductCategories.Add(entity);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetEntity), new { id = entity.Id }, entity);
        }
    }
}
