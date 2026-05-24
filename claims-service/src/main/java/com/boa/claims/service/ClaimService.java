package com.boa.claims.service;

import com.boa.claims.dto.ClaimRequest;
import com.boa.claims.dto.ClaimResponse;
import com.boa.claims.model.Claim;
import com.boa.claims.model.ClaimStatus;
import com.boa.claims.repository.ClaimRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class ClaimService {

    private final ClaimRepository claimRepository;
    private final ClaimEventProducer eventProducer;

    public ClaimResponse submit(ClaimRequest request, String username) {
        Claim claim = Claim.builder()
                .claimNumber("CLM-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase())
                .claimantName(request.claimantName())
                .type(request.type())
                .description(request.description())
                .amount(request.amount())
                .status(ClaimStatus.PENDING)
                .submittedBy(username)
                .build();
        claim = claimRepository.save(claim);
        eventProducer.publish(claim.getClaimNumber(), "SUBMITTED");
        return toResponse(claim);
    }

    @Transactional(readOnly = true)
    public List<ClaimResponse> getAll() {
        return claimRepository.findAll().stream().map(this::toResponse).toList();
    }

    @Transactional(readOnly = true)
    public ClaimResponse getById(Long id) {
        return claimRepository.findById(id)
                .map(this::toResponse)
                .orElseThrow(() -> new IllegalArgumentException("Claim not found: " + id));
    }

    public ClaimResponse updateStatus(Long id, ClaimStatus status) {
        Claim claim = claimRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Claim not found: " + id));
        claim.setStatus(status);
        claim = claimRepository.save(claim);
        eventProducer.publish(claim.getClaimNumber(), status.name());
        return toResponse(claim);
    }

    private ClaimResponse toResponse(Claim c) {
        return new ClaimResponse(c.getId(), c.getClaimNumber(), c.getClaimantName(),
                c.getType(), c.getDescription(), c.getAmount(), c.getStatus(),
                c.getSubmittedBy(), c.getCreatedAt());
    }
}
