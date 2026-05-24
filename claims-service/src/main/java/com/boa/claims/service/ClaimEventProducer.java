package com.boa.claims.service;

import com.boa.claims.config.KafkaConfig;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class ClaimEventProducer {

    @Autowired(required = false)
    private KafkaTemplate<String, String> kafkaTemplate;

    public void publish(String claimNumber, String event) {
        if (kafkaTemplate == null) {
            log.debug("Kafka not configured — skipping event for {}", claimNumber);
            return;
        }
        String payload = String.format("{\"claimNumber\":\"%s\",\"event\":\"%s\"}", claimNumber, event);
        try {
            kafkaTemplate.send(KafkaConfig.CLAIMS_TOPIC, claimNumber, payload)
                    .whenComplete((result, ex) -> {
                        if (ex != null) {
                            log.warn("Kafka publish failed for {}: {}", claimNumber, ex.getMessage());
                        } else {
                            log.info("Event published — claim: {}, event: {}", claimNumber, event);
                        }
                    });
        } catch (Exception e) {
            log.warn("Kafka unavailable, skipping event for {}: {}", claimNumber, e.getMessage());
        }
    }
}
