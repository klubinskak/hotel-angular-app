using System;
using HotelBookingAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace HotelBookingAPI.Data
{
  public class HotelBookingContext: DbContext
  {
    public HotelBookingContext(DbContextOptions<HotelBookingContext> options) : base(options)
    {
    }

    public DbSet<Booking> Booking { get; set; }
  }
}

