package com.mourya.backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "booking")
public class Booking {

    @Id
    @GeneratedValue
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "deal_id", nullable = false)
    private SpecialDeal deal;

    @Column(nullable = false)
    private String phoneNumber;

    private LocalDateTime bookingTime;

    public Booking() {}

    public UUID getId() {
        return id;
    }

    public SpecialDeal getDeal() {
        return deal;
    }

    public void setDeal(SpecialDeal deal) {
        this.deal = deal;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public LocalDateTime getBookingTime() {
        return bookingTime;
    }

    public void setBookingTime(LocalDateTime bookingTime) {
        this.bookingTime = bookingTime;
    }
}