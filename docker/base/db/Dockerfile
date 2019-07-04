FROM postgres:alpine

COPY ./docker/base/db/maintenance /maintenance

RUN chmod +x /maintenance/* \
    && mv /maintenance/* /usr/local/bin \
    && rmdir /maintenance