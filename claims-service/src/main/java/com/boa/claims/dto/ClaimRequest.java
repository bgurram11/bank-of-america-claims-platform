package com.boa.claims.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.math.BigDecimal;

public record ClaimRequest(
        @NotBlank String claimantName,
        @NotBlank String type,
        String description,
        @NotNull @Positive BigDecimal amount
) {}
