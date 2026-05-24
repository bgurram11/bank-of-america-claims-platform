package com.boa.claims.repository;

import com.boa.claims.model.Claim;
import com.boa.claims.model.ClaimStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ClaimRepository extends JpaRepository<Claim, Long> {
    List<Claim> findByStatus(ClaimStatus status);
    List<Claim> findBySubmittedBy(String username);
}
