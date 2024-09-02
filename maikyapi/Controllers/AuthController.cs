using maikyapi.Models.Dto;
using maikyapi.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace maikyapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUserProfileService _userProfileService;
        private readonly ILogger<AuthController> _logger;
        public AuthController(IUserProfileService userProfileService, ILogger<AuthController> logger)
        {
            _userProfileService = userProfileService;
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserLogin login)
        {
            if (login == null)
            {
                throw new ArgumentNullException(nameof(login));
            }

            if (string.IsNullOrEmpty(login.Username) || string.IsNullOrEmpty(login.Password))
            {
                throw new ArgumentException("Username and password must be provided");
            }
            try
            {
                var user = await _userProfileService.GetUserProfileByLoginAsync(login.Username, login.Password);
                if (user.Id > 0)
                {
                    var tokenHandler = new JwtSecurityTokenHandler();
                    var key = Encoding.ASCII.GetBytes("ThisIsASecretString_ReplaceWithAComplexSecureKeyLongerThan32Characters"); // Replace with your actual secret key
                    var tokenDescriptor = new SecurityTokenDescriptor
                    {
                        Subject = new ClaimsIdentity(new Claim[]
                        {
                    new Claim(ClaimTypes.Name, string.Concat(user.Name," ",user.Lname)),
                    new Claim(ClaimTypes.Email, user.Email),
                    new Claim(ClaimTypes.Role, "Admin")
                        }),
                        Expires = DateTime.UtcNow.AddHours(1),
                        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                    };
                    var token = tokenHandler.CreateToken(tokenDescriptor);
                    return Ok(new { Token = tokenHandler.WriteToken(token), User = user });
                }
                else
                {
                    return Unauthorized("User invalid.");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while processing the login request.");
                return StatusCode(500, "Internal server error.");
            }
            return Unauthorized();
        }

        [Authorize]
        [HttpGet("secure-data")]
        public IActionResult GetSecureData()
        {
            return Ok("This is a secure data!");
        }
    }
}
