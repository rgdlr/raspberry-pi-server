# Guía de Configuración de Raspberry Pi Server

```
     _____        _____                          
    |  __ \      / ____|                         
    | |__) |____| (___   ___ _ ____   _____ _ __ 
    |  _  (  __  )___ \ / _ \ '__\ \ / / _ \ '__|
    | | \ \| || |____) |  __/ |   \ V /  __/ |   
    |_|  \_\_||_|_____/ \___|_|    \_/ \___|_|   
```

## Tabla de Contenidos

- [Visión General](#visión-general)
- [Instalación Principal](#instalación-principal)
- [Administración Local](#administración-local)
  - [Menú Interactivo (`raspi-local-manual`)](#menú-interactivo-raspi-local-manual)
  - [Aprovisionamiento Automatizado (`raspi-local-auto`)](#aprovisionamiento-automatizado-raspi-local-auto)
- [Administración Remota](#administración-remota)
  - [Configuración Interactiva (`raspi-remote-manual`)](#configuración-interactiva-raspi-remote-manual)
  - [Configuración Automatizada Remota (`raspi-remote-auto`)](#configuración-automatizada-remota-raspi-remote-auto)
- [Despliegue y Mantenimiento de Aplicaciones](#despliegue-y-mantenimiento-de-aplicaciones)
  - [Gestor de Despliegue (`raspi-deploy`)](#gestor-de-despliegue-raspi-deploy)
  - [TUI de Configuración General (`raspi-setup`)](#tui-de-configuración-general-raspi-setup)
- [Arquitectura de Red y Puertos](#arquitectura-de-red-y-puertos)

---

## Visión General

La suite de automatización **Raspberry Pi Server** está estructurada en módulos independientes ubicados en `server/src/scripts/`. Permite tanto el aprovisionamiento local (con pantalla y teclado físicos o terminal local) como la administración remota a través de la red local (SSH desde la estación de trabajo del administrador).

---

## Instalación Principal

Para aprovisionar el servidor desde cero en la Raspberry Pi:

1. Clonar o descargar el repositorio en `/home/pi/git/raspberry-pi-server`.
2. Ejecutar el instalador principal desde la raíz del proyecto:

```bash
cd /home/pi/git/raspberry-pi-server
./raspberry-pi-server-install
```

El instalador comprueba los requisitos previos del sistema, solicita el modo de ejecución deseado e inicia la secuencia completa.

---

## Administración Local

Utilice la administración local cuando trabaje directamente en la consola de la Raspberry Pi.

### Menú Interactivo (`raspi-local-manual`)

Despliega un menú en modo texto (TUI basado en Whiptail) que permite seleccionar y configurar cada subsistema de forma individual:

```bash
bash server/src/scripts/config/raspi-local-manual
```

Módulos disponibles en el menú:
- Asignación de IP estática (`raspi-static`)
- Creación de usuarios y configuración de sudo (`raspi-user`)
- Generación y autorización de claves SSH (`raspi-sshkeys`)
- Bastionado del servicio SSH en puerto seguro (`raspi-sshd`)
- Configuración de reglas de cortafuegos UFW (`raspi-firewall`)
- Configuración de cliente DNS dinámico (`raspi-ddns`)
- Obtención e instalación de certificados SSL/TLS (`raspi-ssl`)
- Configuración de proxy inverso Nginx (`raspi-nginx`)
- Instalación de Node.js LTS y base de datos MongoDB
- Personalización de prompt y banner de bienvenida

### Aprovisionamiento Automatizado (`raspi-local-auto`)

Ejecuta la secuencia de instalación completa de forma desatendida o guiada con parámetros optimizados:

```bash
bash server/src/scripts/config/raspi-local-auto
```

---

## Administración Remota

Utilice la administración remota para aprovisionar una Raspberry Pi *headless* (sin pantalla) desde otro ordenador en la misma red local.

### Configuración Interactiva (`raspi-remote-manual`)

Descubre la IP de la Raspberry Pi en la red local, sincroniza las claves SSH, copia el código del proyecto y presenta un menú de control remoto:

```bash
bash server/src/scripts/config/raspi-remote-manual
```

### Configuración Automatizada Remota (`raspi-remote-auto`)

Descubre la Raspberry Pi en la subred, aprovisiona claves SSH, transfiere los archivos mediante `rsync`/`scp` e inicia la instalación remota automática:

```bash
bash server/src/scripts/config/raspi-remote-auto
```

---

## Despliegue y Mantenimiento de Aplicaciones

### Gestor de Despliegue (`raspi-deploy`)

Compila el frontend de React, instala dependencias de producción en backend, despliega los archivos en `/var/www/raspberry-pi-server/` y reinicia el servicio systemd:

```bash
# Despliegue local
bash server/src/scripts/config/raspi-deploy --local

# Despliegue remoto a un host específico
bash server/src/scripts/config/raspi-deploy --remote pi@192.168.1.150 --port 22022
```

### TUI de Configuración General (`raspi-setup`)

Proporciona un panel de mantenimiento general del sistema:

```bash
bash server/src/scripts/misc/raspi-setup
```

Incluye opciones para:
- Consultar el estado del hardware y sensores en tiempo real (`raspi-banner`)
- Configurar idioma, locales y distribución de teclado (`raspi-language`)
- Iniciar cliente de escritorio remoto (`raspi-rdp`)
- Administrar usuarios y contraseñas (`raspi-user`)

---

## Arquitectura de Red y Puertos

| Servicio | Puerto | Protocolo | Acceso |
| :--- | :---: | :---: | :--- |
| **OpenSSH (Bastionado)** | `22022` | TCP | WAN / LAN (Solo claves SSH) |
| **Nginx HTTP** | `80` | TCP | WAN / LAN (Redirige a HTTPS 443) |
| **Nginx HTTPS (SSL/TLS)** | `443` | TCP | WAN / LAN (Entrada a SPA y Hub) |
| **API Backend Express** | `44380` | TCP | Exclusivo interno `127.0.0.1` |
| **Base de Datos MongoDB** | `27017` | TCP | Exclusivo interno `127.0.0.1` |
