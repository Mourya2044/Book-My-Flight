package com.mourya.backend.repository;

import com.mourya.backend.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface BookingRepository extends JpaRepository<Booking, UUID> {
    List<Booking> findByPhoneNumber(String phoneNumber);
}