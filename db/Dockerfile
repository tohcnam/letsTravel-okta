FROM mongo:4

ENV MONGO_INITDB_ROOT_USERNAME "admin"
ENV MONGO_INITDB_ROOT_PASSWORD "Password123"
ENV MONGO_INITDB_DATABASE "travel"

COPY mongo-init.js /docker-entrypoint-initdb.d/mongo-init.js
