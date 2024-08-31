DROP DATABASE IF EXISTS pos;

CREATE DATABASE pos;

USE pos;

CREATE TABLE IF NOT EXISTS pos_uriage (
    seq bigint PRIMARY KEY,
    sales_time timestamp,
    sales_id varchar(80),
    shop_id varchar(80),
    item_id varchar(80),
    amount int,
    unit_price int
    );

CREATE USER IF NOT EXISTS 'connectuser'@'%' IDENTIFIED BY 'connectpass';
GRANT ALL PRIVILEGES ON pos.* TO 'connectuser'@'%';

INSERT INTO pos_uriage (seq, sales_time, sales_id, shop_id, item_id, amount, unit_price)
VALUES (1, '2018-10-11 21:21:21', 'POSSALES00001', 'SHOP001', 'ITEM001', 2, 300),
       (2, '2018-10-11 21:21:21', 'POSSALES00001', 'SHOP001', 'ITEM004', 5, 198),
       (3, '2018-10-11 21:21:21', 'POSSALES00001', 'SHOP001', 'ITEM005', 1, 273),
       (4, '2018-10-12 22:22:22', 'POSSALES00002', 'SHOP002', 'ITEM001', 1, 300),
       (5, '2018-10-12 22:22:22', 'POSSALES00002', 'SHOP002', 'ITEM006', 1, 512),
       (6, '2018-10-12 23:23:23', 'POSSALES00003', 'SHOP053', 'ITEM006', 2, 512)
    ON DUPLICATE KEY UPDATE seq=seq;
