FROM  node:alpine AS build

WORKDIR /app

COPY ./package.json /app/package.json
COPY ./yarn.lock    /app/yarn.lock

RUN yarn install --pure-lockfile

COPY . /app

RUN yarn build

# Use debian as base image for app container
FROM  debian:stretch-slim

LABEL maintainer="achillesrasquinha@gmail.com"

ENV APT_KEY_DONT_WARN_ON_DANGEROUS_USAGE=true

# Work in the app directory of the container
WORKDIR /app

# Copy the files from the working directory into the container
COPY ./R /app/R
COPY ./requirements.txt /app/requirements.txt

# Install dependencies
RUN apt-get update --fix-missing \
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
    # Install Java
    && mkdir -p /usr/share/man/man1 \
    && apt-get install -y --no-install-recommends openjdk-8-jdk \
    # Install R
    && echo "Installing R..." \
    && mkdir -p ~/.gnupg \
    && echo "disable-ipv6" >> ~/.gnupg/dirmngr.conf \
    && apt-key adv --keyserver keys.gnupg.net --recv-key 'E19F5F87128899B192B1A2C2AD5F960A256A04AF' \
    && add-apt-repository 'deb https://cloud.r-project.org/bin/linux/debian stretch-cran35/' \
    && apt-get update \
    && apt-get install -y --no-install-recommends r-base \
    # Run setup.R script to install required R packages
    && cd ./R \
    && Rscript setup.R \
    && cd .. \
    # Install pip packages
    && python3 -m pip install --upgrade pip \
    && pip3 install setuptools wheel \
    && pip3 install numpy pyyaml \
    && pip3 install --no-binary javabridge -r ./requirements.txt \
    # Remove intermediate dependencies
    && apt-get remove -y --purge \
    dirmngr \
    apt-transport-https \
    software-properties-common \
    gnupg2 \
    # Remove cache
    && rm -rf /var/lib/apt/lists/*

COPY . /app

RUN pip3 install /app

COPY --from=build /app/src/candis/app/assets/css/styles.min.css /app/src/candis/app/assets/css/styles.min.css
COPY --from=build /app/src/candis/app/assets/js/bundle.min.js   /app/src/candis/app/assets/js/bundle.min.js 

COPY ./docker/production/app/start /start
RUN sed -i -e 's/\r$//' /start \
    && chmod +x /start

EXPOSE 5000

CMD ["/start"]