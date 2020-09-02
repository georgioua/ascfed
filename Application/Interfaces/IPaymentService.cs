using System;
using System.Threading.Tasks;
using Domain;


namespace Application.Interfaces
{
    public interface IPaymentService
    {
        string CreateCustomer(AppUser user);

        Task<string> CreateCustomerAsync(AppUser user);

        Task<string> CreateCustomerAsync(string email);

        Task<string> GetCustomerEmailAsync(string customerId);

        Task<SubscriptionResponse> CreateSubscription(CreateSubscriptionRequest req);

        Task<bool> UpdateCustomer(AppUser user);
    }
}
