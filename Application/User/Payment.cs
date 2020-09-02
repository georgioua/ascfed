using System;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Extensions;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.User
{
    public class Payment
    {
        public class Command : IRequest<User>
        {
            
            public string PriceId { get; set; }
            public string CustomerId { get; set; }
            public string PaymentMethodId { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.PriceId).NotEmpty();
                RuleFor(x => x.CustomerId).NotEmpty();
                RuleFor(x => x.PaymentMethodId).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command, User>
        {
            private readonly DataContext _context;
            private readonly UserManager<AppUser> _userManager;
            private readonly IJwtGenerator _jwtGenerator;
            private readonly IPaymentService _paymentService;
            public Handler(DataContext context, UserManager<AppUser> userManager, IJwtGenerator jwtGenerator, IPaymentService paymentService)
            {
                _jwtGenerator = jwtGenerator;
                _userManager = userManager;
                _context = context;
                _paymentService = paymentService;
            }

            public async Task<User> Handle(Command request, CancellationToken cancellationToken)
            {
                try
                {
                    var subscription = await _paymentService.CreateSubscription(new CreateSubscriptionRequest
                    {
                        CustomerId = request.CustomerId,
                        PaymentMethodId = request.PaymentMethodId,
                        PriceId = request.PriceId

                    });
                    var isPaid = false;
                    if (subscription.Status == "active" && subscription.Latest_Invoice.Payment_Intent.Status == "succeeded")
                        isPaid = true;

                    if (await _context.Users.Where(x => x.Email == subscription.Email).AnyAsync())
                        throw new RestException(HttpStatusCode.BadRequest, new { Email = "Email already exists" });

                    if (await _context.Users.Where(x => x.UserName == subscription.Email).AnyAsync())
                        throw new RestException(HttpStatusCode.BadRequest, new { Username = "Username already exists" });


                    var password = Password.Generate(32, 12);

                    var user = new AppUser
                    {
                        DisplayName = subscription.Name,
                        Email = subscription.Email,
                        UserName = subscription.Email,
                        RefreshToken = _jwtGenerator.GenerateRefreshToken(),
                        RefreshTokenExpiry = DateTime.UtcNow.AddDays(30),
                        IsPaid = isPaid,
                        IsAdmin = false,
                        CustomerId = request.CustomerId,
                        PriceId = request.PriceId,
                        Subscribtion = subscription.Subscription,
                        JoiningDate = subscription.StartDate,
                        LastPayment = DateTime.UtcNow,
                        ExpiryDate = DateTime.UtcNow.AddYears(1),
                        IsRegistered = false,
                        TempPassword = password
                    };

                    

                    var result = await _userManager.CreateAsync(user, password);

                    if (result.Succeeded)
                    {
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
                            IsPaid = isPaid,
                            IsRegistered = false,
                            TempPassword = password,
                            SubscriptionStatus = subscription.Status,
                            PaymentIntentStatus = subscription.Latest_Invoice.Payment_Intent.Status,
                            InvoiceId = subscription.InvoiceId,
                            PaymentMethodId = subscription.PaymentMethodId,
                            ClientSecret = subscription.Latest_Invoice.Payment_Intent.Client_Secret
                        };
                    }

                    throw new Exception("Problem creating user");
                }
                catch (Exception ex)
                {
                    throw new RestException(HttpStatusCode.BadRequest, new { PaymentMethod = ex.Message });
                }

            }
        }
    }
}
