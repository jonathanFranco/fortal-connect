# Ambiente de desenvolvimento: next dev com hot reload.
# O código vem do bind mount definido no docker-compose.yml.
FROM oven/bun:1
WORKDIR /app
COPY package.json bun.lockb ./
RUN bun install
COPY . .
EXPOSE 3000
CMD ["bun", "run", "dev", "--hostname", "0.0.0.0"]
