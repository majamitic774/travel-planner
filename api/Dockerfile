FROM php:8.3-cli

RUN apt-get update \
    && apt-get install -y \
        curl \
        unzip \
        git \
        default-mysql-client \
        default-libmysqlclient-dev \
        libzip-dev \
    && docker-php-ext-configure pdo_mysql --with-pdo-mysql=mysqlnd \
    && docker-php-ext-install pdo_mysql \
    && docker-php-ext-enable pdo_mysql \
    && curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /var/www/html

# Create non-root user for security (using standard 1000:1000 to match most host users)
RUN groupadd -g 1000 appuser && useradd -r -u 1000 -g appuser appuser

CMD ["php", "-S", "0.0.0.0:8000", "-t", "public"]

