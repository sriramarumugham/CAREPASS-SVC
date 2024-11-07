docker build -t backed .

docker run -p 4700:4700 backed

open http://0.0.0.0:4700/documentation
