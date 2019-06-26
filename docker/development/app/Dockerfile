FROM  node:stretch-slim

LABEL maintainer="achillesrasquinha@gmail.com"

ENV APT_KEY_DONT_WARN_ON_DANGEROUS_USAGE=true

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
    \
    && echo "Installing R..." \
    && mkdir -p ~/.gnupg \
    && echo "disable-ipv6" >> ~/.gnupg/dirmngr.conf \
    && apt-key adv --keyserver keys.gnupg.net --recv-key 'E19F5F87128899B192B1A2C2AD5F960A256A04AF' \
    && add-apt-repository 'deb https://cloud.r-project.org/bin/linux/debian stretch-cran35/' \
    && apt-get update \
    && apt-get install -y r-base \
    \
    && pip3 install --upgrade pip \
    \
    && echo "Installing Java..." \
    && mkdir -p /usr/share/man/man1 \
        && apt-get install -y --no-install-recommends openjdk-8-jdk \
    && echo "Removing intermediate dependencies..." \
    && apt-get remove -y --purge \
        dirmngr \
        apt-transport-https \
        software-properties-common \
    \
    && echo "Removing cache..." \
    && rm -rf /var/lib/apt/lists/*

RUN pip3 install setuptools
RUN pip3 install numpy pyyaml

COPY ./R /app/R

RUN cd /app/R \
    && Rscript setup.R \
    && cd ..

COPY ./package.json /app/package.json
COPY ./yarn.lock    /app/yarn.lock

RUN yarn install --pure-lockfile

COPY ./requirements-dev.txt /app/requirements-dev.txt

RUN pip3 install --no-binary javabridge -r /app/requirements-dev.txt

COPY . /app

RUN pip3 install -e /app \
    && yarn build

COPY ./docker/development/app/_processes /_processes

RUN chmod +x /_processes/* \
    && mv /_processes/* /usr/local/bin \
    && rmdir /_processes

COPY ./docker/development/app/start /start
RUN sed -i 's/\r//' /start \
	&& chmod +x /start

EXPOSE 5000 8888