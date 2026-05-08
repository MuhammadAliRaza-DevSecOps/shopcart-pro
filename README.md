<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f0c29,50:302b63,100:24243e&height=200&section=header&text=AUTOSECOPS&fontSize=72&fontColor=00d4ff&fontAlignY=38&desc=Automate%20%7C%20Secure%20%7C%20Deploy&descAlignY=58&descSize=22&descColor=a78bfa&animation=fadeIn" width="100%" alt="AUTOSECOPS Banner"/>

<br/>

![Version](https://img.shields.io/badge/Version-1.0.0-00d4ff?style=for-the-badge&logo=semver&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-a78bfa?style=for-the-badge&logo=open-source-initiative&logoColor=white)
![DevSecOps](https://img.shields.io/badge/DevSecOps-Automation-22d3ee?style=for-the-badge&logo=shield&logoColor=white)
![Status](https://img.shields.io/badge/Status-Completed-4ade80?style=for-the-badge&logo=checkmarx&logoColor=white)
![FYP](https://img.shields.io/badge/FYP-NCBA%26E-f97316?style=for-the-badge&logo=graduation-cap&logoColor=white)

<br/>

![GitHub](https://img.shields.io/badge/GitHub-Actions-181717?style=flat-square&logo=github&logoColor=white)
![Jenkins](https://img.shields.io/badge/Jenkins-CI%2FCD-D24939?style=flat-square&logo=jenkins&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Containers-2496ED?style=flat-square&logo=docker&logoColor=white)
![Kubernetes](https://img.shields.io/badge/Kubernetes-Orchestration-326CE5?style=flat-square&logo=kubernetes&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-Cloud-FF9900?style=flat-square&logo=amazon-aws&logoColor=white)
![Ansible](https://img.shields.io/badge/Ansible-Automation-EE0000?style=flat-square&logo=ansible&logoColor=white)
![Prometheus](https://img.shields.io/badge/Prometheus-Monitoring-E6522C?style=flat-square&logo=prometheus&logoColor=white)
![Grafana](https://img.shields.io/badge/Grafana-Dashboards-F46800?style=flat-square&logo=grafana&logoColor=white)
![SonarQube](https://img.shields.io/badge/SonarQube-SAST-4E9BCD?style=flat-square&logo=sonarqube&logoColor=white)
![Trivy](https://img.shields.io/badge/Trivy-Security-1904DA?style=flat-square&logo=aqua&logoColor=white)
![Wazuh](https://img.shields.io/badge/Wazuh-SIEM-005571?style=flat-square&logo=elastic&logoColor=white)
![Helm](https://img.shields.io/badge/Helm-Package%20Manager-0F1689?style=flat-square&logo=helm&logoColor=white)

</div>

---

## 📌 Table of Contents

| # | Section |
|---|---------|
| 1 | [🧠 Project Overview](#-project-overview) |
| 2 | [⚠️ Problem Statement](#️-problem-statement) |
| 3 | [🏗️ On-Premises Architecture](#️-on-premises-architecture) |
| 4 | [☁️ AWS Cloud Architecture](#️-aws-cloud-architecture) |
| 5 | [🔄 Complete Pipeline Flow](#-complete-pipeline-flow) |
| 6 | [🛠️ Full Tech Stack](#️-full-tech-stack) |
| 7 | [📸 Screenshots](#-screenshots) |
| 8 | [🧪 Testing & Results](#-testing--results) |
| 9 | [📊 Performance Comparison](#-performance-comparison) |
| 10 | [🚀 Future Enhancements](#-future-enhancements) |
| 11 | [👨‍💻 Author](#-author) |

---

## 🧠 Project Overview

<div align="center">
<img src="https://capsule-render.vercel.app/api?type=rect&color=0:0f0c29,100:302b63&height=3&section=header" width="100%"/>
</div>

> **AUTOSECOPS** is a Final Year Project that implements a fully automated **DevSecOps** pipeline — integrating security at every stage of the software development lifecycle, from code commit to production deployment.

The project delivers two complete, production-grade deployment environments:

<div align="center">
<table>
<tr>
<td align="center" width="45%">
<h3>🖥️ On-Premises Deployment</h3>
<img src="https://img.shields.io/badge/Environment-Local%20%2F%20Bare%20Metal-00d4ff?style=for-the-badge" /><br/><br/>
Local infrastructure managed via <b>Ansible</b>, orchestrated by <b>Kubernetes</b>, secured and monitored end-to-end with a full SIEM + Honeypot stack.
</td>
<td align="center" width="10%">⚡</td>
<td align="center" width="45%">
<h3>☁️ AWS Cloud Deployment</h3>
<img src="https://img.shields.io/badge/Environment-AWS%20Cloud-FF9900?style=for-the-badge&logo=amazon-aws" /><br/><br/>
Cloud-native deployment on <b>AWS EC2</b> with <b>VPC</b>, <b>IAM</b>, <b>CloudTrail</b>, containerized workloads, and full observability.
</td>
</tr>
</table>
</div>

<br/>

**Core Philosophy:**

```
┌─────────────────────────────────────────────────────────────────┐
│   SHIFT LEFT SECURITY  ·  AUTOMATE EVERYTHING  ·  FAIL FAST    │
└─────────────────────────────────────────────────────────────────┘
```

| 🔑 Pillar | Description |
|-----------|-------------|
| **Automate** | End-to-end CI/CD with Jenkins, Ansible, Helm, and HPA — zero manual deployments |
| **Secure** | SAST (SonarQube), container scanning (Trivy), SIEM (Wazuh), Honeypot, and CloudTrail |
| **Deploy** | Kubernetes-native deployments across both on-prem and AWS with full Helm packaging |

---

## ⚠️ Problem Statement

Modern software teams face a critical challenge: **speed vs. security**. Traditional pipelines treat security as an afterthought — bolted on after development, causing costly delays and vulnerabilities in production.

<div align="center">
<table>
<tr>
<td align="center" width="22%">
🐢<br/><b>Slow Release Cycles</b><br/><sub>Manual stages delay time-to-market</sub>
</td>
<td align="center" width="22%">
🔓<br/><b>Late Security Checks</b><br/><sub>Vulnerabilities found post-deployment</sub>
</td>
<td align="center" width="22%">
📉<br/><b>No Observability</b><br/><sub>Blind spots in runtime security & health</sub>
</td>
<td align="center" width="22%">
⚙️<br/><b>Manual Infrastructure</b><br/><sub>Error-prone, non-repeatable configs</sub>
</td>
</tr>
</table>
</div>

**AUTOSECOPS solves this** by embedding security tools directly into an automated pipeline — making every commit, build, and deployment secure by default.

---

## 🏗️ On-Premises Architecture

<div align="center">

### 🔵 Local / Bare-Metal DevSecOps Pipeline

<br/>

<table>
<tr>
<td align="center" width="140">
<img src="https://cdn-icons-png.flaticon.com/512/733/733553.png" width="65"><br/>
<b>GitHub</b><br/>
<sub>Source Control</sub>
</td>
<td align="center" width="40"><b>→</b></td>
<td align="center" width="140">
<img src="https://cdn-icons-png.flaticon.com/512/5968/5968853.png" width="65"><br/>
<b>Jenkins</b><br/>
<sub>CI/CD Orchestrator</sub>
</td>
<td align="center" width="40"><b>→</b></td>
<td align="center" width="140">
<img src="https://cdn-icons-png.flaticon.com/512/6132/6132221.png" width="65"><br/>
<b>SonarQube</b><br/>
<sub>SAST Analysis</sub>
</td>
<td align="center" width="40"><b>→</b></td>
<td align="center" width="140">
<img src="https://cdn-icons-png.flaticon.com/512/919/919853.png" width="65"><br/>
<b>Docker</b><br/>
<sub>Containerization</sub>
</td>
</tr>
</table>

<br/>

<table>
<tr>
<td align="center" width="140">
<img src="https://cdn-icons-png.flaticon.com/512/5968/5968705.png" width="65"><br/>
<b>Trivy</b><br/>
<sub>Image Scanning</sub>
</td>
<td align="center" width="40"><b>→</b></td>
<td align="center" width="140">
<img src="https://cdn-icons-png.flaticon.com/512/5969/5969059.png" width="65"><br/>
<b>Docker Hub</b><br/>
<sub>Registry</sub>
</td>
<td align="center" width="40"><b>→</b></td>
<td align="center" width="140">
<img src="https://cdn-icons-png.flaticon.com/512/919/919836.png" width="65"><br/>
<b>Ansible</b><br/>
<sub>Config Management</sub>
</td>
<td align="center" width="40"><b>→</b></td>
<td align="center" width="140">
<img src="https://cdn-icons-png.flaticon.com/512/5969/5969062.png" width="65"><br/>
<b>Kubernetes</b><br/>
<sub>Orchestration</sub>
</td>
</tr>
</table>

<br/>

<table>
<tr>
<td align="center" width="140">
<img src="https://cdn-icons-png.flaticon.com/512/9850/9850774.png" width="65"><br/>
<b>Helm</b><br/>
<sub>Package Manager</sub>
</td>
<td align="center" width="40"><b>+</b></td>
<td align="center" width="140">
<img src="https://cdn-icons-png.flaticon.com/512/2920/2920277.png" width="65"><br/>
<b>HPA</b><br/>
<sub>Auto Scaling</sub>
</td>
<td align="center" width="40"><b>→</b></td>
<td align="center" width="140">
<img src="https://cdn-icons-png.flaticon.com/512/2920/2920349.png" width="65"><br/>
<b>Prometheus</b><br/>
<sub>Metrics Collection</sub>
</td>
<td align="center" width="40"><b>+</b></td>
<td align="center" width="140">
<img src="https://cdn-icons-png.flaticon.com/512/5968/5968705.png" width="65"><br/>
<b>Grafana</b><br/>
<sub>Dashboards</sub>
</td>
</tr>
</table>

<br/>

<table>
<tr>
<td align="center" width="180">
<img src="https://cdn-icons-png.flaticon.com/512/2716/2716652.png" width="65"><br/>
<b>Wazuh SIEM</b><br/>
<sub>Threat Detection & Log Analysis</sub>
</td>
<td align="center" width="60"><b>+</b></td>
<td align="center" width="180">
<img src="https://cdn-icons-png.flaticon.com/512/2092/2092693.png" width="65"><br/>
<b>Honeypot</b><br/>
<sub>Intrusion Deception Layer</sub>
</td>
<td align="center" width="60"><b>→</b></td>
<td align="center" width="180">
<img src="https://cdn-icons-png.flaticon.com/512/561/561127.png" width="65"><br/>
<b>Email Alerts</b><br/>
<sub>Real-time Notifications</sub>
</td>
</tr>
</table>

</div>

---

## ☁️ AWS Cloud Architecture

<div align="center">

### 🟠 AWS Cloud DevSecOps Deployment

<br/>

<table>
<tr>
<td align="center" width="140">
<img src="https://cdn-icons-png.flaticon.com/512/733/733553.png" width="65"><br/>
<b>GitHub</b><br/>
<sub>Source Control</sub>
</td>
<td align="center" width="40"><b>→</b></td>
<td align="center" width="140">
<img src="https://cdn-icons-png.flaticon.com/512/5968/5968853.png" width="65"><br/>
<b>Jenkins</b><br/>
<sub>on AWS EC2</sub>
</td>
<td align="center" width="40"><b>→</b></td>
<td align="center" width="140">
<img src="https://cdn-icons-png.flaticon.com/512/6132/6132221.png" width="65"><br/>
<b>SonarQube</b><br/>
<sub>Code Quality</sub>
</td>
<td align="center" width="40"><b>→</b></td>
<td align="center" width="140">
<img src="https://cdn-icons-png.flaticon.com/512/919/919853.png" width="65"><br/>
<b>Docker</b><br/>
<sub>Build & Package</sub>
</td>
</tr>
</table>

<br/>

<table>
<tr>
<td align="center" width="140">
<img src="https://cdn-icons-png.flaticon.com/512/5968/5968705.png" width="65"><br/>
<b>Trivy</b><br/>
<sub>Vulnerability Scan</sub>
</td>
<td align="center" width="40"><b>→</b></td>
<td align="center" width="140">
<img src="https://cdn-icons-png.flaticon.com/512/5969/5969059.png" width="65"><br/>
<b>Docker Hub</b><br/>
<sub>Image Registry</sub>
</td>
<td align="center" width="40"><b>→</b></td>
<td align="center" width="140">
<img src="https://cdn-icons-png.flaticon.com/512/5969/5969062.png" width="65"><br/>
<b>Kubernetes</b><br/>
<sub>on EC2 Nodes</sub>
</td>
<td align="center" width="40"><b>→</b></td>
<td align="center" width="140">
<img src="https://cdn-icons-png.flaticon.com/512/9850/9850774.png" width="65"><br/>
<b>Helm</b><br/>
<sub>Deployment Charts</sub>
</td>
</tr>
</table>

<br/>

**AWS Infrastructure Layer:**

<table>
<tr>
<td align="center" width="160">
<img src="https://cdn-icons-png.flaticon.com/512/4359/4359965.png" width="65"><br/>
<b>AWS EC2</b><br/>
<sub>Compute Instances</sub>
</td>
<td align="center" width="40"><b>+</b></td>
<td align="center" width="160">
<img src="https://cdn-icons-png.flaticon.com/512/2920/2920277.png" width="65"><br/>
<b>VPC</b><br/>
<sub>Network Isolation</sub>
</td>
<td align="center" width="40"><b>+</b></td>
<td align="center" width="160">
<img src="https://cdn-icons-png.flaticon.com/512/2716/2716652.png" width="65"><br/>
<b>IAM</b><br/>
<sub>Identity & Access</sub>
</td>
<td align="center" width="40"><b>+</b></td>
<td align="center" width="160">
<img src="https://cdn-icons-png.flaticon.com/512/2920/2920349.png" width="65"><br/>
<b>CloudTrail</b><br/>
<sub>Audit Logging</sub>
</td>
</tr>
</table>

<br/>

<table>
<tr>
<td align="center" width="200">
<img src="https://cdn-icons-png.flaticon.com/512/2920/2920349.png" width="65"><br/>
<b>Prometheus + Grafana</b><br/>
<sub>Observability Stack</sub>
</td>
<td align="center" width="60"><b>+</b></td>
<td align="center" width="200">
<img src="https://cdn-icons-png.flaticon.com/512/561/561127.png" width="65"><br/>
<b>Billing Alerts</b><br/>
<sub>Cost Governance</sub>
</td>
<td align="center" width="60"><b>+</b></td>
<td align="center" width="200">
<img src="https://cdn-icons-png.flaticon.com/512/561/561127.png" width="65"><br/>
<b>Email Alerts</b><br/>
<sub>Incident Notifications</sub>
</td>
</tr>
</table>

</div>

---

## 🔄 Complete Pipeline Flow

<div align="center">

```
 ╔══════════════════════════════════════════════════════════════════╗
 ║              AUTOSECOPS  —  END-TO-END PIPELINE                 ║
 ╠══════════════════════════════════════════════════════════════════╣
 ║                                                                  ║
 ║  [1] Developer pushes code  →  GitHub repository triggers hook  ║
 ║                                          │                       ║
 ║                                          ▼                       ║
 ║  [2] Jenkins picks up job  →  Checkout + Dependency Install      ║
 ║                                          │                       ║
 ║                                          ▼                       ║
 ║  [3] SonarQube SAST  →  Static code analysis + quality gates    ║
 ║                                          │                       ║
 ║                          ┌───────────────┴──────────────┐       ║
 ║                       PASS ✅                        FAIL ❌     ║
 ║                          │                            Email      ║
 ║                          ▼                                       ║
 ║  [4] Docker Build  →  Containerize application image            ║
 ║                                          │                       ║
 ║                                          ▼                       ║
 ║  [5] Trivy Scan  →  CVE scanning of image layers                ║
 ║                                          │                       ║
 ║                          ┌───────────────┴──────────────┐       ║
 ║                       CLEAN ✅                     CRITICAL ❌   ║
 ║                          │                            Email      ║
 ║                          ▼                                       ║
 ║  [6] Docker Hub  →  Push verified image to registry             ║
 ║                                          │                       ║
 ║                          ┌───────────────┴──────────────┐       ║
 ║               On-Premises 🖥️                        AWS ☁️       ║
 ║                          │                              │        ║
 ║                          ▼                              ▼        ║
 ║  [7a] Ansible  →  Config      [7b] EC2 + VPC + IAM provisioned  ║
 ║        Kubernetes cluster              │                         ║
 ║                          │            ▼                          ║
 ║                          └──→  Helm Deploy to Kubernetes         ║
 ║                                        │                         ║
 ║                                        ▼                         ║
 ║  [8] HPA  →  Auto-scales pods based on CPU/memory load          ║
 ║                                        │                         ║
 ║                                        ▼                         ║
 ║  [9] Prometheus + Grafana  →  Live metrics + dashboards         ║
 ║                                        │                         ║
 ║                                        ▼                         ║
 ║  [10] Wazuh SIEM  →  Runtime threat detection + log correlation  ║
 ║  [10] Honeypot    →  Decoy layer for attacker fingerprinting     ║
 ║                                        │                         ║
 ║                                        ▼                         ║
 ║  [11] Email Alerts  →  Notify on anomalies, failures, breaches  ║
 ║                                                                  ║
 ╚══════════════════════════════════════════════════════════════════╝
```

</div>

---

## 🛠️ Full Tech Stack

<div align="center">

### ⚙️ DevOps & CI/CD

<table>
<tr>
<td align="center" width="130">
<img src="https://cdn-icons-png.flaticon.com/512/733/733553.png" width="55"><br/>
<b>GitHub</b><br/>
<sub>Version Control & Webhooks</sub>
</td>
<td align="center" width="130">
<img src="https://cdn-icons-png.flaticon.com/512/5968/5968853.png" width="55"><br/>
<b>Jenkins</b><br/>
<sub>Pipeline Automation</sub>
</td>
<td align="center" width="130">
<img src="https://cdn-icons-png.flaticon.com/512/919/919853.png" width="55"><br/>
<b>Docker</b><br/>
<sub>Containerization</sub>
</td>
<td align="center" width="130">
<img src="https://cdn-icons-png.flaticon.com/512/5969/5969059.png" width="55"><br/>
<b>Docker Hub</b><br/>
<sub>Image Registry</sub>
</td>
<td align="center" width="130">
<img src="https://cdn-icons-png.flaticon.com/512/919/919836.png" width="55"><br/>
<b>Ansible</b><br/>
<sub>Infrastructure as Code</sub>
</td>
</tr>
</table>

### 🐳 Container Orchestration

<table>
<tr>
<td align="center" width="200">
<img src="https://cdn-icons-png.flaticon.com/512/5969/5969062.png" width="55"><br/>
<b>Kubernetes</b><br/>
<sub>Container Orchestration</sub>
</td>
<td align="center" width="200">
<img src="https://cdn-icons-png.flaticon.com/512/9850/9850774.png" width="55"><br/>
<b>Helm</b><br/>
<sub>Kubernetes Package Manager</sub>
</td>
<td align="center" width="200">
<img src="https://cdn-icons-png.flaticon.com/512/2920/2920277.png" width="55"><br/>
<b>HPA</b><br/>
<sub>Horizontal Pod Autoscaler</sub>
</td>
</tr>
</table>

### 🔐 Security Tools

<table>
<tr>
<td align="center" width="160">
<img src="https://cdn-icons-png.flaticon.com/512/6132/6132221.png" width="55"><br/>
<b>SonarQube</b><br/>
<sub>SAST / Code Quality</sub>
</td>
<td align="center" width="160">
<img src="https://cdn-icons-png.flaticon.com/512/5968/5968705.png" width="55"><br/>
<b>Trivy</b><br/>
<sub>Container Vulnerability Scanner</sub>
</td>
<td align="center" width="160">
<img src="https://cdn-icons-png.flaticon.com/512/2716/2716652.png" width="55"><br/>
<b>Wazuh SIEM</b><br/>
<sub>Threat Detection & SIEM</sub>
</td>
<td align="center" width="160">
<img src="https://cdn-icons-png.flaticon.com/512/2092/2092693.png" width="55"><br/>
<b>Honeypot</b><br/>
<sub>Intrusion Deception</sub>
</td>
</tr>
</table>

### 📊 Monitoring & Observability

<table>
<tr>
<td align="center" width="220">
<img src="https://cdn-icons-png.flaticon.com/512/2920/2920349.png" width="55"><br/>
<b>Prometheus</b><br/>
<sub>Metrics Collection & Alerting</sub>
</td>
<td align="center" width="220">
<img src="https://cdn-icons-png.flaticon.com/512/5968/5968705.png" width="55"><br/>
<b>Grafana</b><br/>
<sub>Dashboards & Visualization</sub>
</td>
<td align="center" width="220">
<img src="https://cdn-icons-png.flaticon.com/512/561/561127.png" width="55"><br/>
<b>Email Alerts</b><br/>
<sub>Real-time Notifications</sub>
</td>
</tr>
</table>

### ☁️ AWS Services

<table>
<tr>
<td align="center" width="160">
<img src="https://cdn-icons-png.flaticon.com/512/4359/4359965.png" width="55"><br/>
<b>EC2</b><br/>
<sub>Compute Instances</sub>
</td>
<td align="center" width="160">
<img src="https://cdn-icons-png.flaticon.com/512/2920/2920277.png" width="55"><br/>
<b>VPC</b><br/>
<sub>Virtual Private Cloud</sub>
</td>
<td align="center" width="160">
<img src="https://cdn-icons-png.flaticon.com/512/2716/2716652.png" width="55"><br/>
<b>IAM</b><br/>
<sub>Identity & Access Mgmt</sub>
</td>
<td align="center" width="160">
<img src="https://cdn-icons-png.flaticon.com/512/2920/2920349.png" width="55"><br/>
<b>CloudTrail</b><br/>
<sub>Audit & Governance</sub>
</td>
<td align="center" width="160">
<img src="https://cdn-icons-png.flaticon.com/512/561/561127.png" width="55"><br/>
<b>Billing Alerts</b><br/>
<sub>Cost Governance</sub>
</td>
</tr>
</table>

</div>

---

## 🧪 Testing & Results

### ✅ Pipeline Validation

| Test Case | Tool | Expected | Result |
|-----------|------|----------|--------|
| Code pushed with bug | SonarQube | Quality gate FAIL → pipeline halted | ✅ Passed |
| Clean code push | SonarQube | Quality gate PASS → pipeline continues | ✅ Passed |
| Image with HIGH CVE | Trivy | Scan FAIL → pipeline halted + alert | ✅ Passed |
| Clean Docker image | Trivy | Scan PASS → image pushed to registry | ✅ Passed |
| Config deployment | Ansible | Idempotent playbook execution | ✅ Passed |
| App deployment | Helm + K8s | Pods running, service exposed | ✅ Passed |
| Pod load spike | HPA | Auto-scale up triggered | ✅ Passed |
| Intrusion attempt | Honeypot + Wazuh | Alert triggered + logged | ✅ Passed |

<br/>

### 🔐 Security Testing

| Security Layer | Test Performed | Outcome |
|----------------|---------------|---------|
| **SonarQube** | Injected SQL injection + XSS in code | Detected and blocked ✅ |
| **Trivy** | Used image with known CVE-2023 vulns | Flagged CRITICAL, pipeline halted ✅ |
| **Wazuh SIEM** | Simulated brute force SSH attempt | Alert generated in < 30s ✅ |
| **Honeypot** | Port-scanned honeypot endpoint | Attacker IP logged and flagged ✅ |
| **IAM (AWS)** | Tested least-privilege access | Unauthorized actions blocked ✅ |
| **CloudTrail** | Performed API calls on AWS resources | All calls logged and auditable ✅ |

<br/>

### 📈 Load & Scaling Tests

| Scenario | Initial Pods | Peak Load | Pods After HPA | Response Time |
|----------|-------------|-----------|----------------|---------------|
| Normal traffic | 2 | 20% CPU | 2 | ~120ms |
| Moderate load | 2 | 60% CPU | 4 | ~145ms |
| Heavy load | 2 | 85% CPU | 8 | ~180ms |
| Stress test | 2 | 100% CPU | 10 (max) | ~220ms |

---

## 📊 Performance Comparison

<div align="center">

### 🖥️ On-Premises vs ☁️ AWS Cloud

| Metric | On-Premises | AWS Cloud |
|--------|------------|-----------|
| **Pipeline Execution Time** | ~6 min | ~5 min |
| **Deployment Time** | ~3 min | ~2.5 min |
| **Scaling Speed (HPA)** | ~45 sec | ~35 sec |
| **Setup Complexity** | High (manual infra) | Medium (managed services) |
| **Cost** | CapEx (fixed hardware) | OpEx (pay-as-you-go) |
| **Availability** | Single datacenter | Multi-AZ capable |
| **Security Visibility** | Wazuh + Honeypot | Wazuh + CloudTrail + IAM |
| **Observability** | Prometheus + Grafana | Prometheus + Grafana |
| **Scalability** | Limited by hardware | Virtually unlimited |
| **Best For** | Air-gapped / on-site envs | Enterprise cloud workloads |

</div>

<br/>

> 💡 **Key Takeaway:** Both deployments achieved full pipeline automation and security integration. AWS Cloud offered faster scaling and higher availability, while On-Premises provided full control and data sovereignty — both are production-viable depending on organizational requirements.

---

## 🚀 Future Enhancements

<div align="center">
<table>
<tr>
<td align="center" width="200">
🤖<br/><b>AI-Powered SIEM</b><br/><sub>ML-based anomaly detection in Wazuh for smarter threat classification</sub>
</td>
<td align="center" width="200">
🔗<br/><b>GitOps with ArgoCD</b><br/><sub>Declarative continuous delivery using ArgoCD for Kubernetes</sub>
</td>
<td align="center" width="200">
🛡️<br/><b>OPA Policy Engine</b><br/><sub>Open Policy Agent for fine-grained K8s admission control</sub>
</td>
</tr>
<tr>
<td align="center" width="200">
📦<br/><b>Artifact Management</b><br/><sub>Nexus or JFrog Artifactory for storing build artifacts securely</sub>
</td>
<td align="center" width="200">
🌐<br/><b>Multi-Cloud Support</b><br/><sub>Extend to GCP or Azure for hybrid cloud resilience</sub>
</td>
<td align="center" width="200">
📋<br/><b>Compliance Dashboards</b><br/><sub>SOC2 / ISO 27001 automated compliance reporting via Wazuh</sub>
</td>
</tr>
</table>
</div>

---

## 👨‍💻 Author

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:24243e,50:302b63,100:0f0c29&height=120&section=footer&text=Built%20with%20%E2%9D%A4%EF%B8%8F%20by%20Muhammad%20Ali%20Raza&fontSize=22&fontColor=a78bfa&fontAlignY=55" width="100%"/>

<br/>

### Muhammad Ali Raza

![Student](https://img.shields.io/badge/Final%20Year%20Student-NCBA%26E-00d4ff?style=for-the-badge)
![DevSecOps](https://img.shields.io/badge/Specialization-DevSecOps-a78bfa?style=for-the-badge)

> *"Security is not a product, but a process — automate it."*

<br/>
🎓 Institution: National College of Business Administration & Economics (NCBA&E)
📁 Project: AUTOSECOPS — Final Year Project (FYP)
📧 Contact: infoman55.it@gmail.com
🔗 LinkedIn: linkedin.com/in/ali-raza-0b9b52228
🐙 GitHub: MuhammadAliRaza-DevSecOps
<br/>

---

<sub>© 2025 Muhammad Ali Raza · NCBA&E · All Rights Reserved</sub>

<br/>

![Visitors](https://visitor-badge.laobi.icu/badge?page_id=your-username.autosecops&color=00d4ff)
![Stars](https://img.shields.io/github/stars/your-username/autosecops?style=social)
![Forks](https://img.shields.io/github/forks/your-username/autosecops?style=social)

</div>
