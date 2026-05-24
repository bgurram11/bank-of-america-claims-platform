# Bank of America — Claims Management Platform (Small-Scale Demo)

**Client:** Bank of America, Richmond, VA  |  **Role:** Sr. Java Full Stack Developer  |  **Period:** Apr 2024 – Present

A working small-scale implementation of the BOA claims platform showcasing the core architecture from the resume: microservices, JWT security, event-driven Kafka messaging, and a React dashboard.

---

## Architecture

```
┌─────────────────┐     REST/JWT      ┌──────────────────────┐
│  React Frontend │ ◄───────────────► │   claims-service     │
│  (Vite + TS)    │                   │   Spring Boot 3      │
│  Port 3000      │                   │   Java 17  •  H2 DB  │
└─────────────────┘                   │   Port 8080          │
                                      └──────────┬───────────┘
                                                 │ Kafka
                                                 ▼
                                      ┌──────────────────────┐
                                      │ notification-service  │
                                      │ Spring Boot 3        │
                                      │ Kafka Consumer       │
                                      └──────────────────────┘
```

---

## Project Structure

```
BOA/
├── claims-service/               # Spring Boot 3, Java 17
│   └── src/main/java/com/boa/claims/
│       ├── controller/           # AuthController, ClaimController
│       ├── service/              # AuthService, ClaimService, ClaimEventProducer
│       ├── model/                # Claim, AppUser, ClaimStatus
│       ├── repository/           # JPA repositories
│       ├── security/             # JwtService, JwtFilter
│       └── config/               # SecurityConfig, KafkaConfig, DataSeeder
├── notification-service/         # Kafka consumer (event-driven)
├── frontend/                     # React 18 + TypeScript + Vite
│   └── src/
│       ├── components/           # Login, Dashboard, ClaimForm
│       ├── api/                  # Axios client with JWT interceptor
│       └── types/                # TypeScript interfaces
└── docker-compose.yml            # Full stack: Kafka + both services + frontend
```

---

## Key Features (Bullet Points)

### Backend — claims-service
- **JWT Authentication** — stateless login/register with JJWT 0.12, BCrypt password hashing
- **Claims CRUD API** — submit, list, get by ID, update status via REST endpoints
- **Event-Driven** — publishes `SUBMITTED`, `APPROVED`, `REJECTED`, `IN_REVIEW` events to Kafka
- **Spring Security** — stateless filter chain, CORS config, H2 console access for dev
- **H2 In-Memory DB** — swap-ready for Aurora/PostgreSQL in production
- **DataSeeder** — seeds two users (`admin`, `analyst`) and 3 demo claims on startup
- **Actuator** — `/actuator/health` and `/actuator/metrics` exposed out of the box
- **Validation** — `@Valid` on request DTOs, global exception handler for clean error responses

### Backend — notification-service
- **Kafka Consumer** — listens on `claims-events` topic, group `notification-service`
- **Extension point** — wired for email/SMS/push in production

### Frontend — React + TypeScript
- **Login page** — JWT login and register with demo credentials hint
- **Dashboard** — summary cards (counts + total value) per status
- **Filter tabs** — filter claims by ALL / PENDING / IN_REVIEW / APPROVED / REJECTED
- **Claim cards** — inline status dropdown to update each claim's status
- **New Claim modal** — form with validation (name, type, amount, description)
- **Axios interceptor** — attaches Bearer token to every request automatically

### Infrastructure
- **Docker Compose** — one command spins up Kafka + Zookeeper + both services + frontend
- **Multi-stage Dockerfiles** — Maven build stage → slim JRE runtime image

---

## Quick Start

### Option A — Docker (full stack with Kafka)

```bash
docker compose up --build
```

- Frontend → http://localhost:3000
- API → http://localhost:8080
- H2 Console → http://localhost:8080/h2-console (JDBC URL: `jdbc:h2:mem:claimsdb`)

### Option B — Local dev (no Kafka required)

```bash
# Terminal 1 — backend
cd claims-service
./mvnw spring-boot:run

# Terminal 2 — frontend
cd frontend
npm install && npm run dev
```

Open http://localhost:3000 — Kafka events are silently skipped when the broker is unavailable.

---

## API Reference

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/login` | None | Returns JWT token |
| POST | `/api/auth/register` | None | Creates account, returns token |
| GET | `/api/claims` | Bearer | List all claims |
| GET | `/api/claims/{id}` | Bearer | Get single claim |
| POST | `/api/claims` | Bearer | Submit new claim |
| PATCH | `/api/claims/{id}/status?status=APPROVED` | Bearer | Update claim status |

**Demo credentials:** `admin` / `password`  or  `analyst` / `password`

---

## Tech Stack

| Layer | Technologies Used |
|---|---|
| **Backend** | Java 17, Spring Boot 3.2, Spring Security, Spring Data JPA |
| **Messaging** | Apache Kafka, Spring Kafka |
| **Database** | H2 (dev) → Aurora/PostgreSQL (prod) |
| **Security** | JWT (JJWT 0.12), BCrypt, CORS, stateless sessions |
| **Frontend** | React 18, TypeScript, Vite, Axios |
| **Testing** | JUnit 5, Spring MockMvc, Kafka auto-config excluded in tests |
| **DevOps** | Docker, Docker Compose, multi-stage builds, nginx |

---

## Quantified Impact (from Production)

- **25%** improvement in claims processing speed via AI automation (AWS Bedrock + SageMaker)
- **50%** reduction in message latency through Kafka Streams and event-driven architecture
- **40%** reduction in manual deployment errors via CloudFormation and Ansible automation
