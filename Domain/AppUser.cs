using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppUser : IdentityUser
    {
        public AppUser()
        {
            Photos = new Collection<Photo>();
        }
        
        public string DisplayName { get; set; }
        public string Bio { get; set; }
        public virtual ICollection<UserActivity> UserActivities { get; set; }
        public virtual ICollection<Photo> Photos { get; set; }
        public virtual ICollection<UserFollowing> Followings { get; set; }
        public virtual ICollection<UserFollowing> Followers { get; set; }
        public string RefreshToken { get; set; }
        public DateTime RefreshTokenExpiry { get; set; }
        public bool IsPaid { get; set; }
        public string Subscribtion { get; set; }
        public DateTime JoiningDate { get; set; }
        public DateTime ExpiryDate { get; set; }
        public DateTime LastPayment { get; set; }
        public bool IsAdmin { get; set; }
        public string AddressLine1 { get; set; }
        public string AddressLine2 { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Postcode { get; set; }
        public string Country { get; set; }
        public DateTime DBO { get; set; }
        public string GroupName { get; set; }
        public string Level { get; set; }
        public int TrainingYears { get; set; }
        public string PriceId { get; set; }
        public string CustomerId { get; set; }
        public string Name { get; set; }
        public string Phone { get; set; }
        public bool IsRegistered { get; set; }
        public string TempPassword { get; set; }

    }
}