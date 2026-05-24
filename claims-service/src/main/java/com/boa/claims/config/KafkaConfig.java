package com.boa.claims.config;

import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.TopicBuilder;

@Configuration
public class KafkaConfig {

    public static final String CLAIMS_TOPIC = "claims-events";

    @Bean
    public NewTopic claimsTopic() {
        return TopicBuilder.name(CLAIMS_TOPIC)
                .partitions(3)
                .replicas(1)
                .build();
    }
}
