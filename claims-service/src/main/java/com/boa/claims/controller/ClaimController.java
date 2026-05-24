package com.boa.claims.controller;

import com.boa.claims.dto.ClaimRequest;
import com.boa.claims.dto.ClaimResponse;
import com.boa.claims.model.ClaimStatus;
import com.boa.claims.service.ClaimService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/claims")
@RequiredArgsConstructor
public class ClaimController {

    private final ClaimService claimService;

    @PostMapping
    public ResponseEntity<ClaimResponse> submit(@Valid @RequestBody ClaimRequest request,
                                                @AuthenticationPrincipal String username) {
        return ResponseEntity.status(HttpStatus.CREATED).body(claimService.submit(request, username));
    }

    @GetMapping
    public ResponseEntity<List<ClaimResponse>> getAll() {
        return ResponseEntity.ok(claimService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClaimResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(claimService.getById(id));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<ClaimResponse> updateStatus(@PathVariable Long id,
                                                      @RequestParam ClaimStatus status) {
        return ResponseEntity.ok(claimService.updateStatus(id, status));
    }
}
