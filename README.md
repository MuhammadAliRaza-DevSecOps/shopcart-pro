<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>AUTOSECOPS</title>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"/>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Segoe UI', sans-serif; background: #0f0c29; color: #e0e0e0; }

  /* HEADER */
  .header { background: linear-gradient(135deg, #0f0c29, #302b63, #24243e); padding: 60px 20px 40px; text-align: center; }
  .header h1 { font-size: 3.5rem; color: #00d4ff; letter-spacing: 6px; font-weight: 800; }
  .header p { color: #a78bfa; font-size: 1.1rem; margin-top: 8px; }
  .badges { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; margin-top: 20px; }
  .badge { padding: 6px 14px; border-radius: 20px; font-size: 12px; font-weight: 600; letter-spacing: 0.5px; }
  .b-cyan  { background: #0e7490; color: #cffafe; }
  .b-purple{ background: #6d28d9; color: #ede9fe; }
  .b-green { background: #166534; color: #dcfce7; }
  .b-orange{ background: #9a3412; color: #ffedd5; }
  .b-gray  { background: #1e293b; color: #94a3b8; }

  /* TOC */
  .toc { background: #1a1a2e; border: 1px solid #302b63; border-radius: 12px; padding: 24px; margin: 30px auto; max-width: 800px; }
  .toc h2 { color: #00d4ff; margin-bottom: 16px; font-size: 1.2rem; }
  .toc table { width: 100%; border-collapse: collapse; }
  .toc td { padding: 8px 12px; border-bottom: 1px solid #302b63; }
  .toc td:first-child { color: #a78bfa; width: 40px; text-align: center; }
  .toc a { color: #e0e0e0; text-decoration: none; }
  .toc a:hover { color: #00d4ff; }

  /* SECTIONS */
  .section { max-width: 900px; margin: 40px auto; padding: 0 20px; }
  .section h2 { color: #00d4ff; font-size: 1.5rem; border-bottom: 1px solid #302b63; padding-bottom: 10px; margin-bottom: 20px; }
  .section h3 { color: #a78bfa; font-size: 1.1rem; margin: 20px 0 12px; text-align: center; }
  .section p  { color: #c0c0c0; line-height: 1.7; margin-bottom: 14px; }

  /* PHILOSOPHY BOX */
  .philosophy { background: #1a1a2e; border: 1px solid #00d4ff44; border-radius: 8px; padding: 16px 24px; text-align: center; font-family: monospace; color: #00d4ff; letter-spacing: 1px; margin: 20px 0; }

  /* PILLAR TABLE */
  table.pillar { width: 100%; border-collapse: collapse; margin: 16px 0; }
  table.pillar th { background: #1a1a2e; color: #a78bfa; padding: 10px 14px; text-align: left; border: 1px solid #302b63; }
  table.pillar td { padding: 10px 14px; border: 1px solid #302b63; color: #c0c0c0; vertical-align: top; }
  table.pillar td:first-child { color: #00d4ff; font-weight: 600; }
  table.pillar tr:nth-child(even) td { background: #16162a; }

  /* PROBLEM CARDS */
  .problem-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 16px; margin: 20px 0; }
  .problem-card { background: #1a1a2e; border: 1px solid #302b63; border-radius: 10px; padding: 20px; text-align: center; }
  .problem-card .icon { font-size: 2rem; margin-bottom: 8px; }
  .problem-card b { color: #00d4ff; display: block; margin-bottom: 6px; }
  .problem-card small { color: #888; font-size: 12px; }

  /* ARCH PIPELINE */
  .pipeline { background: #0a0a1a; border: 1px solid #302b63; border-radius: 10px; padding: 24px; font-family: monospace; font-size: 12px; color: #a78bfa; overflow-x: auto; white-space: pre; line-height: 1.6; }

  /* TECH GRID */
  .tech-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 14px; margin: 16px 0; }
  .tech-card { background: #1a1a2e; border: 1px solid #302b63; border-radius: 10px; padding: 16px 10px; text-align: center; }
  .tech-card i { font-size: 2rem; margin-bottom: 8px; display: block; }
  .tech-card b { color: #e0e0e0; font-size: 13px; display: block; }
  .tech-card small { color: #666; font-size: 11px; }

  /* RESULTS TABLE */
  table.results { width: 100%; border-collapse: collapse; font-size: 13px; margin: 12px 0; }
  table.results th { background: #1a1a2e; color: #a78bfa; padding: 10px; text-align: left; border: 1px solid #302b63; }
  table.results td { padding: 9px 10px; border: 1px solid #302b63; color: #c0c0c0; }
  table.results tr:nth-child(even) td { background: #16162a; }
  .pass { color: #4ade80; font-weight: 600; }
  .fail-label { color: #f87171; font-weight: 600; }

  /* COMPARISON TABLE */
  table.compare { width: 100%; border-collapse: collapse; font-size: 13px; margin: 12px 0; }
  table.compare th { background: #1a1a2e; color: #a78bfa; padding: 10px; border: 1px solid #302b63; text-align: left; }
  table.compare td { padding: 9px 10px; border: 1px solid #302b63; color: #c0c0c0; }
  table.compare td:first-child { color: #00d4ff; font-weight: 600; }
  table.compare tr:nth-child(even) td { background: #16162a; }

  /* FUTURE GRID */
  .future-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); gap: 16px; margin: 16px 0; }
  .future-card { background: #1a1a2e; border: 1px solid #302b63; border-radius: 10px; padding: 20px; }
  .future-card .ficon { font-size: 1.8rem; margin-bottom: 8px; }
  .future-card b { color: #00d4ff; display: block; margin-bottom: 6px; font-size: 14px; }
  .future-card small { color: #888; font-size: 12px; line-height: 1.5; }

  /* AUTHOR */
  .author { background: linear-gradient(135deg, #24243e, #302b63, #0f0c29); border-radius: 16px; padding: 40px; text-align: center; max-width: 600px; margin: 40px auto; border: 1px solid #302b63; }
  .author-avatar { width: 80px; height: 80px; border-radius: 50%; background: linear-gradient(135deg, #302b63, #00d4ff33); border: 2px solid #00d4ff55; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; font-size: 2rem; color: #00d4ff; }
  .author h3 { color: #00d4ff; font-size: 1.4rem; margin-bottom: 4px; }
  .author-badges { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; margin: 12px 0; }
  .author-info { margin: 16px 0; }
  .author-info p { color: #a0a0b0; font-size: 13px; line-height: 1.8; }
  .author-info p strong { color: #c0c0e0; }
  .quote { font-style: italic; color: #a78bfa; border-left: 3px solid #302b63; padding-left: 14px; margin: 16px auto; text-align: left; font-size: 14px; max-width: 400px; }

  /* SOCIAL LINKS */
  .social-links { display: flex; justify-content: center; gap: 14px; margin-top: 20px; flex-wrap: wrap; }
  .social-btn { display: inline-flex; align-items: center; gap: 8px; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-size: 14px; font-weight: 600; transition: transform 0.15s, box-shadow 0.15s; }
  .social-btn:hover { transform: translateY(-2px); box-shadow: 0 4px 16px rgba(0,0,0,0.4); }
  .social-btn.linkedin { background: #0a66c2; color: #fff; }
  .social-btn.gmail    { background: #ea4335; color: #fff; }
  .social-btn.github   { background: #24292f; color: #fff; border: 1px solid #444; }
  .social-btn i { font-size: 16px; }

  /* FOOTER */
  .footer { text-align: center; padding: 30px 20px; color: #444; font-size: 12px; border-top: 1px solid #1a1a2e; margin-top: 40px; }
  .divider { border: none; border-top: 1px solid #1a1a2e; margin: 40px auto; max-width: 900px; }
</style>
</head>
<body>

<!-- HEADER -->
<div class="header">
  <h1>AUTOSECOPS</h1>
  <p>Automate &nbsp;|&nbsp; Secure &nbsp;|&nbsp; Deploy</p>
  <div class="badges">
    <span class="badge b-cyan">Version 1.0.0</span>
    <span class="badge b-purple">License MIT</span>
    <span class="badge b-cyan">DevSecOps Automation</span>
    <span class="badge b-green">Status: Completed</span>
    <span class="badge b-orange">FYP · NCBA&amp;E</span>
  </div>
  <div class="badges" style="margin-top:10px;">
    <span class="badge b-gray">GitHub Actions</span>
    <span class="badge b-gray">Jenkins CI/CD</span>
    <span class="badge b-gray">Docker</span>
    <span class="badge b-gray">Kubernetes</span>
    <span class="badge b-gray">AWS</span>
    <span class="badge b-gray">Ansible</span>
    <span class="badge b-gray">Prometheus</span>
    <span class="badge b-gray">Grafana</span>
    <span class="badge b-gray">SonarQube</span>
    <span class="badge b-gray">Trivy</span>
    <span class="badge b-gray">Wazuh</span>
    <span class="badge b-gray">Helm</span>
  </div>
</div>

<!-- TOC -->
<div class="toc">
  <h2>📌 Table of Contents</h2>
  <table>
    <tr><td>1</td><td><a href="#overview">🧠 Project Overview</a></td></tr>
    <tr><td>2</td><td><a href="#problem">⚠️ Problem Statement</a></td></tr>
    <tr><td>3</td><td><a href="#onprem">🏗️ On-Premises Architecture</a></td></tr>
    <tr><td>4</td><td><a href="#aws">☁️ AWS Cloud Architecture</a></td></tr>
    <tr><td>5</td><td><a href="#pipeline">🔄 Complete Pipeline Flow</a></td></tr>
    <tr><td>6</td><td><a href="#stack">🛠️ Full Tech Stack</a></td></tr>
    <tr><td>7</td><td><a href="#testing">🧪 Testing &amp; Results</a></td></tr>
    <tr><td>8</td><td><a href="#perf">📊 Performance Comparison</a></td></tr>
    <tr><td>9</td><td><a href="#future">🚀 Future Enhancements</a></td></tr>
    <tr><td>10</td><td><a href="#author">👨‍💻 Author</a></td></tr>
  </table>
</div>

<!-- OVERVIEW -->
<div class="section" id="overview">
  <h2>🧠 Project Overview</h2>
  <p><strong>AUTOSECOPS</strong> is a Final Year Project implementing a fully automated <strong>DevSecOps</strong> pipeline — integrating security at every stage of the software development lifecycle, from code commit to production deployment.</p>
  <div class="problem-grid">
    <div class="problem-card">
      <div class="icon">🖥️</div>
      <b>On-Premises</b>
      <small>Local infra via Ansible, orchestrated by Kubernetes with full SIEM + Honeypot stack</small>
    </div>
    <div class="problem-card">
      <div class="icon">☁️</div>
      <b>AWS Cloud</b>
      <small>Cloud-native on EC2 with VPC, IAM, CloudTrail, containerized workloads &amp; full observability</small>
    </div>
  </div>
  <div class="philosophy">SHIFT LEFT SECURITY &nbsp;·&nbsp; AUTOMATE EVERYTHING &nbsp;·&nbsp; FAIL FAST</div>
  <table class="pillar">
    <tr><th>Pillar</th><th>Description</th></tr>
    <tr><td>🤖 Automate</td><td>End-to-end CI/CD with Jenkins, Ansible, Helm, and HPA — zero manual deployments</td></tr>
    <tr><td>🔐 Secure</td><td>SAST (SonarQube), container scanning (Trivy), SIEM (Wazuh), Honeypot, and CloudTrail</td></tr>
    <tr><td>🚀 Deploy</td><td>Kubernetes-native deployments across both on-prem and AWS with full Helm packaging</td></tr>
  </table>
</div>

<hr class="divider"/>

<!-- PROBLEM -->
<div class="section" id="problem">
  <h2>⚠️ Problem Statement</h2>
  <p>Modern software teams face a critical challenge: <strong>speed vs. security</strong>. Traditional pipelines treat security as an afterthought — bolted on after development, causing costly delays and vulnerabilities in production.</p>
  <div class="problem-grid">
    <div class="problem-card"><div class="icon">🐢</div><b>Slow Release Cycles</b><small>Manual stages delay time-to-market</small></div>
    <div class="problem-card"><div class="icon">🔓</div><b>Late Security Checks</b><small>Vulnerabilities found post-deployment</small></div>
    <div class="problem-card"><div class="icon">📉</div><b>No Observability</b><small>Blind spots in runtime security &amp; health</small></div>
    <div class="problem-card"><div class="icon">⚙️</div><b>Manual Infrastructure</b><small>Error-prone, non-repeatable configs</small></div>
  </div>
  <p><strong>AUTOSECOPS solves this</strong> by embedding security tools directly into an automated pipeline — making every commit, build, and deployment secure by default.</p>
</div>

<hr class="divider"/>

<!-- ON-PREM ARCH -->
<div class="section" id="onprem">
  <h2>🏗️ On-Premises Architecture</h2>
  <h3>🔵 Local / Bare-Metal DevSecOps Pipeline</h3>
  <div class="tech-grid">
    <div class="tech-card"><i class="fa-brands fa-github" style="color:#e0e0e0"></i><b>GitHub</b><small>Source Control</small></div>
    <div class="tech-card"><i class="fa-brands fa-jenkins" style="color:#D24939"></i><b>Jenkins</b><small>CI/CD Orchestrator</small></div>
    <div class="tech-card"><i class="fa-solid fa-shield-halved" style="color:#4E9BCD"></i><b>SonarQube</b><small>SAST Analysis</small></div>
    <div class="tech-card"><i class="fa-brands fa-docker" style="color:#2496ED"></i><b>Docker</b><small>Containerization</small></div>
    <div class="tech-card"><i class="fa-solid fa-bug-slash" style="color:#1904DA"></i><b>Trivy</b><small>Image Scanning</small></div>
    <div class="tech-card"><i class="fa-solid fa-box-archive" style="color:#2496ED"></i><b>Docker Hub</b><small>Registry</small></div>
    <div class="tech-card"><i class="fa-solid fa-gears" style="color:#EE0000"></i><b>Ansible</b><small>Config Management</small></div>
    <div class="tech-card"><i class="fa-solid fa-dharmachakra" style="color:#326CE5"></i><b>Kubernetes</b><small>Orchestration</small></div>
    <div class="tech-card"><i class="fa-solid fa-helm" style="color:#0F1689"></i><b>Helm</b><small>Package Manager</small></div>
    <div class="tech-card"><i class="fa-solid fa-arrows-up-down" style="color:#a78bfa"></i><b>HPA</b><small>Auto Scaling</small></div>
    <div class="tech-card"><i class="fa-solid fa-fire" style="color:#E6522C"></i><b>Prometheus</b><small>Metrics</small></div>
    <div class="tech-card"><i class="fa-solid fa-chart-line" style="color:#F46800"></i><b>Grafana</b><small>Dashboards</small></div>
    <div class="tech-card"><i class="fa-solid fa-tower-broadcast" style="color:#005571"></i><b>Wazuh SIEM</b><small>Threat Detection</small></div>
    <div class="tech-card"><i class="fa-solid fa-spider" style="color:#f97316"></i><b>Honeypot</b><small>Intrusion Deception</small></div>
    <div class="tech-card"><i class="fa-solid fa-envelope" style="color:#4ade80"></i><b>Email Alerts</b><small>Notifications</small></div>
  </div>
</div>

<hr class="divider"/>

<!-- AWS ARCH -->
<div class="section" id="aws">
  <h2>☁️ AWS Cloud Architecture</h2>
  <h3>🟠 AWS Cloud DevSecOps Deployment</h3>
  <div class="tech-grid">
    <div class="tech-card"><i class="fa-brands fa-github" style="color:#e0e0e0"></i><b>GitHub</b><small>Source Control</small></div>
    <div class="tech-card"><i class="fa-brands fa-jenkins" style="color:#D24939"></i><b>Jenkins</b><small>on AWS EC2</small></div>
    <div class="tech-card"><i class="fa-solid fa-shield-halved" style="color:#4E9BCD"></i><b>SonarQube</b><small>Code Quality</small></div>
    <div class="tech-card"><i class="fa-brands fa-docker" style="color:#2496ED"></i><b>Docker</b><small>Build &amp; Package</small></div>
    <div class="tech-card"><i class="fa-solid fa-bug-slash" style="color:#1904DA"></i><b>Trivy</b><small>Vuln Scan</small></div>
    <div class="tech-card"><i class="fa-solid fa-dharmachakra" style="color:#326CE5"></i><b>Kubernetes</b><small>on EC2 Nodes</small></div>
    <div class="tech-card"><i class="fa-solid fa-server" style="color:#FF9900"></i><b>EC2</b><small>Compute</small></div>
    <div class="tech-card"><i class="fa-solid fa-network-wired" style="color:#FF9900"></i><b>VPC</b><small>Network Isolation</small></div>
    <div class="tech-card"><i class="fa-solid fa-user-shield" style="color:#FF9900"></i><b>IAM</b><small>Identity &amp; Access</small></div>
    <div class="tech-card"><i class="fa-solid fa-file-waveform" style="color:#FF9900"></i><b>CloudTrail</b><small>Audit Logging</small></div>
    <div class="tech-card"><i class="fa-solid fa-fire" style="color:#E6522C"></i><b>Prometheus</b><small>Metrics</small></div>
    <div class="tech-card"><i class="fa-solid fa-chart-line" style="color:#F46800"></i><b>Grafana</b><small>Dashboards</small></div>
    <div class="tech-card"><i class="fa-solid fa-bell" style="color:#facc15"></i><b>Billing Alerts</b><small>Cost Governance</small></div>
  </div>
</div>

<hr class="divider"/>

<!-- PIPELINE -->
<div class="section" id="pipeline">
  <h2>🔄 Complete Pipeline Flow</h2>
  <div class="pipeline">╔══════════════════════════════════════════════════════════════════╗
║              AUTOSECOPS  —  END-TO-END PIPELINE                 ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                  ║
║  [1] Developer pushes code  →  GitHub repo triggers hook        ║
║                                          │                       ║
║                                          ▼                       ║
║  [2] Jenkins picks up job  →  Checkout + Dependency Install     ║
║                                          │                       ║
║                                          ▼                       ║
║  [3] SonarQube SAST  →  Static code analysis + quality gates   ║
║                          ┌───────────────┴──────────────┐       ║
║                       PASS ✅                        FAIL ❌    ║
║                          │                            Email      ║
║                          ▼                                       ║
║  [4] Docker Build  →  Containerize application image            ║
║                                          │                       ║
║                                          ▼                       ║
║  [5] Trivy Scan  →  CVE scanning of image layers                ║
║                          ┌───────────────┴──────────────┐       ║
║                       CLEAN ✅                     CRITICAL ❌  ║
║                          │                            Email      ║
║                          ▼                                       ║
║  [6] Docker Hub  →  Push verified image to registry             ║
║                          ┌───────────────┴──────────────┐       ║
║               On-Premises 🖥️                        AWS ☁️      ║
║                          │                              │        ║
║                          ▼                              ▼        ║
║  [7a] Ansible → Config      [7b] EC2 + VPC + IAM provisioned   ║
║        K8s cluster                       │                       ║
║                          │               ▼                       ║
║                          └──→  Helm Deploy to Kubernetes        ║
║                                          │                       ║
║                                          ▼                       ║
║  [8] HPA  →  Auto-scales pods based on CPU/memory load          ║
║                                          │                       ║
║                                          ▼                       ║
║  [9] Prometheus + Grafana  →  Live metrics + dashboards         ║
║                                          │                       ║
║                                          ▼                       ║
║  [10] Wazuh SIEM  →  Runtime threat detection + log correlation ║
║  [10] Honeypot    →  Decoy layer for attacker fingerprinting    ║
║                                          │                       ║
║                                          ▼                       ║
║  [11] Email Alerts  →  Notify on anomalies, failures, breaches  ║
║                                                                  ║
╚══════════════════════════════════════════════════════════════════╝</div>
</div>

<hr class="divider"/>

<!-- TECH STACK -->
<div class="section" id="stack">
  <h2>🛠️ Full Tech Stack</h2>
  <h3>⚙️ DevOps &amp; CI/CD</h3>
  <div class="tech-grid">
    <div class="tech-card"><i class="fa-brands fa-github" style="color:#e0e0e0"></i><b>GitHub</b><small>Version Control &amp; Webhooks</small></div>
    <div class="tech-card"><i class="fa-brands fa-jenkins" style="color:#D24939"></i><b>Jenkins</b><small>Pipeline Automation</small></div>
    <div class="tech-card"><i class="fa-brands fa-docker" style="color:#2496ED"></i><b>Docker</b><small>Containerization</small></div>
    <div class="tech-card"><i class="fa-solid fa-box-archive" style="color:#2496ED"></i><b>Docker Hub</b><small>Image Registry</small></div>
    <div class="tech-card"><i class="fa-solid fa-gears" style="color:#EE0000"></i><b>Ansible</b><small>Infrastructure as Code</small></div>
  </div>
  <h3>🐳 Container Orchestration</h3>
  <div class="tech-grid">
    <div class="tech-card"><i class="fa-solid fa-dharmachakra" style="color:#326CE5"></i><b>Kubernetes</b><small>Container Orchestration</small></div>
    <div class="tech-card"><i class="fa-solid fa-helm" style="color:#0F1689"></i><b>Helm</b><small>K8s Package Manager</small></div>
    <div class="tech-card"><i class="fa-solid fa-arrows-up-down" style="color:#a78bfa"></i><b>HPA</b><small>Horizontal Pod Autoscaler</small></div>
  </div>
  <h3>🔐 Security Tools</h3>
  <div class="tech-grid">
    <div class="tech-card"><i class="fa-solid fa-shield-halved" style="color:#4E9BCD"></i><b>SonarQube</b><small>SAST / Code Quality</small></div>
    <div class="tech-card"><i class="fa-solid fa-bug-slash" style="color:#1904DA"></i><b>Trivy</b><small>Container Vuln Scanner</small></div>
    <div class="tech-card"><i class="fa-solid fa-tower-broadcast" style="color:#005571"></i><b>Wazuh SIEM</b><small>Threat Detection</small></div>
    <div class="tech-card"><i class="fa-solid fa-spider" style="color:#f97316"></i><b>Honeypot</b><small>Intrusion Deception</small></div>
  </div>
  <h3>📊 Monitoring &amp; Observability</h3>
  <div class="tech-grid">
    <div class="tech-card"><i class="fa-solid fa-fire" style="color:#E6522C"></i><b>Prometheus</b><small>Metrics &amp; Alerting</small></div>
    <div class="tech-card"><i class="fa-solid fa-chart-line" style="color:#F46800"></i><b>Grafana</b><small>Dashboards</small></div>
    <div class="tech-card"><i class="fa-solid fa-envelope" style="color:#4ade80"></i><b>Email Alerts</b><small>Real-time Notifications</small></div>
  </div>
  <h3>☁️ AWS Services</h3>
  <div class="tech-grid">
    <div class="tech-card"><i class="fa-solid fa-server" style="color:#FF9900"></i><b>EC2</b><small>Compute Instances</small></div>
    <div class="tech-card"><i class="fa-solid fa-network-wired" style="color:#FF9900"></i><b>VPC</b><small>Virtual Private Cloud</small></div>
    <div class="tech-card"><i class="fa-solid fa-user-shield" style="color:#FF9900"></i><b>IAM</b><small>Identity &amp; Access</small></div>
    <div class="tech-card"><i class="fa-solid fa-file-waveform" style="color:#FF9900"></i><b>CloudTrail</b><small>Audit &amp; Governance</small></div>
    <div class="tech-card"><i class="fa-solid fa-bell" style="color:#facc15"></i><b>Billing Alerts</b><small>Cost Governance</small></div>
  </div>
</div>

<hr class="divider"/>

<!-- TESTING -->
<div class="section" id="testing">
  <h2>🧪 Testing &amp; Results</h2>
  <h3>✅ Pipeline Validation</h3>
  <table class="results">
    <tr><th>Test Case</th><th>Tool</th><th>Expected</th><th>Result</th></tr>
    <tr><td>Code pushed with bug</td><td>SonarQube</td><td>Quality gate FAIL → pipeline halted</td><td class="pass">✅ Passed</td></tr>
    <tr><td>Clean code push</td><td>SonarQube</td><td>Quality gate PASS → continues</td><td class="pass">✅ Passed</td></tr>
    <tr><td>Image with HIGH CVE</td><td>Trivy</td><td>Scan FAIL → halted + alert</td><td class="pass">✅ Passed</td></tr>
    <tr><td>Clean Docker image</td><td>Trivy</td><td>Scan PASS → image pushed</td><td class="pass">✅ Passed</td></tr>
    <tr><td>Config deployment</td><td>Ansible</td><td>Idempotent playbook execution</td><td class="pass">✅ Passed</td></tr>
    <tr><td>App deployment</td><td>Helm + K8s</td><td>Pods running, service exposed</td><td class="pass">✅ Passed</td></tr>
    <tr><td>Pod load spike</td><td>HPA</td><td>Auto-scale up triggered</td><td class="pass">✅ Passed</td></tr>
    <tr><td>Intrusion attempt</td><td>Honeypot + Wazuh</td><td>Alert triggered + logged</td><td class="pass">✅ Passed</td></tr>
  </table>

  <h3>🔐 Security Testing</h3>
  <table class="results">
    <tr><th>Security Layer</th><th>Test Performed</th><th>Outcome</th></tr>
    <tr><td>SonarQube</td><td>Injected SQL injection + XSS in code</td><td class="pass">Detected and blocked ✅</td></tr>
    <tr><td>Trivy</td><td>Used image with known CVE-2023 vulns</td><td class="pass">Flagged CRITICAL, halted ✅</td></tr>
    <tr><td>Wazuh SIEM</td><td>Simulated brute force SSH attempt</td><td class="pass">Alert in &lt; 30s ✅</td></tr>
    <tr><td>Honeypot</td><td>Port-scanned honeypot endpoint</td><td class="pass">Attacker IP flagged ✅</td></tr>
    <tr><td>IAM (AWS)</td><td>Tested least-privilege access</td><td class="pass">Unauthorized blocked ✅</td></tr>
    <tr><td>CloudTrail</td><td>Performed API calls on AWS resources</td><td class="pass">All calls logged ✅</td></tr>
  </table>

  <h3>📈 Load &amp; Scaling Tests</h3>
  <table class="results">
    <tr><th>Scenario</th><th>Initial Pods</th><th>Peak Load</th><th>Pods After HPA</th><th>Response Time</th></tr>
    <tr><td>Normal traffic</td><td>2</td><td>20% CPU</td><td>2</td><td>~120ms</td></tr>
    <tr><td>Moderate load</td><td>2</td><td>60% CPU</td><td>4</td><td>~145ms</td></tr>
    <tr><td>Heavy load</td><td>2</td><td>85% CPU</td><td>8</td><td>~180ms</td></tr>
    <tr><td>Stress test</td><td>2</td><td>100% CPU</td><td>10 (max)</td><td>~220ms</td></tr>
  </table>
</div>

<hr class="divider"/>

<!-- PERFORMANCE -->
<div class="section" id="perf">
  <h2>📊 Performance Comparison</h2>
  <h3>🖥️ On-Premises vs ☁️ AWS Cloud</h3>
  <table class="compare">
    <tr><th>Metric</th><th>On-Premises</th><th>AWS Cloud</th></tr>
    <tr><td>Pipeline Execution Time</td><td>~6 min</td><td>~5 min</td></tr>
    <tr><td>Deployment Time</td><td>~3 min</td><td>~2.5 min</td></tr>
    <tr><td>Scaling Speed (HPA)</td><td>~45 sec</td><td>~35 sec</td></tr>
    <tr><td>Setup Complexity</td><td>High (manual infra)</td><td>Medium (managed services)</td></tr>
    <tr><td>Cost</td><td>CapEx (fixed hardware)</td><td>OpEx (pay-as-you-go)</td></tr>
    <tr><td>Availability</td><td>Single datacenter</td><td>Multi-AZ capable</td></tr>
    <tr><td>Security Visibility</td><td>Wazuh + Honeypot</td><td>Wazuh + CloudTrail + IAM</td></tr>
    <tr><td>Observability</td><td>Prometheus + Grafana</td><td>Prometheus + Grafana</td></tr>
    <tr><td>Scalability</td><td>Limited by hardware</td><td>Virtually unlimited</td></tr>
    <tr><td>Best For</td><td>Air-gapped / on-site envs</td><td>Enterprise cloud workloads</td></tr>
  </table>
  <div style="background:#1a1a2e;border-left:4px solid #00d4ff;border-radius:4px;padding:14px 18px;margin-top:16px;color:#c0c0c0;font-size:13px;line-height:1.7;">
    💡 <strong>Key Takeaway:</strong> Both deployments achieved full pipeline automation and security integration. AWS Cloud offered faster scaling and higher availability, while On-Premises provided full control and data sovereignty — both are production-viable depending on organizational requirements.
  </div>
</div>

<hr class="divider"/>

<!-- FUTURE -->
<div class="section" id="future">
  <h2>🚀 Future Enhancements</h2>
  <div class="future-grid">
    <div class="future-card"><div class="ficon">🤖</div><b>AI-Powered SIEM</b><small>ML-based anomaly detection in Wazuh for smarter threat classification</small></div>
    <div class="future-card"><div class="ficon">🔗</div><b>GitOps with ArgoCD</b><small>Declarative continuous delivery using ArgoCD for Kubernetes</small></div>
    <div class="future-card"><div class="ficon">🛡️</div><b>OPA Policy Engine</b><small>Open Policy Agent for fine-grained K8s admission control</small></div>
    <div class="future-card"><div class="ficon">📦</div><b>Artifact Management</b><small>Nexus or JFrog Artifactory for storing build artifacts securely</small></div>
    <div class="future-card"><div class="ficon">🌐</div><b>Multi-Cloud Support</b><small>Extend to GCP or Azure for hybrid cloud resilience</small></div>
    <div class="future-card"><div class="ficon">📋</div><b>Compliance Dashboards</b><small>SOC2 / ISO 27001 automated compliance reporting via Wazuh</small></div>
  </div>
</div>

<hr class="divider"/>

<!-- AUTHOR -->
<div class="section" id="author">
  <h2>👨‍💻 Author</h2>
  <div class="author">
    <div class="author-avatar">
      <i class="fa-solid fa-code" style="font-size:2rem;"></i>
    </div>
    <h3>Muhammad Ali Raza</h3>
    <div class="author-badges">
      <span class="badge b-cyan">Final Year Student · NCBA&amp;E</span>
      <span class="badge b-purple">Specialization: DevSecOps</span>
    </div>
    <div class="quote">
      "Security is not a product, but a process — automate it."
    </div>
    <div class="author-info">
      <p>🎓 <strong>Institution:</strong> National College of Business Administration &amp; Economics (NCBA&amp;E)</p>
      <p>📁 <strong>Project:</strong> AUTOSECOPS — Final Year Project (FYP)</p>
    </div>

    <!-- SOCIAL LINKS WITH ICONS -->
    <div class="social-links">
      <a class="social-btn linkedin"
         href="https://linkedin.com/in/ali-raza-0b9b52228"
         target="_blank" rel="noopener">
        <i class="fa-brands fa-linkedin"></i>
        LinkedIn
      </a>
      <a class="social-btn gmail"
         href="mailto:infoman55.it@gmail.com">
        <i class="fa-brands fa-google"></i>
        Gmail
      </a>
      <a class="social-btn github"
         href="https://github.com/MuhammadAliRaza-DevSecOps"
         target="_blank" rel="noopener">
        <i class="fa-brands fa-github"></i>
        GitHub
      </a>
    </div>
  </div>
</div>

<!-- FOOTER -->
<div class="footer">
  © 2025 Muhammad Ali Raza · NCBA&amp;E · All Rights Reserved
</div>

</body>
</html>
