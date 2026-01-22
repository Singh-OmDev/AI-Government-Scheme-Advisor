# Stage 1: Build React Client
FROM node:18-alpine as client-build
WORKDIR /app/client
COPY client/package*.json ./
RUN npm install
COPY client/ ./
RUN npm run build

# Stage 2: Setup Node Server
FROM node:18-alpine
WORKDIR /app/server
COPY server/package*.json ./
RUN npm install --production

# Copy Server Source Code
COPY server/ ./

# Copy Built Client to Server's Public Directory (Optional: if we want to serve from express)
# For now, we keep them separate services in compose, but this stage verifies client builds.
# Or we can serve static files from express:
COPY --from=client-build /app/client/dist ./public

# Expose Port
EXPOSE 5002

# Environment Variables should be passed at runtime
ENV NODE_ENV=production

# Start Server
CMD ["node", "index.js"]
