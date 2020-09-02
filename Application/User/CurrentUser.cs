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
                    Token = _jwtGenerator.CreateToken(user),
                    RefreshToken = user.RefreshToken,
                    Username = user.UserName,
                    Image = user.Photos.FirstOrDefault(x => x.IsMain)?.Url,
                    CustomerId = user.CustomerId,
                    PriceId = user.PriceId,
                    Email = user.Email,
                    IsAdmin = false,
                    IsPaid = user.IsPaid,
                    IsRegistered = user.IsRegistered,
                    TempPassword = user.TempPassword,
                    SubscriptionStatus = user.IsPaid ? "active" : "",
                    PaymentIntentStatus = user.IsPaid ? "succeeded" : "",
                    InvoiceId = "",
                    PaymentMethodId = "",
                    ClientSecret = "",
                    Subscription = user.Subscribtion,

                };
            }
        }
    }
}