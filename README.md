Récuperer le depot <br>
git clone https://github.com/jonathanvalette/P6_jonathan_valette_code.git<br>

Se positionner dans le repertoire server<br>
cd server<br>

installer les dependances<br>
npm install<br>

editer les variable d'environnement :<br>
(linux ) => touch .env<br>
sous la forme : <br>
MONGODB_PATH = le lien cloud bdd pour atlas ou le  lien mongod local <br>
TOKEN_KEY = clé_secrète_pour_crypter_les_tokens<br>
EMAIL_KEY = clé_secrète_pour_crypter_les_emails<br>
COOKIE_KEY = clé_secrète_pou_la_session<br>
AUTHORIZED_ORIGIN = http://localhost:4200<br>

lancer le server : <br>
node server<br>

ouvrir un autre terminal <br>

Se positionner dans le repertoire client<br>
cd client<br>

installer les dependances<br>
npm install<br>

lancer server local ( verifier que vous lance aussi le server node.js)<br>
ng serve<br>