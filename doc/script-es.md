# Descripción de los Scripts y Arquitectura de Automatización

Este documento detalla las tareas de configuración y el flujo de ejecución de la suite de automatización de **Raspberry Pi Server**, correspondiente a la memoria del Trabajo de Fin de Grado (*"Servidor Doméstico sobre Raspberry Pi Automatizado y Configurable"* - ETS de Ingenieros Informáticos, UPM).

---

## 1. Modos de Ejecución

### 1.1 Ejecución Local
Se ejecuta directamente en la Raspberry Pi (mediante consola física con teclado/monitor o mediante sesión de terminal local):
- **Modo Automático (`raspi-local-auto`)**: Ejecuta el endurecimiento completo del servidor y la instalación de servicios de forma no interactiva con parámetros predeterminados.
- **Modo Manual / Interactivo (`raspi-local-manual`)**: Presenta un menú interactivo en Whiptail para permitir al administrador seleccionar qué subsistema configurar de manera individual.

### 1.2 Ejecución Remota
Se ejecuta desde la máquina cliente del administrador (Linux/macOS) a través de la red local:
- **Descubrimiento (`raspi-remote-manual` / `raspi-remote-auto`)**: Identifica la dirección IP de la Raspberry Pi en la subred local (`arp-scan` / `ip neighbor` / `ping`).
- **Intercambio de Claves SSH**: Sincroniza la clave pública SSH del cliente en la Raspberry Pi para habilitar la autenticación sin contraseña.
- **Sincronización del Proyecto**: Utiliza `rsync` o `scp` para enviar el código fuente del repositorio a la Raspberry Pi.
- **Invocación Remota**: Ejecuta los scripts de instalación o despliegue de forma remota a través de SSH en el puerto configurado.

---

## 2. Desglose de Tareas de Automatización del Servidor

