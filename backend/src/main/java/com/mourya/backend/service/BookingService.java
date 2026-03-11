package com.mourya.backend.service;

import com.mourya.backend.model.Booking;
import com.mourya.backend.model.SpecialDeal;
import com.mourya.backend.repository.BookingRepository;
import com.mourya.backend.repository.DealRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final DealRepository dealRepository;

    public BookingService(BookingRepository bookingRepository,
                          DealRepository dealRepository) {
        this.bookingRepository = bookingRepository;
        this.dealRepository = dealRepository;
    }

    public Booking bookDeal(UUID dealId, String phoneNumber) {

        SpecialDeal deal = dealRepository.findById(dealId)
                .orElseThrow(() -> new RuntimeException("Deal not found"));

        Booking booking = new Booking();
        booking.setDeal(deal);
        booking.setPhoneNumber(phoneNumber);
        booking.setBookingTime(LocalDateTime.now());

        return bookingRepository.save(booking);
    }

    public List<Booking> getBookingsByPhone(String phoneNumber) {
        return bookingRepository.findByPhoneNumber(phoneNumber);
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }
}