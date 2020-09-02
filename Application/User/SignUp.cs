using System;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.User
{
    public class SignUp
    {
        public SignUp()
        {
        }
        public class Command : IRequest<Customer>
        {
            public string Email { get; set; }
        }
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Email).NotEmpty().EmailAddress();
            }
        }
        public class Handler : IRequestHandler<Command, Customer>
        {
            private readonly DataContext _context;
            private readonly IPaymentService _paymentService;
            public Handler(DataContext context, IPaymentService paymentService)
            {
                _context = context;
                _paymentService = paymentService;

            }
            public async Task<Customer> Handle(Command request, CancellationToken cancellationToken)
            {

                if (await _context.Users.Where(x => x.Email == request.Email).AnyAsync())
                    throw new RestException(HttpStatusCode.BadRequest, new { Email = "Email already exists" });

                var customerId =  await _paymentService.CreateCustomerAsync(request.Email);

                return new Customer { Email = request.Email, CustomerId = customerId };
            }
        }
    }
}
