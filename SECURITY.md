# Security Policy & Architecture

This document outlines the security architecture, hardening procedures, and vulnerability disclosure policies for the **Raspberry Pi Server** project (*Bachelor's Thesis, UPM ETSI Informáticos*).

---

## 1. Supported Versions

Security updates and patches are actively maintained for the following versions:

| Version | Status | Supported |
| :---: | :---: | :---: |
| `1.0.x` | Production Release | :white_check_mark: |
| `< 1.0.0` | Initial Thesis Drafts | :x: |

---

## 2. Security Architecture & Threat Model

The server incorporates multi-layered defense-in-depth security principles designed for internet-exposed small-office/home-office (SOHO) servers:

### 2.1 SSH Hardening ([`raspi-sshd`](file:///home/pi/git/raspberry-pi-server/server/src/scripts/raspi-sshd) & [`raspi-sshkeys`](file:///home/pi/git/raspberry-pi-server/server/src/scripts/raspi-sshkeys))
- **Non-Standard Port**: OpenSSH is migrated to custom port `22022/tcp` to mitigate automated brute-force bot scanners.
- **Key-Only Authentication**: `PasswordAuthentication no` and `ChallengeResponseAuthentication no` are enforced. Only cryptographic keys (Ed25519 or RSA-4096) are accepted.
- **Root Login Disabled**: `PermitRootLogin no` prevents direct root compromise. Administrative privileges require `sudo` through designated user accounts.
- **Modular Drop-in Configuration**: Security parameters are managed cleanly via `/etc/ssh/sshd_config.d/99-raspi-server.conf` and verified with `sshd -t` prior to reloading.

### 2.2 Network Firewall ([`raspi-firewall`](file:///home/pi/git/raspberry-pi-server/server/src/scripts/raspi-firewall))
- **Default Policy**: Incoming connections are dropped by default (`ufw default deny incoming`). Outgoing connections are permitted (`ufw default allow outgoing`).
- **Exposed WAN Ports**: Only port `22022/tcp` (Hardened SSH), `80/tcp` (HTTP for ACME challenges and HTTPS redirects), and `443/tcp` (Encrypted HTTPS) are opened.
- **Internal Service Isolation**: Internal application ports (`44380/tcp` Express API and `27017/tcp` MongoDB database) are bound strictly to `127.0.0.1` and are explicitly rejected from external network interfaces.

### 2.3 Reverse Proxy & TLS Encryption ([`raspi-nginx`](file:///home/pi/git/raspberry-pi-server/server/src/scripts/raspi-nginx) & [`raspi-ssl`](file:///home/pi/git/raspberry-pi-server/server/src/scripts/raspi-ssl))
- **Automated TLS**: Certificates are provisioned via Certbot (Let's Encrypt) with automated systemd/cron renewal hooks, with a local self-signed fallback for LAN environments.
- **HTTP-to-HTTPS Redirection**: Port 80 unconditionally issues HTTP 301 redirects to HTTPS on port 443.
- **Security Headers**: Nginx injects protective HTTP headers on all responses:
  - `X-Frame-Options: SAMEORIGIN` (Clickjacking protection)
  - `X-Content-Type-Options: nosniff` (MIME sniffing mitigation)
  - `X-XSS-Protection: "1; mode=block"` (Legacy browser reflection filter)
  - `Referrer-Policy: "strict-origin-when-cross-origin"`

### 2.4 Least Privilege Execution ([`raspi-startup`](file:///home/pi/git/raspberry-pi-server/server/src/scripts/raspi-startup))
- Application daemons do not run as root. The Node.js API operates under dedicated unprivileged user credentials managed via systemd (`raspberry-api.service`).

---

## 3. Reporting a Vulnerability

If you discover a security vulnerability, please report it responsibly by contacting:

- **Email**: `rodrigrtic@gmail.com`
- **Response SLA**: Initial confirmation within 48 hours; assessment and patch timeline within 7 calendar days.

Please include:
1. Detailed description of the vulnerability and attack vector.
2. Step-by-step reproduction instructions or proof-of-concept.
3. Affected components, scripts, or endpoints.

We request that you refrain from disclosing the vulnerability publicly until a fix has been released.
