# Unykorn XAUFTH/uUSD DeFi Ecosystem

![Integrity](https://github.com/kevanbtc/unykorn-site/actions/workflows/integrity.yml/badge.svg)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Deploy Status](https://img.shields.io/badge/Deploy-Live-brightgreen)](https://kevanbtc.github.io/unykorn-site)

> **Sovereign Gold-Backed DeFi Platform** - A comprehensive due diligence and transparency hub for the XAUFTH/uUSD ecosystem on Unykorn-1 L1 blockchain.

## 🌟 Overview

The Unykorn XAUFTH/uUSD ecosystem represents a next-generation DeFi platform focused on gold-backed stablecoins with institutional-grade security, transparency, and compliance. This site serves as the central hub for due diligence materials, real-time system metrics, and comprehensive documentation.

### Key Value Propositions
- **🔒 Bank-Grade Security**: Multi-signature Safe-gated operations with timelock controls
- **📊 Full Transparency**: Real-time KPIs, audit trails, and on-chain evidence
- **🏛️ Institutional Ready**: Compliance-first design with regulatory reporting
- **⚡ High Performance**: Optimized for scale with sub-hour settlement times
- **🌍 Cross-Chain**: Seamless bridging between L1 and mainnet

## 🏗️ Architecture

### Core Components

```
┌─────────────┐    ┌──────────────┐    ┌─────────────┐
│   Discord   │────│ Gnosis Safe  │────│ Unykorn-1   │
│     Bot     │    │  (2-of-3)    │    │     L1      │
└─────────────┘    └──────────────┘    └─────────────┘
       │                   │                   │
┌─────────────┐    ┌──────────────┐    ┌─────────────┐
│  PostgreSQL │    │   Grafana    │    │  Relayers   │
│   (State)   │    │ (Monitoring) │    │ (Off-chain) │
└─────────────┘    └──────────────┘    └─────────────┘
```

### Smart Contracts
- **ReserveManager.sol**: Core treasury and collateral management
- **VaultNFT.sol**: Tokenized vault ownership and lifecycle
- **BridgeMain.sol & BridgeL1.sol**: Cross-chain bridging infrastructure
- **SimpleAMM.sol & KYCRouter.sol**: Trading and compliance routing
- **GuardianTimelock.sol**: Security controls and governance
- **ComplianceRegistry.sol**: KYC/AML compliance tracking

## 🚀 Features

### Due Diligence & Transparency
- **📋 Real-Time KPIs**: Live system metrics and performance indicators
- **🔍 SHA-256 Verification**: Cryptographic integrity for all downloads
- **📊 Evidence Packs**: Structured JSON with on-chain anchoring
- **📈 Live Dashboards**: Grafana integration for operational transparency
- **📄 Audit Reports**: Professional security assessments and attestations

### Operational Excellence
- **⚡ Bulk Redemptions**: CSV-driven batch processing for institutional clients
- **🔐 Multi-Signature**: All critical operations require 2-of-3 consensus
- **📱 Discord Integration**: Secure administrative interface
- **🔄 Event Watching**: Real-time blockchain monitoring and alerts
- **💾 State Management**: PostgreSQL-backed persistence layer

### Compliance & Security
- **🏛️ Regulatory Ready**: Built-in compliance reporting and audit trails
- **🔒 Safe-First Design**: No raw private key operations
- **⏰ Timelock Protection**: Guardian controls for emergency situations
- **📊 Treasury Accounting**: Automated financial reporting and reconciliation
- **🔍 Continuous Monitoring**: 24/7 system health and security monitoring

## 📊 System Status

| Metric | Current Value | Target |
|--------|---------------|---------|
| **Redemptions/Day** | 150 | 200+ |
| **Median Latency** | 2.3h | <2h |
| **P95 Latency** | 8.1h | <6h |
| **Signer Participation** | 95% | >90% |
| **Reserve Ratio** | 1.02 | >1.0 |
| **System Uptime** | 99.9% | >99.5% |

*Real-time metrics available on the [live dashboard](https://kevanbtc.github.io/unykorn-site)*

## 🛠️ Development & Deployment

### Prerequisites
- **Foundry**: Smart contract development and deployment
- **Node.js 18+**: JavaScript runtime for off-chain services
- **Docker & Docker Compose**: Containerized deployment
- **PostgreSQL**: Database for state management
- **Grafana/Prometheus**: Monitoring and observability

### Local Development

```bash
# Clone the repository
git clone https://github.com/kevanbtc/unykorn-site.git
cd unykorn-site

# Start local server
python3 -m http.server 8000
# Navigate to http://localhost:8000

# For development with live reload
npx live-server --port=8000
```

### Deployment

The site is automatically deployed via GitHub Actions to GitHub Pages:
- **Production**: https://kevanbtc.github.io/unykorn-site
- **CI/CD**: Automated integrity checks and SHA-256 verification
- **Monitoring**: Built-in health checks and performance monitoring

## 📁 Project Structure

```
unykorn-site/
├── index.html              # Main site entry point
├── styles.css              # Responsive styling
├── script.js               # Interactive functionality
├── downloads/              # Due diligence materials
│   ├── audit/              # Security audit reports
│   ├── evidence/           # Structured evidence packs
│   ├── runbooks/           # Operational procedures
│   └── signatures/         # Cryptographic signatures
├── .github/
│   └── workflows/          # CI/CD automation
└── README.md               # This documentation
```

## 🔗 Key Resources

### Documentation
- **[📋 Phase 1 Security Checklist](downloads/runbooks/PHASE1_SECURITY_FOUNDATION.md)**: Implementation roadmap for security hardening
- **[🚀 Upgrade Roadmap](downloads/runbooks/UPGRADE_ROADMAP.md)**: Strategic development planning
- **[📊 Evidence Pack](downloads/evidence/evidence_pack.json)**: Structured system evidence and KPIs

### Downloads
- **[🔍 Audit Report](downloads/audit/Unykorn_XAUFTH_uUSD_Audit_2025-09-18.pdf)**: Professional security assessment
- **[📦 Due Diligence ZIP](downloads/Unykorn_DD_2025-09-18_v2.1.zip)**: Complete documentation package
- **[🔒 Audit Manifest](downloads/audit/Unykorn_XAUFTH_uUSD_Audit_2025-09-18_manifest.json)**: SHA-256 verification data

## 🔐 Security & Compliance

### Security Measures
- **Multi-Signature Operations**: All critical functions require 2-of-3 consensus
- **Hardware Security Modules**: Key storage and signing operations
- **Continuous Monitoring**: Real-time security event detection
- **Regular Audits**: Quarterly professional security assessments
- **Incident Response**: Documented procedures for security events

### Compliance Framework
- **KYC/AML Integration**: Built-in identity verification workflows
- **Regulatory Reporting**: Automated compliance documentation
- **Audit Trails**: Immutable transaction and operation logging
- **Data Privacy**: GDPR and privacy-by-design principles
- **Financial Controls**: SOX compliance for financial reporting

## 🤝 Contributing

We welcome contributions from the community. Please read our contributing guidelines and code of conduct before submitting pull requests.

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support & Contact

- **Documentation**: [GitHub Wiki](https://github.com/kevanbtc/unykorn-site/wiki)
- **Issues**: [GitHub Issues](https://github.com/kevanbtc/unykorn-site/issues)
- **Discord**: [Community Server](https://discord.gg/unykorn)
- **Email**: [support@unykorn.io](mailto:support@unykorn.io)

---

**⚠️ Disclaimer**: This software is provided "as-is" for educational and development purposes. Always conduct your own security audits and due diligence before using in production environments.