| Paso | Script / Módulo | Descripción |
| :---: | :--- | :--- |
| **00** | *Aprovisionamiento SO* | Flashear Raspberry Pi OS Lite (64 bits Bullseye/Bookworm) en la tarjeta microSD. |
| **01** | *SSH Inicial Headless* | Habilitar el acceso SSH desde el primer arranque creando el archivo testigo vacío `ssh` en `/boot`. |
| **02** | *Conexión a Red* | Conectar la Raspberry Pi a la red de área local (LAN) por cable Ethernet o configuración de `wpa_supplicant.conf`. |
| **03** | *Instalación de Paquetes* | Actualizar repositorios e instalar paquetes base del sistema (`curl`, `git`, `ufw`, `whiptail`, `dnsutils`, `certbot`). |
| **04** | *Descubrimiento de Red* | Localizar la IP asignada a la Raspberry Pi dentro del rango `/24` de la subred local. |
| **05** | *Sesión Inicial* | Conectar a la Raspberry Pi mediante SSH con las credenciales iniciales. |
| **06** | [`raspi-static`](file:///home/pi/git/raspberry-pi-server/server/src/scripts/raspi-static) | Configuración de IP local estática con detección dinámica de interfaz (`eth0` / `wlan0`), cálculo de subred y comprobación de gateway. |
| **07** | [`raspi-user`](file:///home/pi/git/raspberry-pi-server/server/src/scripts/misc/raspi-user) | Creación de usuario administrador con privilegios `sudo` y aseguramiento de credenciales predeterminadas. |
| **08** | [`raspi-sshkeys`](file:///home/pi/git/raspberry-pi-server/server/src/scripts/raspi-sshkeys) | Generación de pares de claves criptográficas seguras (`ed25519` / `rsa-4096`) y autorización en `~/.ssh/authorized_keys`. |
| **09** | [`raspi-sshd`](file:///home/pi/git/raspberry-pi-server/server/src/scripts/raspi-sshd) | Bastionado del demonio OpenSSH: cambio al puerto seguro (predeterminado `22022`), desactivación de autenticación por contraseña y acceso root, uso de `/etc/ssh/sshd_config.d/99-raspi-server.conf`. |
| **10** | [`raspi-firewall`](file:///home/pi/git/raspberry-pi-server/server/src/scripts/raspi-firewall) | Cortafuegos UFW: apertura de puertos 22022 (SSH), 80 (HTTP), 443 (HTTPS); bloqueo de acceso externo directo al puerto interno del backend (44380). |
| **11** | *Ahorro de Energía* | Desactivación de interfaces inalámbricas no utilizadas (Wi-Fi/Bluetooth) en despliegues con Ethernet para reducir consumo y temperatura. |
| **12** | *Descubrimiento WAN* | Consulta de la dirección IP pública externa y comprobación de salida a Internet. |
| **13** | [`raspi-ddns`](file:///home/pi/git/raspberry-pi-server/server/src/scripts/raspi-ddns) | Cliente de DNS dinámico (DuckDNS o dominio personalizado) con actualización programada en cron. |
| **14** | [`raspi-ssl`](file:///home/pi/git/raspberry-pi-server/server/src/scripts/raspi-ssl) | Obtención automatizada de certificados TLS/SSL con Let's Encrypt (Certbot) y renovación automática; soporte de certificados autofirmados para pruebas en LAN. |
| **15** | [`raspi-nginx`](file:///home/pi/git/raspberry-pi-server/server/src/scripts/raspi-nginx) | Despliegue de proxy inverso Nginx: enrutamiento de la SPA de React (`/`) con fallback `try_files $uri $uri/ /index.html;`, portal de servicios (`/hub/`) y reenvío seguro a la API REST (`/api/v1` hacia el puerto 44380). |
| **16** | [`raspi-node`](file:///home/pi/git/raspberry-pi-server/server/src/scripts/raspi-node) | Instalación del entorno de ejecución Node.js LTS y gestor npm desde repositorios oficiales NodeSource. |
| **17** | [`raspi-mongodb`](file:///home/pi/git/raspberry-pi-server/server/src/scripts/raspi-mongodb) | Instalación del servidor MongoDB con salvaguardas para procesadores ARM64 Cortex-A72 de Raspberry Pi 4 (sin instrucciones LSE). |
| **18** | [`raspi-startup`](file:///home/pi/git/raspberry-pi-server/server/src/scripts/raspi-startup) | Configuración del servicio systemd `/etc/systemd/system/raspberry-api.service` para arranque automático y supervisión del backend. |
| **19** | [`raspi-banner`](file:///home/pi/git/raspberry-pi-server/server/src/scripts/raspi-banner) / [`raspi-prompt`](file:///home/pi/git/raspberry-pi-server/server/src/scripts/misc/raspi-prompt) | Instalación de banner de estado del sistema al iniciar sesión SSH (temperatura de CPU, carga, memoria RAM, disco, IP y puertos abiertos). |
| **20** | [`web-app/backend`](file:///home/pi/git/raspberry-pi-server/web-app/backend) | API REST en Node.js/Express con modelos Mongoose, validación de datos, control de errores y endpoints de salud y registros (`/api/v1/health`, `/api/v1/records`). |
| **21** | [`web-app/frontend`](file:///home/pi/git/raspberry-pi-server/web-app/frontend) | Panel de control React SPA con gráficos interactivos en Chart.js, tablas de registros y biblioteca de componentes basada en Atomic Design. |
| **22** | [`web-app/raspberry-hub`](file:///home/pi/git/raspberry-pi-server/web-app/raspberry-hub) | Portal interactivo con animación 3D de frambuesa en Three.js, dock con enlaces dinámicos a servicios y protección contra contenido mixto. |
| **23** | [`raspi-rdp`](file:///home/pi/git/raspberry-pi-server/server/src/scripts/misc/raspi-rdp) | Cliente FreeRDP para conexión remota con entornos de escritorio virtual universitarios (Escritorios Virtuales UPM). |
| **24** | [`raspi-deploy`](file:///home/pi/git/raspberry-pi-server/server/src/scripts/config/raspi-deploy) | Gestor automatizado de compilación y despliegue del proyecto con soporte tanto local como remoto vía SSH/SCP. |
