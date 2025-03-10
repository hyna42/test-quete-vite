FROM node:lts-alpine

WORKDIR /app

COPY package.json package.json

RUN npm i
RUN apk --update --no-cache add curl

COPY src src
COPY public public

COPY index.html index.html
COPY tsconfig.json tsconfig.json
COPY tsconfig.app.json tsconfig.app.json
COPY tsconfig.node.json tsconfig.node.json
COPY tailwind.config.ts tailwind.config.ts
COPY postcss.config.js postcss.config.js
COPY vite.config.ts vite.config.ts
COPY codegen.ts codegen.ts

CMD npm run dev & npm run generate