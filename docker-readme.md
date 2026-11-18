# Docker (desenvolvimento)

Alternativa ao `bun dev` local: roda o servidor de desenvolvimento do Next dentro de um contêiner, com hot reload. Útil para quem não quer instalar o Bun na máquina.

> Produção não usa Docker — o deploy vai via FTP para o cPanel (veja o README).

## Rodando

```bash
docker compose up --build   # http://localhost:3000
docker compose down
```

Edite os arquivos normalmente: a pasta do projeto é montada em `/app` e o Next recarrega sozinho.

## Como funciona

- **Dockerfile** — imagem `oven/bun:1`, instala as dependências e roda `bun run dev`.
- **docker-compose.yml**
  - monta o projeto em `/app` (bind mount);
  - `node_modules` e `.next` ficam em volumes do contêiner, então não conflitam com os do host nem criam arquivos de root na sua pasta;
  - `WATCHPACK_POLLING=true` garante o hot reload no macOS/Windows.

## Mudou o package.json?

O `node_modules` vive num volume, então reconstrua a imagem e recrie o volume:

```bash
docker compose up --build --renew-anon-volumes
```

## Problemas comuns

```bash
docker compose logs -f   # logs
docker compose ps        # status
ss -tuln | grep 3000     # porta 3000 ocupada?
```
