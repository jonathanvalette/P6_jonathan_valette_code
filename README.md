Récuperer le depot 
git clone https://github.com/jonathanvalette/P6_jonathan_valette_code.git

Se positionner dans le repertoire server
cd server

installer les dependances
npm install

editer les variable d'environnement :
(linux ) => touch .env
sous la forme :
MONGODB_PATH = le lien cloud bdd pour atlas ou le  lien mongod local 
TOKEN_KEY = clé_secrète_pour_crypter_les_tokens
EMAIL_KEY = clé_secrète_pour_crypter_les_emails
COOKIE_KEY = clé_secrète_pou_la_session
AUTHORIZED_ORIGIN = http://localhost:4200

lancer le server : 
node server

ouvrir un autre terminal 

Se positionner dans le repertoire client
cd client

installer les dependances
npm install

lancer server local ( verifier que vous lance aussi le server node.js)
ng serve