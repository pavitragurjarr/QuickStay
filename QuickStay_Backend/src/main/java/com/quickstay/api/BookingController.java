package com.quickstay.api;

import com.quickstay.dto.BookingDto;
import com.quickstay.dto.RoomDto;
import com.quickstay.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/booking")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @GetMapping("/available-rooms")
    public List<RoomDto> getAvailableRooms() {
        return bookingService.getAvailableRooms();
    }

    @GetMapping("/available-rooms-by-dates")
    public List<RoomDto> getAvailableRooms(@RequestParam LocalDate checkInDate, @RequestParam LocalDate checkOutDate) {
        return bookingService.findAvailableRooms(checkInDate, checkOutDate);
    }

    @PostMapping("/create")
    public BookingDto createBooking(@RequestBody BookingDto bookingDto) {
        return bookingService.createBooking(bookingDto);
    }

    @GetMapping("/user/{username}")
    public List<BookingDto> getBookingsForUser(@PathVariable String username) {
        return bookingService.getBookingsForUser(username);
    }
}
