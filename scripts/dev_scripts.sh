#!bin/sh

echo "hello"

cd golang_api/src/server
air -d
cd ../../..

cd dmwebapp
npm run dev -d
cd ..