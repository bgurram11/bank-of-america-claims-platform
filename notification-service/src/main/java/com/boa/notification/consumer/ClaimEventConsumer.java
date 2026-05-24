package com.boa.notification.consumer;

import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class ClaimEventConsumer {

    @KafkaListener(topics = "claims-events", groupId = "notification-service")
    public void consume(String message) {
        log.info("[NOTIFICATION] Claim event received: {}", message);
        // Production extension: send email / SMS / push notification here
    }
}
