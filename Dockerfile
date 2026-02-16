FROM denoland/deno:latest

WORKDIR /app

COPY . .

WORKDIR /app/rad-keyshop-original/rad-keyshop

ENV DENO_UNSTABLE=true
ENV DENO_DIR=/deno-dir

RUN deno cache --reload server.ts

EXPOSE 8000

CMD ["deno", "run", "-A", "--allow-net", "--allow-env", "--allow-read", "server.ts"]
