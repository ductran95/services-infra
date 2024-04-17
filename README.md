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
ip addr
sudo docker swarm init --advertise-addr <MANAGER-IP>
```

## 3. Setup Docker Swarm nodes
```bash
docker swarm join-token worker

To add a worker to this swarm, run the following command:

sudo docker swarm join --token SWMTKN-1-4vfolag46t708m6se0hs53q04eq80b37e6l0jk73x912qaia6l-cqq3c9gscfr16j5ui0q8o90bs 10.0.132.235:2377
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