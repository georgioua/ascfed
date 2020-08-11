using System;
using Domain;
namespace Application.Interfaces
{
    public interface IPaymentService
    {
        string CreateCustomer(AppUser user);
    }
}
