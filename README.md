# 🛡️ CrimeNet AI — Criminal Intelligence & Network Analysis Platform

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=for-the-badge&logo=tailwind-css)
![React Flow](https://img.shields.io/badge/React_Flow-Graph_Engine-ff0072?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Active_Development-brightgreen?style=for-the-badge)

**An enterprise-grade, AI-powered criminal intelligence platform engineered for law enforcement agencies.**

[Explore Platform](#-key-modules--capabilities) • [Quick Start](#-quick-start) • [Tech Stack](#-technology-stack) • [Demo Access](#-demo-credentials)

</div>

---

## 🌟 Overview

**CrimeNet AI** is a state-of-the-art criminal intelligence and network analysis platform designed for Indian law enforcement agencies (Delhi Police, Special Cell, CID, STF, NIA). It translates complex multi-source intelligence data—such as FIR records, CDR transcripts, surveillance logs, bank trails, and ANPR vehicle hits—into interactive knowledge graphs, automated entity resolutions, and actionable AI-driven investigation briefs.

---

## 🎯 Key Modules & Capabilities

| Module | Route | Description |
| :--- | :--- | :--- |
| **🌐 Interactive Knowledge Graph** | `/dashboard/graph` | Real-time multi-entity graph visualization using React Flow with dynamic filtering, risk rings, and node inspection. |
| **🔍 Universal Intelligence Search** | `/dashboard/search` | Search across persons of interest, cases, vehicles, shell companies, and evidence records. |
| **🤖 AI Investigation Copilot** | `/dashboard/copilot` | Conversational AI copilot providing case summaries, network queries, and evidence citations. |
| **🧠 AI Entity Extraction** | `/dashboard/extraction` | NLP-powered automated extraction of entities (names, phone numbers, vehicle plates, addresses) from raw FIRs and reports. |
| **🔀 Entity Resolution Engine** | `/dashboard/resolution` | AI-driven deduplication and identity matching across disparate police databases with similarity scoring. |
| **⏱️ Investigation Timeline** | `/dashboard/timeline` | Chronological multi-case event sequence tracking with verified status flags and severity indicators. |
| **📂 Evidence Center** | `/dashboard/evidence` | Digital, physical, forensic, and surveillance evidence repository with confidence score meters. |
| **📊 Network Analysis Engine** | `/dashboard/network` | Centrality ranking, community detection, link prediction, and influence propagation algorithms. |
| **🗺️ Criminal Network Heatmap** | `/dashboard/heatmap` | Geographic hotspot visualization with regional density zones across major Indian metropolitan areas. |
| **🚗 Live Vehicle Surveillance** | `/dashboard/vehicles` | ANPR-integrated real-time vehicle tracking with movement history and geofence breach alerts. |
| **📝 Brief & Report Generator** | `/dashboard/reports` | Automated generation of formal investigation briefs, IPC section mappings, and PDF exports. |
| **📈 Analytics Dashboard** | `/dashboard/analytics` | High-level statistics on conviction rates, network growth trends, and crime category distributions. |
| **🔒 Admin & Audit Control** | `/dashboard/admin` | Role-based user administration, system health monitoring, and tamper-evident audit logging. |

---

## 💻 Technology Stack

- **Framework**: Next.js 15 (App Router, Turbopack)
- **Language**: TypeScript 5
- **Styling & Theme**: Tailwind CSS v4, Vanilla CSS Design System with Cyber Glassmorphism
- **Graph Engine**: React Flow (`@xyflow/react`)
- **Visualizations**: Recharts, Lucide Icons, Canvas 2D
- **Animations**: Framer Motion
- **State Management**: Zustand
- **Notifications**: React Hot Toast

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18.18+ or 20+
- npm / yarn / pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/deeprajput-codr/crimenet-ai.git

# Navigate into project directory
cd crimenet-ai

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (or `3001`) in your browser.

---

## 🔑 Demo Credentials

| Role | Email | Password | MFA Code |
| :--- | :--- | :--- | :--- |
| **Administrator** | `meera.joshi@crimenet.gov.in` | `admin123` | `123456` |
| **Senior Officer** | `karan.malhotra@crimenet.gov.in` | `officer123` | `123456` |
| **Intelligence Analyst** | `neha.tripathi@crimenet.gov.in` | `analyst123` | N/A |
| **Investigator** | `rahul.verma@crimenet.gov.in` | `invest123` | N/A |

---

## 📜 License & Disclaimer

Developed for **Smart India Hackathon (SIH)**. Restricted Access: Designed for authorized law enforcement intelligence workflows.
