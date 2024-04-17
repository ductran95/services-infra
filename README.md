# Services Infrastructure

## 1. Provision VM

- Create VPC
- Create EC2:
- Setup EC2:

```bash
sudo apt update
sudo apt upgrade -y
sudo apt install -y git
cd /
sudo git clone https://github.com/ductran95/services-infra
sudo chmod -R 777 /services-infra
cd services-infra
cd debian
./install.sh
```

## 2. Init Docker Swarm
```bash
ifconfig
docker swarm init --advertise-addr <MANAGER-IP>
```

## 3. Setup Docker Swarm nodes
```bash
docker swarm join-token worker

To add a worker to this swarm, run the following command:

docker swarm join \
--token SWMTKN-1-49nj1cmql0jkz5s954yi3oex3nedyz0fb0xx14ie39trti4wxv-8vxv8rssmk743ojnwacrr2e7c \
192.168.99.100:2377
```

## 4. Init infra

### On manager node:
- Install Traefik:
```bash
cd /services-infra
cd traefik
docker stack deploy --compose-file docker-compose.yml reverse-proxy
```

- Install Portainer:
```bash
cd /services-infra
cd portainer
docker stack deploy --compose-file docker-compose.yml reverse-proxy
```

- Install Sentry:
```bash
cd /services-infra
cd sentry
docker stack deploy --compose-file docker-compose.yml open-telemetry
```

- Install OTEL Collector:
```bash
cd /services-infra
cd otel-collector
sudo apt-get update
wget https://github.com/open-telemetry/opentelemetry-collector-releases/releases/download/v0.98.0/otelcol-contrib_0.98.0_linux_amd64.deb
sudo dpkg -i otelcol-contrib_0.98.0_linux_amd64.deb
sudo ln -sf /services-infra/otel-collector/config.yaml /etc/otelcol/config.yaml
sudo systemctl restart otelcol
```

## 4. Install services

## 5. Benchmark