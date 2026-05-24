package com.boa.claims.dto;

import com.boa.claims.model.ClaimStatus;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record ClaimResponse(
        Long id,
        String claimNumber,
        String claimantName,
        String type,
        String description,
        BigDecimal amount,
        ClaimStatus status,
        String submittedBy,
        LocalDateTime createdAt
) {}
