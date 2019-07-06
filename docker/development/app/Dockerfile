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
    graphviz-dev 

# Installing R...
RUN mkdir -p ~/.gnupg \
    && echo "disable-ipv6" >> ~/.gnupg/dirmngr.conf \
    && apt-key adv --keyserver keys.gnupg.net --recv-key 'E19F5F87128899B192B1A2C2AD5F960A256A04AF' \
    && add-apt-repository 'deb https://cloud.r-project.org/bin/linux/debian stretch-cran35/' \
    && apt-get update --fix-missing \
    && apt-get install -y r-base \
    \
    # Installing Java...
    && mkdir -p /usr/share/man/man1 \
    && apt-get install -y --no-install-recommends openjdk-8-jdk \
    # Removing intermediate dependencies...
    && apt-get remove -y --purge \
    dirmngr \
    software-properties-common \
    \
    # Removing cache...
    && rm -rf /var/lib/apt/lists/*

# Copy the R directory into the container
COPY ./R /app/R

# Run setup.R script to install required R packages
RUN cd /app/R \
    && Rscript setup.R \
    && cd ..

# Copy the pip requirements file into the container
COPY ./requirements-dev.txt  /app/requirements-dev.txt  

# Set default timeout parameter to 100 seconds
ENV PIP_DEFAULT_TIMEOUT=100

# Install pip packages
RUN python3 -m pip install --upgrade pip \
    && pip3 install setuptools wheel \
    && pip3 install numpy pyyaml   \
    && pip3 install --no-binary javabridge -r ./requirements-dev.txt

# Copy the package.json and yarn.lock into the container
COPY ./package.json /app/package.json
COPY ./yarn.lock    /app/yarn.lock

# Install required npm packages
RUN yarn install --pure-lockfile

# Copy the files from the working directory into the container
COPY . /app

# Install the candis app and bundle all react files into a single bundle
RUN pip3 install -e /app \
    && yarn build

# Copy processes directory into the container
COPY ./docker/development/app/_processes /_processes

# Copy scripts containing processes to run inside the container
RUN chmod +x /_processes/* \
    && mv /_processes/* /usr/local/bin \
    && rmdir /_processes

# Copy the start script into the container
COPY ./docker/development/app/start /start

# Filter text using following regex and give the file executable permissions
RUN sed -i -e 's/\r$//' /start \
    && chmod +x /start

# Expose port 5000 and 8888
EXPOSE 5000 8888

# Launch Candis server and webpack
CMD ["/start"]
