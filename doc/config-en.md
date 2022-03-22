# Raspberry Pi Server

---

## Index

- [Raspberry Pi Server](#raspberry-pi-server)
  - [Index](#index)
  - [Configuration modes](#configuration-modes)
  - [Local configuration](#local-configuration)
    - [Use case](#use-case)
    - [Automatic process](#automatic-process)
    - [Manual process](#manual-process)
  - [Remote configuration](#remote-configuration)
    - [Use case](#use-case-1)
    - [Automatic process](#automatic-process-1)
    - [Manual process](#manual-process-1)

---

## Configuration modes

1. - [Local Configuration](#local-configuration)
2. - [Remote Configuration](#remote-configuration)

---

## Local configuration

### Use case

Local configuration is used on a Raspberry Pi connected with a keyboard and a screen, making changes directly to the server

### Automatic process

Run script `raspi-local-auto-setup` from local machine

```sh
pi@raspberrypi:~$
```

### Manual process

Run script `raspi-local-manual-setup` from local machine

```sh
pi@raspberrypi:~$
```

---

## Remote configuration

### Use case

Remote configuration is used on a Raspberry Pi connected to local network through ssh, making changes remotely to the server

### Automatic process

Run script `raspi-remote-auto-setup` from remote machine

```sh
pi@raspberrypi:~$
```

### Manual process

Run script `raspi-remote-manual-setup` from remote machine

```sh
pi@raspberrypi:~$
```

---
