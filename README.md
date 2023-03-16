Start MongoDB local
sudo systemctl start mongod.service

Anonymous login using Firebase
POST
https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

copy IdToken
Set is as Autherization Beraer token in Postman for passing authentication

How to deploy in production?

1) Open SSH connection to the server, open terminal
2) Clone our Zeston project (git clone ...)
3) Create .env file and set mongo path
4) Copy firebase-service-account-key.json
5) make sure pm2 is installed, or npm i -g pm2
5) npm run deploy:prod
That's it!

next id

1. orders, sort (createdAt: -1), Select(Order id), limit(3)
sort again
2. 'ZO123' > split/slice to '123' 
3. 123 + 1
4. if no id, ZO2201