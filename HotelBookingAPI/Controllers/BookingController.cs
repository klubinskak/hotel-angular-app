using HotelBookingAPI.Data;
using HotelBookingAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HotelBookingAPI.Controllers;

[ApiController]
[Route("[controller]")]
public class BookingsController : ControllerBase
{
  private readonly HotelBookingContext _context;
  private readonly ILogger<BookingsController> _logger;
  public BookingsController(HotelBookingContext context, ILogger<BookingsController> logger)
  {
    _context = context;
    _logger = logger;
  }

  [HttpGet]
  public async Task<ActionResult<IEnumerable<Booking>>> GetAllBookings()
  {
    try
    {
      var bookings = await _context.Booking.ToListAsync();
      return Ok(bookings);
    }
    catch (Exception ex)
    {
      _logger.LogError(ex, "An error occurred while retrieving all bookings.");
      return StatusCode(500, "Internal server error.");

    }
  }
  [HttpPost("CreateBooking")]
  public async Task<IActionResult> CreateBooking(Booking booking)
  {
    if (ModelState.IsValid)
    {
      var bookingData = new Booking()
      {
        CheckInDate = booking.CheckInDate,
        CheckOutDate = booking.CheckOutDate,
        Name = booking.Name,
        Email = booking.Email,
        RoomNumber = booking.RoomNumber,
        CreatedAt = DateTime.Now,
      };
      _context.Booking.Add(bookingData);
      _context.SaveChanges();
    }
    else
    {
      _logger.LogError("Something went wrong");
    }
    return Ok(booking);
  }

  [HttpDelete("DeleteBooking/{id}")]
  public async Task<IActionResult> DeleteBooking(Guid id)
  {
    try
    {
      var booking = await _context.Booking.FindAsync(id);
      if(booking == null)
      {
        return NotFound();
      }

      _context.Booking.Remove(booking);
      await _context.SaveChangesAsync();
      return NoContent(); //Return a 204 no content if the booking is succesfully delated
    }
    catch (Exception ex)
    {
      _logger.LogError(ex, "An error occurred while deleting the booking.");
      return StatusCode(500, "Internal server error");
    }
  }
  [HttpPut("UpdateBooking/{id}")]
  public async Task<IActionResult> UpdateBooking(Guid id, [FromBody] Booking updatedBooking)
  {
    try
    {
      var booking = await _context.Booking.FindAsync(id);
      if(booking ==null)
      {
        return NotFound();
      }

      booking.CheckInDate = updatedBooking.CheckInDate;
      booking.CheckOutDate = updatedBooking.CheckOutDate;
      booking.Name = updatedBooking.Name;
      booking.Email = updatedBooking.Email;
      booking.RoomNumber = updatedBooking.RoomNumber;

      _context.Booking.Update(booking);
      await _context.SaveChangesAsync();

      return Ok(booking);
    }
    catch (Exception ex)
    {
      _logger.LogError(ex, "An error occurred while updating the booking.");
      return StatusCode(500, "Internal server error");
    }
  }
}
