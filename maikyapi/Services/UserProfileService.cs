using maikyapi.Data;
using maikyapi.Models.Dto;
using maikyapi.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;

namespace maikyapi.Services
{
    public class UserProfileService : IUserProfileService
    {
        private readonly ApplicationDbContext _context;

        public UserProfileService(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<List<UserProfileDto>> GetListUserProfileAsync()
        {
            return await _context.UserProfiles
               .Where(o => o.Status == "Active")
               .Select(o => new UserProfileDto
               {
                   Id = o.Id,
                   Email = o.Email,
                   Name = o.Name,
                   Lname = o.Lname,
                   Title = o.Title
               })
               .ToListAsync();
        }

        public async Task<UserProfileDto> GetUserProfileByLoginAsync(string username, string password)
        {
            var user = await (from u in _context.UserProfiles
                        where u.Email == username && u.Password == password
                        select u).FirstOrDefaultAsync();
           

            if (user == null)
            {
                UserProfileDto res = new UserProfileDto()
                {
                    Id = 0
                };
                return res;
            }
            else
            {
                UserProfileDto res = new UserProfileDto()
                {
                    Id = user.Id,
                    Email = user.Email,
                    Name = user.Name,
                    Lname = user.Lname,
                    Title = user.Title
                };
                return res;
            }
        }
    }
}
