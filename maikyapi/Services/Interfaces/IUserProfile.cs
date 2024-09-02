using maikyapi.Models.Dto;

namespace maikyapi.Services.Interfaces
{
    public interface IUserProfileService
    {
        Task<List<UserProfileDto>> GetListUserProfileAsync();
        Task<UserProfileDto> GetUserProfileByLoginAsync(string username,string password);
    }
}
