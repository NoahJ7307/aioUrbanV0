create database projadb;
use projadb;
SET SQL_SAFE_UPDATES = 0;

create user`projauser`@`%` identified by '1234'; 
grant all privileges on projadb.* to `projauser`@`%`;
show tables;
select * from tbl_user order by uno desc;
select * from tbl_user where uno = 119;
desc tbl_user;
update tbl_user set del_flag = false  where user_name = '남해영';

drop table tbl_user;