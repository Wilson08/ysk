FROM node:22-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app

FROM base AS dependencies
COPY package.json package-lock.json ./
RUN npm install --no-audit --no-fund

FROM base AS builder
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base AS production
ENV NODE_ENV=production
COPY package.json package-lock.json ./
RUN npm install --omit=dev --no-audit --no-fund
COPY --from=builder /app/build ./build
EXPOSE 3000
CMD ["npm", "run", "start"]