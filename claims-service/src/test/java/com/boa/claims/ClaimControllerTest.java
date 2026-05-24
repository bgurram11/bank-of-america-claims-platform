package com.boa.claims;

import com.boa.claims.dto.AuthRequest;
import com.boa.claims.dto.ClaimRequest;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class ClaimControllerTest {

    @Autowired MockMvc mvc;
    @Autowired ObjectMapper mapper;

    @Test
    void loginWithSeedUserReturnsToken() throws Exception {
        mvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(new AuthRequest("admin", "password"))))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").exists())
                .andExpect(jsonPath("$.username").value("admin"));
    }

    @Test
    void claimsEndpointRequiresAuth() throws Exception {
        mvc.perform(get("/api/claims"))
                .andExpect(status().isForbidden());
    }

    @Test
    void authenticatedUserCanFetchClaims() throws Exception {
        String token = mapper.readTree(
                mvc.perform(post("/api/auth/login")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(mapper.writeValueAsString(new AuthRequest("admin", "password"))))
                        .andReturn().getResponse().getContentAsString()
        ).get("token").asText();

        mvc.perform(get("/api/claims")
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray());
    }

    @Test
    void authenticatedUserCanSubmitClaim() throws Exception {
        String token = mapper.readTree(
                mvc.perform(post("/api/auth/login")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(mapper.writeValueAsString(new AuthRequest("admin", "password"))))
                        .andReturn().getResponse().getContentAsString()
        ).get("token").asText();

        ClaimRequest req = new ClaimRequest("Alice Test", "Medical", "Test claim", new BigDecimal("1500.00"));
        mvc.perform(post("/api/claims")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(req)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.claimNumber").exists())
                .andExpect(jsonPath("$.status").value("PENDING"));
    }
}
