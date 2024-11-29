# Database files

### I.2 - This folder shoould contain:
- Dockerfile;
- Scripts to inject data directly into the database;
- If necessary, some script for initialization of the database

psql -U user -d foodflow_db_dev
\d app_user       
\d foodchain   
\d menu        
\d order_items 
\d orders      
\d restaurant  


select * from app_user;       
select * from foodchain;   
select * from menu;        
select * from order_items; 
select * from orders;      
select * from restaurant;  
