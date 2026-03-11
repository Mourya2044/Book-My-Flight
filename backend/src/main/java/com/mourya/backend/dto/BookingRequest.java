package com.mourya.backend.dto;

import java.util.UUID;

public class BookingRequest {

    private UUID dealId;
    private String phoneNumber;

    public UUID getDealId() {
        return dealId;
    }

    public void setDealId(UUID dealId) {
        this.dealId = dealId;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
}