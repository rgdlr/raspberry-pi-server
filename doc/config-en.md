# Raspberry Pi Server

```
     _____        _____                          
    |  __ \      / ____|                         
    | |__) |____| (___   ___ _ ____   _____ _ __ 
    |  _  (  __  )___ \ / _ \ '__\ \ / / _ \ '__|
    | | \ \| || |____) |  __/ |   \ V /  __/ |   
    |_|  \_\_||_|_____/ \___|_|    \_/ \___|_|   
```

## Table of contents

- [Raspberry Pi Server](#raspberry-pi-server)
  - [Table of contents](#table-of-contents)
  - [Configuration modes](#configuration-modes)
    - [Main configuration](#main-configuration)
    - [Local configuration](#local-configuration)
      - [Use case](#use-case)
      - [Automatic process](#automatic-process)
      - [Manual process](#manual-process)
    - [Remote configuration](#remote-configuration)
      - [Use case](#use-case-1)
      - [Automatic process](#automatic-process-1)
      - [Manual process](#manual-process-1)

## Configuration modes

### Main configuration

Run script `raspberry-pi-server-install` from repository root from Raspberry Pi

```sh
pi@raspberrypi:~$ ./raspberry-pi-server-install
```

### Local configuration

#### Use case

Local configuration is used on a Raspberry Pi connected with a keyboard and a screen, making changes directly to the server

#### Automatic process

Run script `raspi-local-auto` from local machine

```sh
pi@raspberrypi:~$ bash raspi-local-auto
```

Warning: this is a risky option and has been removed

#### Manual process

Run script `raspi-local-manual` from local machine

```sh
pi@raspberrypi:~$ bash raspi-local-manual
```

### Remote configuration

#### Use case

Remote configuration is used on a Raspberry Pi connected to local network through ssh, making changes remotely to the server

#### Automatic process

Run script `raspi-remote-auto` from remote machine

```sh
pi@raspberrypi:~$ bash raspi-remote-auto
```

Warning: this is a risky option and has been removed

#### Manual process

Run script `raspi-remote-manual` from remote machine

```sh
pi@raspberrypi:~$ bash raspi-remote-manual
```
