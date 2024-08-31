DO
$$
BEGIN
    IF
EXISTS (SELECT FROM pg_database WHERE datname = 'ec') THEN
        PERFORM pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname = 'ec';
        DROP
DATABASE ec;
END IF;
END
$$;

CREATE DATABASE ec
    WITH OWNER = connectuser
    ENCODING = 'UTF8'
    LC_COLLATE = 'ja_JP.UTF-8'
    LC_CTYPE = 'ja_JP.UTF-8'
    TEMPLATE = template0;

\c ec;

CREATE TABLE ec_uriage (
    seq bigint PRIMARY KEY,
    sales_time timestamp,
    sales_id varchar(80),
    item_id varchar(80),
    amount int,
    unit_price int
);

INSERT INTO ec_uriage (seq, sales_time, sales_id, item_id, amount, unit_price)
VALUES (1, '2018-10-05 11:11:11', 'ECSALES00001', 'ITEM001', 2, 300),
       (2, '2018-10-01 11:11:11', 'ECSALES00001', 'ITEM002', 1, 5800),
       (3, '2018-10-02 12:12:12', 'ECSALES00002', 'ITEM001', 4, 298),
       (4, '2018-10-02 12:12:12', 'ECSALES00002', 'ITEM003', 1, 2500),
       (5, '2018-10-02 12:12:12', 'ECSALES00002', 'ITEM004', 1, 198),
       (6, '2018-10-02 12:12:12', 'ECSALES00002', 'ITEM005', 1, 273)
;
