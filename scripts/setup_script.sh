npm i -d

cd dmwebapp
npm i -d
cd ../database_management
npm i -d
cd ..

# sudo add-apt-repository ppa:longsleep/golang-backports

go install github.com/air-verse/air@latest 

cd golang_api/src
go mod download
cd ..