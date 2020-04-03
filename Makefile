restart:
	docker-compose down && docker-compose up -d 

build:
	docker-compose up -d --build

remove: 
	docker rm -f $(docker ps -aq)

down:
	docker-compose down

up:
	docker-compose up -d