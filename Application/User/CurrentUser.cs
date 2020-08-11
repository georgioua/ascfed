using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Persistence;

namespace Application.User
{
    public class CurrentUser
    {
        public class Query : IRequest<User> { }

        public class Handler : IRequestHandler<Query, User>
        {
            private readonly UserManager<AppUser> _userManager;
            private readonly IJwtGenerator _jwtGenerator;
            private readonly IUserAccessor _userAccessor;
            public Handler(UserManager<AppUser> userManager, IJwtGenerator jwtGenerator, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _jwtGenerator = jwtGenerator;
                _userManager = userManager;
            }

            public async Task<User> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _userManager.FindByNameAsync(_userAccessor.GetCurrentUsername());

                return new User
                {
                    DisplayName = user.DisplayName,
                    Username = user.UserName,
                    Token = _jwtGenerator.CreateToken(user),
                    RefreshToken = user.RefreshToken,
                    Image = user.Photos.FirstOrDefault(x => x.IsMain)?.Url,
                    IsAdmin = user.IsAdmin,
                    DBO = user.DBO,
                    AddressLine1 = user.AddressLine1,
                    AddressLine2 = user.AddressLine2,
                    CustomerId = user.CustomerId,
                    City = user.City,
                    Country = user.Country,
                    Email = user.Email,
                    Subscribtion = user.Subscribtion,
                    PriceId = user.PriceId,
                    GroupName = user.GroupName,
                    TrainingYears = user.TrainingYears,
                    Level = user.Level,
                    State = user.State

                };
            }
        }
    }
}