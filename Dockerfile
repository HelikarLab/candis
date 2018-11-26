FROM ubuntu:xenial

COPY ./get-candis ./get-candis

RUN apt-get update \
        && apt-get install -y \
                python3-minimal

RUN python3 ./get-candis

EXPOSE 5000

CMD ["candis"]