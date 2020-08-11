using System;
using Stripe;
using Application.Interfaces;
using Domain;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;

namespace Infrastructure.Payment
{
    public class PaymentService :IPaymentService
    {
        public PaymentService(IConfiguration config)
        {
          
        }

        public string CreateCustomer(AppUser user)
        {
            var options = new CustomerCreateOptions
            {
                Email = user.Email,
                Phone = user.Phone,
                Name = user.Name,
                Address = new AddressOptions() {
                    Line1 = user.AddressLine1,
                    Line2 = user.AddressLine2,
                    State = user.State,
                    City = user.City,
                    Country = user.Country,
                    PostalCode = user.Postcode
                },
                Metadata = new Dictionary<string, string>() {
                    {"TrainingYears", user.TrainingYears.ToString() },
                    {"GroupName", user.GroupName },
                    {"Level", user.Level }
                },
            };
            var service = new CustomerService();
            var customer = service.Create(options);

            return customer.Id;
           
        }

    }
}
