create database projadb;
use projadb;
SET SQL_SAFE_UPDATES = 0;

create user`projauser`@`%` identified by '1234'; 
grant all privileges on projadb.* to `projauser`@`%`;

-- -------------------------------------------------------------
show tables;
drop table tbl_user;
-- -------------------------------------------------------------
select * from tbl_user order by uno desc;
select * from user_user_role_list;
select * from tbl_household;
select * from tbl_regular_parking order by rpno desc;
select * from tbl_visit_parking;