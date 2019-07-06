FROM  node:alpine AS build

WORKDIR /app

COPY ./package.json /app/package.json
COPY ./yarn.lock    /app/yarn.lock

RUN yarn install --pure-lockfile

COPY . /app

RUN yarn build

FROM  debian:stretch-slim

LABEL maintainer="achillesrasquinha@gmail.com"

ENV APT_KEY_DONT_WARN_ON_DANGEROUS_USAGE=true

WORKDIR /app

COPY ./R /app/R
COPY ./requirements.txt /app/requirements.txt

RUN apt-get update \
    \
    && apt-get install -y --no-install-recommends \
    bash \
    dirmngr \
    apt-transport-https \
    software-properties-common \
    python3-dev \
    python3-pip \
    python3-tk \
    gnupg2 \
    graphviz-dev \
    pkg-config \
    build-essential \
    libreadline-dev \
    \
    # Install R
    && mkdir -p ~/.gnupg \
    && echo "disable-ipv6" >> ~/.gnupg/dirmngr.conf \
    && apt-key adv --keyserver keys.gnupg.net --recv-key 'E19F5F87128899B192B1A2C2AD5F960A256A04AF' \
    && add-apt-repository 'deb https://cloud.r-project.org/bin/linux/debian stretch-cran35/' \
    && apt-get update \
    && apt-get install --no-install-recommends -y r-base \
    \
    # Installing Java...
    && mkdir -p /usr/share/man/man1 \
    && apt-get install -y --no-install-recommends openjdk-8-jdk \
    && cd /app/R \
    && Rscript setup.R \
    && cd .. \
    # Install pip packages
    && python3 -m pip install --upgrade pip \
    && pip3 install setuptools \
    && pip3 install numpy pyyaml \
    && pip3 install --no-binary javabridge -r /app/requirements.txt \
    \
    # Removing intermediate dependencies
    && apt-get remove -y --purge \
    dirmngr \
    apt-transport-https \
    software-properties-common \
    gnupg2 \
    build-essential \
    graphviz-dev \
    \
    # Remove cache
    && rm -rf /var/lib/apt/lists/*

COPY . /app

RUN pip3 install /app

# Using build-args copy the bundled assets into the app container
COPY --from=build /app/src/candis/app/assets/css/styles.min.css /app/src/candis/app/assets/css/styles.min.css
COPY --from=build /app/src/candis/app/assets/js/bundle.min.js   /app/src/candis/app/assets/js/bundle.min.js 

COPY ./docker/production/app/start /start

RUN sed -i -e 's/\r//' /start \
    && chmod +x /start

EXPOSE 5000

CMD ["/start"]
