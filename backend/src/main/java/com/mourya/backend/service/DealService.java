package com.mourya.backend.service;

import com.mourya.backend.model.SpecialDeal;
import com.mourya.backend.repository.DealRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class DealService {

    private final DealRepository dealRepository;

    public DealService(DealRepository dealRepository) {
        this.dealRepository = dealRepository;
    }

    public List<SpecialDeal> getActiveDeals() {

        LocalDateTime now = LocalDateTime.now();

        return dealRepository.findByStartTimeBeforeAndEndTimeAfter(now, now);
    }

    public SpecialDeal createDeal(SpecialDeal deal) {
        return dealRepository.save(deal);
    }

    public void deleteDeal(java.util.UUID id) {
        dealRepository.deleteById(id);
    }

    public SpecialDeal updateDeal(UUID id, SpecialDeal updatedDeal) {

        SpecialDeal deal = dealRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Deal not found"));

        deal.setDepartureCity(updatedDeal.getDepartureCity());
        deal.setArrivalCity(updatedDeal.getArrivalCity());
        deal.setCost(updatedDeal.getCost());
        deal.setStartTime(updatedDeal.getStartTime());
        deal.setEndTime(updatedDeal.getEndTime());

        return dealRepository.save(deal);
    }
}