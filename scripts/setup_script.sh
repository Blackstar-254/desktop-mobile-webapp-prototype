npm i &

cd dmwebapp
npm i &
cd ../database_management
npm i &
cd ..

bash "sudo add-apt-repository ppa:longsleep/golang-backports" -d

bash "go install github.com/air-verse/air@latest" -d

cd golang_api/src
bash "go mod download" -d
cd ..