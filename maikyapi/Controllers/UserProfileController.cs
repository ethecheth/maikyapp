using maikyapi.Data;
using maikyapi.Models;
using maikyapi.Models.Dto;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace maikyapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UserProfileController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserProfile>>> GetUserProfiles()
        {
            return await _context.UserProfiles.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UserProfile>> GetEntity(int id)
        {
            var entity = await _context.UserProfiles.FindAsync(id);

            if (entity == null)
            {
                return NotFound();
            }

            return entity;
        }

        [HttpPost]
        public async Task<ActionResult<UserProfile>> PostEntity(UserProfile entity)
        {
            _context.UserProfiles.Add(entity);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetEntity), new { id = entity.Id }, entity);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutEntity(int id, UserProfileDto entitydto)
        {
            UserProfile entity = _context.UserProfiles.FirstOrDefault(x => x.Id == id);
            if (id != entity.Id)
            {
                return BadRequest("Entity ID mismatch");
            }
            entity.Name = entitydto.Name;
            entity.Lname = entitydto.Lname;
            _context.Entry(entity).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EntityExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        private bool EntityExists(int id)
        {
            return _context.UserProfiles.Any(e => e.Id == id);
        }
    }
}
