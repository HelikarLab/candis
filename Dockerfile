FROM ubuntu

RUN apt-get update \
        && apt-get install -y \
                sudo \
                bash \
                curl \
                python3 \
        && curl -sL git.io/install-candis | sudo python3

EXPOSE 5000

CMD ["candis"]