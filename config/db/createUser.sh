
#Use this to create a user in the db and grant them privileges
#N.B still needs some work :D

#get variables from  from .env file
DB_ROOT_PASSWORD=$(grep MYSQL_ROOT_PASSWORD .env | cut -d '=' -f2)
DB_USER=$(grep MYSQL_USER .env | cut -d '=' -f2)
DB_PASSWORD=$(grep MYSQL_PASSWORD .env | cut -d '=' -f2)

docker exec -it mysql-db mysql -u root -p$DB_ROOT_PASSWORD && CREATE USER `$DB_USER`@'localhost' IDENTIFIED BY $DB_PASSWORD && GRANT ALL PRIVILEGES ON * . * TO `$DB_USER`@'localhost' && quit;