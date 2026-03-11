package com.mourya.backend.repository;

import com.mourya.backend.model.SpecialDeal;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public interface DealRepository extends JpaRepository<SpecialDeal, UUID> {

    List<SpecialDeal> findByStartTimeBeforeAndEndTimeAfter(
            LocalDateTime start,
            LocalDateTime end
    );

}