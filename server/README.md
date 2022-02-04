Récuperer le depot git clone https://github.com/jonathanvalette/P6_jonathan_valette_code.git<br>

Se positionner dans le repertoire server cd server<br>

installer les dependances : npm install<br>

editer les variable d'environnement : <br>
(linux ) => touch .env <br>
sous la forme : <br>
MONGODB_PATH = le lien cloud bdd pour atlas ou le lien mongod local <br>
TOKEN_KEY = clé_secrète_pour_crypter_les_tokens <br>
EMAIL_KEY = clé_secrète_pour_crypter_les_emails <br>
COOKIE_KEY = clé_secrète_pou_la_session <br>
AUTHORIZED_ORIGIN = http://localhost:4200<br>

lancer le server : node server<br>
