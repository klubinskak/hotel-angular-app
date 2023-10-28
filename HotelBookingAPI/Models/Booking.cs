using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HotelBookingAPI.Models
{
  public class Booking
  {
    public Guid ID { get; set; }
    public DateTime CheckInDate { get; set; }
    public DateTime CheckOutDate { get; set; }
    public required string Name { get; set; }
    public required string Email { get; set; }
    public int RoomNumber { get; set; }
    public DateTime CreatedAt { get; set; }
  }
}

