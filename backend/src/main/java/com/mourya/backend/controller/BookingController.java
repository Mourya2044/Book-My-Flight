package com.mourya.backend.controller;

import com.mourya.backend.dto.BookingRequest;
import com.mourya.backend.model.Booking;
import com.mourya.backend.service.BookingService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/booking")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @PostMapping
    public Booking bookDeal(@RequestBody BookingRequest request) {

        return bookingService.bookDeal(
                request.getDealId(),
                request.getPhoneNumber()
        );
    }

    @GetMapping("/client/{phoneNumber}")
    public List<Booking> getClientBookings(
            @PathVariable String phoneNumber
    ) {
        return bookingService.getBookingsByPhone(phoneNumber);
    }

    @GetMapping("/admin")
    public List<Booking> getAllBookings() {
        return bookingService.getAllBookings();
    }
}