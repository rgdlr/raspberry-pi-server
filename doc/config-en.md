# Raspberry Pi Server Configuration Guide

```
     _____        _____                          
    |  __ \      / ____|                         
    | |__) |____| (___   ___ _ ____   _____ _ __ 
    |  _  (  __  )___ \ / _ \ '__\ \ / / _ \ '__|
    | | \ \| || |____) |  __/ |   \ V /  __/ |   
    |_|  \_\_||_|_____/ \___|_|    \_/ \___|_|   
```

## Table of Contents

- [Overview](#overview)
- [Main Installation](#main-installation)
- [Local Administration](#local-administration)
  - [Interactive Menu (`raspi-local-manual`)](#interactive-menu-raspi-local-manual)
  - [Automated Provisioning (`raspi-local-auto`)](#automated-provisioning-raspi-local-auto)
- [Remote Administration](#remote-administration)
  - [Interactive Setup (`raspi-remote-manual`)](#interactive-setup-raspi-remote-manual)
  - [Automated Remote Setup (`raspi-remote-auto`)](#automated-remote-setup-raspi-remote-auto)
- [Application Deployment & Maintenance](#application-deployment--maintenance)
  - [Deployment Manager (`raspi-deploy`)](#deployment-manager-raspi-deploy)
  - [General Settings TUI (`raspi-setup`)](#general-settings-tui-raspi-setup)
- [System Architecture & Ports](#system-architecture--ports)

---

## Overview

The **Raspberry Pi Server** automation suite is organized into modular scripts under `server/src/scripts/`. It supports both direct local operation (physical keyboard/monitor or local terminal) and remote operation (over SSH from an administrative workstation).

---

## Main Installation

To provision the server from scratch on the Raspberry Pi:

1. Clone or download the repository to `/home/pi/git/raspberry-pi-server`.
2. Execute the main installer from the repository root:

```bash
cd /home/pi/git/raspberry-pi-server
./raspberry-pi-server-install
```

The installer verifies prerequisites, prompts for desired execution mode, and runs the end-to-end setup sequence.

---

## Local Administration

Use local administration when operating directly on the Raspberry Pi terminal.

### Interactive Menu (`raspi-local-manual`)

Launches a Whiptail-driven graphical TUI menu allowing you to select and configure individual modules:

```bash
bash server/src/scripts/config/raspi-local-manual
```

Available modules in the menu:
- Static IP assignment (`raspi-static`)
- User creation and sudo permissions (`raspi-user`)
- SSH keypair generation and authorization (`raspi-sshkeys`)
- SSH daemon hardening on custom port (`raspi-sshd`)
- UFW firewall rules configuration (`raspi-firewall`)
- Dynamic DNS setup (`raspi-ddns`)
- SSL/TLS certificate configuration (`raspi-ssl`)
- Nginx reverse proxy configuration (`raspi-nginx`)
- Node.js LTS and MongoDB database installation
- Status banner and terminal prompt customization

### Automated Provisioning (`raspi-local-auto`)

Runs the complete provisioning sequence sequentially with sensible defaults and confirmations:

```bash
bash server/src/scripts/config/raspi-local-auto
```

---

## Remote Administration

Use remote administration when provisioning a headless Raspberry Pi from another computer on the local network.

### Interactive Setup (`raspi-remote-manual`)

Discovers the Raspberry Pi on the local network, synchronizes SSH credentials, copies the project repository, and provides a remote management menu:

```bash
bash server/src/scripts/config/raspi-remote-manual
```

### Automated Remote Setup (`raspi-remote-auto`)

Discovers the target Raspberry Pi IP address, provisions SSH keys, synchronizes project code via `rsync`/`scp`, and triggers remote automated installation non-interactively:

```bash
bash server/src/scripts/config/raspi-remote-auto
```

---

## Application Deployment & Maintenance

### Deployment Manager (`raspi-deploy`)

Builds the React frontend, verifies the Node.js backend, installs production dependencies, and deploys files to `/var/www/raspberry-pi-server/` with systemd service reload:

```bash
# Local deployment
bash server/src/scripts/config/raspi-deploy --local

# Remote deployment to target host
bash server/src/scripts/config/raspi-deploy --remote pi@192.168.1.150 --port 22022
```

### General Settings TUI (`raspi-setup`)

Provides an administrative dashboard for ongoing server maintenance:

```bash
bash server/src/scripts/misc/raspi-setup
```

Includes options to:
- Test system status & hardware sensors (`raspi-banner`)
- Configure locales & keyboard layouts (`raspi-language`)
- Launch remote desktop client (`raspi-rdp`)
- Manage users & permissions (`raspi-user`)

---

## System Architecture & Ports

| Service | Port | Protocol | Access |
| :--- | :---: | :---: | :--- |
| **OpenSSH (Hardened)** | `22022` | TCP | WAN / LAN (Key-only auth) |
| **Nginx HTTP** | `80` | TCP | WAN / LAN (Redirects to 443) |
| **Nginx HTTPS (SSL/TLS)** | `443` | TCP | WAN / LAN (SPA & Hub entry) |
| **Express Backend API** | `44380` | TCP | Internal `127.0.0.1` only |
| **MongoDB Database** | `27017` | TCP | Internal `127.0.0.1` only |
