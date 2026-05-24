package com.boa.claims.config;

import com.boa.claims.model.AppUser;
import com.boa.claims.model.Claim;
import com.boa.claims.model.ClaimStatus;
import com.boa.claims.repository.ClaimRepository;
import com.boa.claims.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Slf4j
@Component
@RequiredArgsConstructor
public class DataSeeder implements ApplicationRunner {

    private final UserRepository userRepository;
    private final ClaimRepository claimRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(ApplicationArguments args) {
        if (userRepository.count() == 0) {
            userRepository.save(AppUser.builder()
                    .username("admin").password(passwordEncoder.encode("password")).role("USER").build());
            userRepository.save(AppUser.builder()
                    .username("analyst").password(passwordEncoder.encode("password")).role("USER").build());
            log.info("Seeded users: admin, analyst (password: password)");
        }
        if (claimRepository.count() == 0) {
            claimRepository.save(Claim.builder().claimNumber("CLM-DEMO001").claimantName("John Smith")
                    .type("Medical").description("Hospital emergency visit").amount(new BigDecimal("4250.00"))
                    .status(ClaimStatus.PENDING).submittedBy("admin").build());
            claimRepository.save(Claim.builder().claimNumber("CLM-DEMO002").claimantName("Jane Doe")
                    .type("Auto").description("Vehicle collision repair").amount(new BigDecimal("12800.00"))
                    .status(ClaimStatus.IN_REVIEW).submittedBy("analyst").build());
            claimRepository.save(Claim.builder().claimNumber("CLM-DEMO003").claimantName("Bob Johnson")
                    .type("Property").description("Water damage claim").amount(new BigDecimal("7600.00"))
                    .status(ClaimStatus.APPROVED).submittedBy("admin").build());
            log.info("Seeded 3 demo claims");
        }
    }
}
