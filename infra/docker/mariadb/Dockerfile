FROM mariadb:lts

ENV TZ=Asia/Tokyo

COPY ./infra/docker/mariadb/conf/my.cnf /etc/my.cnf
RUN chmod 644 /etc/my.cnf
