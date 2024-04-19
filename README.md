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

- Fix docker
```bash
cat cat /etc/resolv.conf
sudo nano /etc/docker/daemon.json
{
    "dns": ["10.0.0.2", "8.8.8.8"]
}

```

- Note: use 'git reset --hard' to clear all git changes

- Reboot

## 2. Init Docker Swarm

```bash
ip addr
docker swarm init --advertise-addr 10.0.6.252
```

## 3. Setup Docker Swarm nodes
```bash
docker swarm join-token worker

To add a worker to this swarm, run the following command:

docker swarm join --token SWMTKN-1-478duk4vmp88w2jtp068kacrk10455zsuir9yyhfv6p92wnk7y-b3iyuovx0w1a7tdfm5g8p7sdb 10.0.6.252:2377
```

## 4. Init infra

### On manager node:
- Install Traefik:
```bash
docker network create -d overlay public
cd /services-infra/traefik
docker stack deploy --compose-file docker-compose.yml reverse-proxy
```

- Install Portainer:
```bash
docker network create -d overlay agent_network
cd /services-infra/portainer
docker stack deploy --compose-file docker-compose.yml portainer
```

- Install APM:
```bash
cd /services-infra/apm
docker stack deploy --compose-file docker-compose.yml apm
```

- Install OTEL Collector:
```bash
cd ~
sudo apt-get update
wget https://github.com/open-telemetry/opentelemetry-collector-releases/releases/download/v0.98.0/otelcol-contrib_0.98.0_linux_amd64.deb
sudo dpkg -i otelcol-contrib_0.98.0_linux_amd64.deb
sudo ln -sf /services-infra/otel-collector/config.yaml /etc/otelcol-contrib/config.yaml
```
```bash
sudo nano /usr/lib/systemd/system/otelcol-contrib.service
Change user and group to root
```
```bash
sudo systemctl restart otelcol-contrib
```

## 4. Install services

## 5. Benchmark