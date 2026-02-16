FROM denoland/deno:latest

WORKDIR /app

COPY . .

ENV DENO_UNSTABLE=true
ENV DENO_DIR=/deno-dir

RUN deno cache rad-keyshop-original/rad-keyshop/server.ts

EXPOSE 8000

CMD ["deno", "run", "-A", "--allow-net", "--allow-env", "--allow-read", "rad-keyshop-original/rad-keyshop/server.ts"]
