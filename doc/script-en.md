# Script & Automation Architecture Description

This document details the configuration tasks and execution flow of the **Raspberry Pi Server** automation suite, matching the specifications from the Bachelor's Thesis (*"Servidor Doméstico sobre Raspberry Pi Automatizado y Configurable"* - UPM ETSI Informáticos).

---

## 1. Execution Modes

### 1.1 Local Execution
Executed directly on the Raspberry Pi (either via physical console or local terminal session):
- **Automated Mode (`raspi-local-auto`)**: Executes the end-to-end server hardening and stack installation non-interactively using predefined parameters.
- **Manual / Interactive Mode (`raspi-local-manual`)**: Presents an interactive Whiptail menu allowing administrators to select which subsystem to configure individually.

### 1.2 Remote Execution
Executed from an administrator's client machine (Linux/macOS) across the local network:
- **Discovery (`raspi-remote-manual` / `raspi-remote-auto`)**: Identifies the Raspberry Pi on the local subnet (`arp-scan` / `ip neighbor` / `ping`).
- **Key Exchange**: Synchronizes local SSH public keys to the remote Raspberry Pi for passwordless authentication.
- **Project Synchronization**: Uses `rsync` or `scp` to push the repository to the remote Raspberry Pi.
- **Remote Invocation**: Executes the installation or deployment scripts remotely over SSH with custom port support.

---

## 2. Automated Server Tasks Breakdown

| Step | Script / Module | Description |
| :---: | :--- | :--- |
| **00** | *OS Provisioning* | Flash Raspberry Pi OS Lite (64-bit Bullseye/Bookworm) onto microSD card. |
| **01** | *Headless SSH* | Enable SSH access upon first boot by placing an empty `ssh` flag file in `/boot`. |
| **02** | *Network Link* | Connect Raspberry Pi to local LAN network via Ethernet cable or `wpa_supplicant.conf`. |
| **03** | *Package Bootstrap* | Update apt cache and install base dependencies (`curl`, `git`, `ufw`, `whiptail`, `dnsutils`, `certbot`). |
| **04** | *Host Discovery* | Locate the Raspberry Pi IP address within the local `/24` subnet. |
| **05** | *Initial Session* | Connect to Raspberry Pi using SSH with initial credentials. |
| **06** | [`raspi-static`](file:///home/pi/git/raspberry-pi-server/server/src/scripts/raspi-static) | Configure static local IP with dynamic interface detection (`eth0` / `wlan0`), subnet calculation, and gateway ping verification. |
| **07** | [`raspi-user`](file:///home/pi/git/raspberry-pi-server/server/src/scripts/misc/raspi-user) | Create administrative user with `sudo` privileges and secure the default account credentials. |
| **08** | [`raspi-sshkeys`](file:///home/pi/git/raspberry-pi-server/server/src/scripts/raspi-sshkeys) | Generate high-security SSH keypairs (`ed25519` / `rsa-4096`) and authorize public keys in `~/.ssh/authorized_keys`. |
| **09** | [`raspi-sshd`](file:///home/pi/git/raspberry-pi-server/server/src/scripts/raspi-sshd) | Harden OpenSSH daemon: migrate SSH to custom port (default `22022`), disable password authentication, disable root login, deploy modular `/etc/ssh/sshd_config.d/99-raspi-server.conf`. |
| **10** | [`raspi-firewall`](file:///home/pi/git/raspberry-pi-server/server/src/scripts/raspi-firewall) | Configure UFW firewall: open SSH port (22022), HTTP (80), HTTPS (443); deny direct external access to internal backend port (44380). |
| **11** | *Power Management* | Disable unused radio interfaces (Wi-Fi/Bluetooth) on Ethernet deployments to reduce idle power draw and thermals. |
| **12** | *WAN Discovery* | Determine public WAN IP address and verify Internet connectivity. |
| **13** | [`raspi-ddns`](file:///home/pi/git/raspberry-pi-server/server/src/scripts/raspi-ddns) | Configure Dynamic DNS (DDNS) client for DuckDNS/custom domains with automated cron updates. |
| **14** | [`raspi-ssl`](file:///home/pi/git/raspberry-pi-server/server/src/scripts/raspi-ssl) | Obtain Let's Encrypt SSL/TLS certificates via Certbot with automatic renewal; fallback to local self-signed certificates for LAN testing. |
| **15** | [`raspi-nginx`](file:///home/pi/git/raspberry-pi-server/server/src/scripts/raspi-nginx) | Deploy production reverse proxy: routes root `/` to React SPA (SPA history fallback `try_files $uri $uri/ /index.html;`), `/hub/` to Raspberry Hub, and `/api/v1` to internal backend (port 44380). |
| **16** | [`raspi-node`](file:///home/pi/git/raspberry-pi-server/server/src/scripts/raspi-node) | Install Node.js LTS runtime and npm package manager via official NodeSource distribution. |
| **17** | [`raspi-mongodb`](file:///home/pi/git/raspberry-pi-server/server/src/scripts/raspi-mongodb) | Install MongoDB with Raspberry Pi 4 Cortex-A72 ARMv8 compatibility (handling缺少 ARMv8.2-A LSE atomics). |
| **18** | [`raspi-startup`](file:///home/pi/git/raspberry-pi-server/server/src/scripts/raspi-startup) | Deploy systemd unit `/etc/systemd/system/raspberry-api.service` to run backend as an unprivileged service with auto-restart on boot. |
| **19** | [`raspi-banner`](file:///home/pi/git/raspberry-pi-server/server/src/scripts/raspi-banner) / [`raspi-prompt`](file:///home/pi/git/raspberry-pi-server/server/src/scripts/misc/raspi-prompt) | Install system status login banner showing CPU temp, load, RAM, disk, IP, and open ports. |
| **20** | [`web-app/backend`](file:///home/pi/git/raspberry-pi-server/web-app/backend) | Deploy Express REST API with MongoDB Mongoose models, data validation, and health checks (`/api/v1/health`, `/api/v1/records`). |
| **21** | [`web-app/frontend`](file:///home/pi/git/raspberry-pi-server/web-app/frontend) | Build and serve React SPA dashboard with Chart.js analytics, records tables, and atomic design system components. |
| **22** | [`web-app/raspberry-hub`](file:///home/pi/git/raspberry-pi-server/web-app/raspberry-hub) | Serve 3D interactive service portal with dynamic service registry and mixed-content resilient links. |
| **23** | [`raspi-rdp`](file:///home/pi/git/raspberry-pi-server/server/src/scripts/misc/raspi-rdp) | Provision FreeRDP client for connecting to university virtual desktops (UPM Virtual Desktop). |
| **24** | [`raspi-deploy`](file:///home/pi/git/raspberry-pi-server/server/src/scripts/config/raspi-deploy) | Automated application build and deployment manager supporting both local and remote installations. |
