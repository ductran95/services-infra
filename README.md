# Services Infrastructure

## 1. Provision VM

- Create VPC
- Create EC2:
- Setup EC2:

```bash
sudo apt update
sudo apt upgrade -y
sudo apt install -y git
git config --global --add safe.directory '*'
cd /
sudo git clone https://github.com/ductran95/services-infra
sudo chmod -R 777 /services-infra
cd /services-infra/debian
./install.sh
```

- Reboot

## 2. Init Docker Swarm
```bash
ip addr
docker swarm init --advertise-addr <MANAGER-IP>
```

## 3. Setup Docker Swarm nodes
```bash
docker swarm join-token worker

To add a worker to this swarm, run the following command:

docker swarm join --token SWMTKN-1-4v9ak3bbqd3z9tbd4lkagte5n56iwz5wnxpk3agqqg2uj9fn1j-3pmq17fcgxu4p3by6sa72quft 10.0.2.95:2377
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
docker stack deploy --compose-file docker-compose.yml portainer
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