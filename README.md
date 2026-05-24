# Bank of America – Cloud-Native Microservices Platform

**Client:** Bank of America, Richmond, VA
**Period:** April 2024 – Present
**Role:** Sr. Java Full Stack Developer

---

## Project Overview

Architected and delivered a cloud-native, event-driven microservices platform supporting high-volume claims processing, clinical data workflows, and AI-powered automation for Bank of America. The platform is built on Java 17 and Spring Boot 3+, deployed on AWS EKS/ECS, and designed for HIPAA-compliant, enterprise-scale operations.

---

## Key Responsibilities

### Microservices & Backend Architecture
- Designed and developed cloud-native microservices using **Java 17**, **Spring Boot 3+**, **Spring Cloud**, **Spring MVC**, and **Hibernate ORM** to support high-volume claims and clinical data workflows
- Enhanced routing, throttling, and service-to-service security using **Spring Cloud Gateway** with centralized configuration via **Spring Cloud Config**
- Improved performance and resilience using **Redis**, **Hazelcast**, and **Resilience4j**, reducing latency and enhancing fault tolerance

### AI & Automation
- Led end-to-end development of an **AI-powered claims automation platform** using **AWS Bedrock** and **SageMaker**, improving processing speed by 25%
- Built **Python-based services and data pipelines** for automation, ingestion, and transformation, integrating with Snowflake, databases, and object storage to support Java microservices and analytics workflows
- Used **GitHub Copilot** and **Claude AI** to generate boilerplate, validate APIs, and accelerate documentation and review cycles

### Event-Driven Systems
- Architected high-throughput event-driven systems using **Kafka Streams**, **CQRS**, **Event Sourcing**, **Avro/Protobuf**, and **Confluent Schema Registry**, reducing message latency by 50%

### Healthcare Interoperability
- Built and integrated secure REST APIs with EMR/EHR systems using **HL7/FHIR** standards to enable healthcare interoperability across internal and vendor platforms

### Security & Compliance
- Implemented enterprise-grade security with **OAuth2.1**, **JWT**, **Spring Security**, **mTLS**, **KMS encryption**, **VPC endpoints**, and **HIPAA-compliant PHI protection**

### Infrastructure & DevOps
- Developed **Terraform IaC modules** for VPC, EKS, IAM roles, ALBs, DynamoDB, CloudWatch alerts, and full automated provisioning pipelines
- Deployed and operated microservices on **ECS/EKS** with **GitOps** via **ArgoCD** and **Helm Charts** for version-controlled Kubernetes deployments
- Implemented service mesh patterns with **Istio/Envoy** including mTLS, traffic shifting, canary rollouts, and distributed telemetry
- Automated provisioning using **CloudFormation** and **Ansible**, reducing manual deployment errors by 40%

### Observability
- Implemented end-to-end observability with **OpenTelemetry**, **Prometheus/Grafana**, **ELK Stack**, **Splunk**, **Zipkin**, and **CloudWatch**

### Data Management
- Managed **Aurora**, **DynamoDB**, and **MongoDB** clusters, optimizing indexing, schema design, and query performance for large datasets

### Frontend
- Developed UI applications using **Angular (13–17)** and **React** with **TypeScript**, improving performance and scalability

### Testing
- Implemented comprehensive test automation using **JUnit**, **Mockito**, **Testcontainers**, **WireMock**, **Pact**, **Cucumber**, and **JEST**

### Collaboration
- Collaborated in **Agile/Scrum** with JIRA/Confluence and coordinated with cross-functional teams for feature delivery

---

## Technology Stack

| Category | Technologies |
|---|---|
| **Languages** | Java 17, Python, TypeScript |
| **Frameworks** | Spring Boot 3+, Spring Cloud, Spring MVC, Hibernate ORM |
| **Cloud** | AWS (EKS, ECS, Lambda, Aurora, DynamoDB, API Gateway, CloudWatch) |
| **Messaging** | Kafka Streams, Avro/Protobuf, Confluent Schema Registry, SQS/SNS |
| **Databases** | PostgreSQL, MongoDB, DynamoDB, Elasticsearch, Redis, Hazelcast |
| **DevOps** | Docker, Kubernetes, Helm, ArgoCD, Terraform, CloudFormation, Ansible |
| **Security** | OAuth2.1, JWT, mTLS, Spring Security, KMS |
| **Observability** | OpenTelemetry, Prometheus, Grafana, ELK, Splunk, Zipkin |
| **Frontend** | React.js, Angular 13–17, TypeScript |
| **Testing** | JUnit, Mockito, Testcontainers, WireMock, Pact, Cucumber, JEST |
| **AI/ML** | AWS Bedrock, SageMaker, GitHub Copilot, Claude AI |
| **Standards** | HL7/FHIR, HIPAA, CQRS, Event Sourcing |

---

## Architecture Highlights

- **Event-Driven Architecture** with CQRS and Event Sourcing patterns via Kafka Streams
- **Service Mesh** with Istio/Envoy for mTLS, traffic shifting, and canary deployments
- **GitOps** delivery model using ArgoCD and Helm for Kubernetes
- **Zero-Trust Security** with mTLS, OAuth2.1, and VPC-isolated infrastructure
- **AI-Augmented Workflows** using AWS Bedrock, SageMaker, and LLM tooling

---

## Quantified Impact

- **25%** improvement in claims processing speed via AI automation (AWS Bedrock + SageMaker)
- **50%** reduction in message latency through Kafka Streams and event-driven architecture
- **40%** reduction in manual deployment errors via CloudFormation and Ansible automation
