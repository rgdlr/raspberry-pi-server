# Raspberry Pi Server

## Index

- [Raspberry Pi Server](#raspberry-pi-server)
  - [Index](#index)
  - [Configuration modes](#configuration-modes)
      - [Use case](#use-case)
      - [Automatic process](#automatic-process)
      - [Manual process](#manual-process)
      - [Use case](#use-case-1)
      - [Automatic process](#automatic-process-1)
      - [Manual process](#manual-process-1)

## Configuration modes

<h3 style="background-color: blue; color: white; padding: 5px 10px">Local configuration</h3>

#### Use case

Local configuration is used on a Raspberry Pi connected with a keyboard and a screen, making changes directly to the server

#### Automatic process

Run script `raspi-local-auto-setup` from local machine

```sh
pi@raspberrypi:~$
```

#### Manual process

Run script `raspi-local-manual-setup` from local machine

```sh
pi@raspberrypi:~$
```

<h3 style="background-color: blue; color: white; padding: 5px 10px">Remote configuration</h3>

#### Use case

Remote configuration is used on a Raspberry Pi connected to local network through ssh, making changes remotely to the server

#### Automatic process

Run script `raspi-remote-auto-setup` from remote machine

```sh
pi@raspberrypi:~$
```

#### Manual process

Run script `raspi-remote-manual-setup` from remote machine

```sh
pi@raspberrypi:~$
```
