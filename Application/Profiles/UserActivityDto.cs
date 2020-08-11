using System;

namespace Application.Profiles
{
    public class UserActivityDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Category { get; set; }
        public DateTime Date { get; set; }
        public double Price { get; set; }
        public int Limit { get; set; }
        public int Capacity { get; set; }
        public int Registrations { get; set; }
        public string PriceId { get; set; }
    }
}