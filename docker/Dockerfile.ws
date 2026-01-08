FROM oven/bun:1

WORKDIR /user/src/app

COPY ./packages ./packages
COPY ./bun.lock ./bun.lock    

COPY ./package.json ./package.json
COPY ./turbo.json ./turbo.json 

COPY ./apps/websocket ./apps/websocket

RUN bun install
RUN bun add -d prisma@6 @prisma/client@6
RUN bun run db:generate

EXPOSE 8081

CMD [ "bun", "run", "start:websocket" ]