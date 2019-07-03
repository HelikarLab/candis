# Use ubuntu as base image
FROM node:stretch-slim

# Add labels for metadata
LABEL maintainer="achillesrasquinha@gmail.com"

ENV APT_KEY_DONT_WARN_ON_DANGEROUS_USAGE=true

# Work in the app directory of the container
WORKDIR /app

RUN apt-get update \
    \
    && echo "Installing dependencies..." \
    && apt-get install -y --no-install-recommends \
    bash \
    procps \
    dirmngr \
    apt-transport-https \
    software-properties-common \
    python3-dev \
    python3-pip \
    python3-tk \
    graphviz-dev \
    \
    && echo "Installing R..." \
    && mkdir -p ~/.gnupg \
    && echo "disable-ipv6" >> ~/.gnupg/dirmngr.conf \
    && apt-key adv --keyserver keys.gnupg.net --recv-key 'E19F5F87128899B192B1A2C2AD5F960A256A04AF' \
    && add-apt-repository 'deb https://cloud.r-project.org/bin/linux/debian stretch-cran35/' \
    && apt-get update \
    && apt-get install -y r-base \
    \
    && echo "Installing Java..." \
    && mkdir -p /usr/share/man/man1 \
    && apt-get install -y --no-install-recommends openjdk-8-jdk \
    && echo "Removing intermediate dependencies..." \
    && apt-get remove -y --purge \
    dirmngr \
    software-properties-common \
    \
    && echo "Removing cache..." \
    && rm -rf /var/lib/apt/lists/*

# Copy the R directory into the container
COPY ./R /app/R

# Run setup.R script to install required R packages
RUN cd /app/R \
    && Rscript setup.R \
    && cd ..

# Copy the pip requirements file into the container
COPY ./requirements-dev.txt  /app/requirements-dev.txt  

# Install pip packages
RUN python3 -m pip install --upgrade pip \
    && pip3 install setuptools wheel \
    && pip3 install numpy pyyaml   \
    && pip3 install --no-binary javabridge -r ./requirements-dev.txt

COPY ./package.json /app/package.json
COPY ./yarn.lock    /app/yarn.lock

RUN yarn install --pure-lockfile

# Copy the files from the working directory into the container
COPY . /app

RUN pip3 install -e /app \
    && yarn build

COPY ./docker/development/app/_processes /_processes

RUN chmod +x /_processes/* \
    && mv /_processes/* /usr/local/bin \
    && rmdir /_processes

COPY ./docker/development/app/start /start

RUN sed -i -e 's/\r$//' /start \
    && chmod +x /start

# Expose port 5000 and 8888
EXPOSE 5000 8888

# Launch Candis server
CMD ["/start"]
