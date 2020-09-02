using System;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using Application.Validators;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.User
{
    public class Register
    {
        public class Command : IRequest<User>
        {
            public string CustomerId { get; set; }
            public string DisplayName { get; set; }
            public string Username { get; set; }
            public string Email { get; set; }
            public string Password { get; set; }
            public string AddressLine1 { get; set; }
            public string AddressLine2 { get; set; }
            public string City { get; set; }
            public string State { get; set; }
            public string Postcode { get; set; }
            public string Country { get; set; }
            public DateTime DBO { get; set; }
            public string GroupName { get; set; }
            public string Level { get; set; }
            public string TrainingYears { get; set; }
            public string Phone { get; set; }
            public string OldPassword { get; set; }
 
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.DisplayName).NotEmpty();
                RuleFor(x => x.Username).NotEmpty();
                RuleFor(x => x.Email).NotEmpty().EmailAddress();
                RuleFor(x => x.Password).Password();

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


                var user = await _context.Users.Where(x => x.CustomerId == request.CustomerId).FirstAsync();

                user.DisplayName = request.DisplayName;
                user.Email = request.Email;
                user.UserName = request.Email;
                user.AddressLine1 = request.AddressLine1;
                user.AddressLine2 = request.AddressLine2;
                user.City = request.City;
                user.State = request.State;
                user.Postcode = request.Postcode;
                user.Country = request.Country;
                user.IsRegistered = true;
                user.Phone = request.Phone;
                user.DBO = request.DBO;
                user.DBO = request.DBO;
                _context.Users.Update(user);


               await _paymentService.UpdateCustomer(user);

                var result = await _userManager.ChangePasswordAsync(user, user.TempPassword, request.Password);

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
                        IsAdmin = user.IsAdmin,
                        IsPaid = user.IsPaid,
                        IsRegistered = true,
                        InvoiceId = "",
                        PaymentMethodId = "",
                        ClientSecret = "",
                        Subscription = user.Subscribtion
                    };
                }
                
                throw new Exception("Problem updating user");
            }
        }
    }
}