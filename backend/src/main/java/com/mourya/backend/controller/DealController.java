package com.mourya.backend.controller;

import com.mourya.backend.model.SpecialDeal;
import com.mourya.backend.service.DealService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/deals")
public class DealController {

    private final DealService dealService;

    public DealController(DealService dealService) {
        this.dealService = dealService;
    }

    @GetMapping
    public List<SpecialDeal> getActiveDeals() {
        return dealService.getActiveDeals();
    }

    @PostMapping
    public SpecialDeal createDeal(@RequestBody SpecialDeal deal) {
        return dealService.createDeal(deal);
    }

    @DeleteMapping("/{id}")
    public void deleteDeal(@PathVariable java.util.UUID id) {
        dealService.deleteDeal(id);
    }

    @PutMapping("/{id}")
    public SpecialDeal updateDeal(
            @PathVariable java.util.UUID id,
            @RequestBody SpecialDeal deal
    ) {
        return dealService.updateDeal(id, deal);
    }
}