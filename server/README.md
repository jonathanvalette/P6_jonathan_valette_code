# OpenClassrooms P6 - API backend SoPekocko "Piquante"
6ème projet de la formation de [développeur web de OpenClassrooms](https://openclassrooms.com/fr/paths/185-developpeur-web)

## Scénario
Développement d'une application web nommée "Piquante" dans laquelle les utilisateurs pourront ajouter leurs sauces préférées et liker ou disliker les sauces proposées par les autres utilisateurs.  
Le but est de créer le backend de l'application, le frontend étant déjà codé et fourni.

## Apperçu du rendu
Voilà [une vidéo qui décrit rapidement le différentes fonctionnalités de l'application](https://youtu.be/UsfzItXufjI)

## Objectifs du projet et compétences évaluées
Développement Backend en Javascript
- Serveur **Node.js**
- Framework **Express**
- Base de données **MongoDB**
  - Hébergement sur MongoDB Atlas
  - Opérations relatives à la BDD réalisées avec mongoose
- **API REST**
- Sécurité **OWASP** et **RGPD**

## Mesures de sécurité mises en place
- Hashage du mot de passe utilisateur avec **bcrypt**
- Cryptage des emails utilisateurs dans la base de données avec **crypto-js**
- Manupulation sécurisée de la base de donnée avec **mongoose**
- Vérification que l'email utilisateur soit unique dans la base de données avec **mongoose-unique-validator**
- Utilisation de variables d'environnement pour les données sensibles avec **dotenv**
- Validation des données utilisateurs avec **@hapi/joi**
- Authentification de l'utilisateur par token avec **jsonwebtoken**
- Token d'authentification stocké dans un cookie coté client avec **express-session**
- Protection des headers avec **helmet**
- Log de chaque requête effectuée dans un fichier "assess.log" avec **morgan**


## Pour tester l'application
> **:warning: ATTENTION, possible problème de version avec le frontend (cf. ci-dessous) + légères modifications apportées au frontend pour la compatibilité avec les cookies de sessions, merci d'utiliser [la version du frontend mise à jour](https://github.com/RomainSire/OC-P6-SoPekocko-frontend), et non pas celle fournie par OpenClassrooms**

1. Cloner le [frontend  de l'application](https://github.com/RomainSire/OC-P6-SoPekocko-frontend), et le lancer :  
    - Dans un terminal, accéder au dossier du frontend
    - Installer les dépendances: **npm install**
    - Lancer: **ng serve**
2. Cloner [ce repository backend actuel](https://github.com/RomainSire/OC-P6-SoPekocko) :arrow_down:
3. Ajouter un fichier de configuration nommé **".env"** à la racine du backend. A l'intérieur, 5 variables d'environnement "secrètes" seront définies:
    - MONGODB_PATH = 'lien_vers_la_base_de_données_mongoDB'
    - TOKEN_KEY = 'clé_secrète_pour_crypter_les_tokens'
    - EMAIL_KEY = 'clé_secrète_pour_crypter_les_emails'
    - COOKIE_KEY = 'clé_secrète_pou_la_session'
    - AUTHORIZED_ORIGIN = 'http://localhost:4200'
4. Lancer le backend
    - Dans un autre terminal, accéder au dossier du backend
    - Installer les dépendances: **npm install**
    - Lancer **node server**
5. Le frontend est accessible à l'adresse http://localhost:4200
6. Pour des tests spécifiques (avec postman par exemple), le backend répond à l'adresse: http://localhost:3000 (attention: authentification requise pour toutes les routes /api/sauces/)

## :information_source: Problèmes de version du frontend
Le [frontend fourni par OpenClassrooms](https://github.com/OpenClassrooms-Student-Center/dwj-projet6) utilise Angular 7, et les dépendances utilisées provoquaient des erreurs sous ma machine (Linux Mint) car ma version de Node était trop récente.   
Pour solutionner le problème, deux options :
1. **Première méthode :x: - utiliser une version de node plus ancienne (finalement pas la solution retenue !) :**
    - Installation de [nvm pour gérer les versions de Node.js](https://github.com/nvm-sh/nvm)
    - Installation de la version 10.13 de Node.js (**nvm install 10.13**)
    - Utilisation de la version 10.13  (**nvm use 10.13**)
    - Installation de node-sass : principal package qui posait problème dans le frontend (**npm install node-sass**)
    - Le frontend fonctionne finalement correctement !
    - :warning: Mais de ce fait, **coté backend**, puisque Node tourne avec une version ancienne, les dernières versions de certaines dépendances ne peuvent pas être utilisées: notamment bcrypt utilise la version 3.0.0
    - Conclusion : j'ai finalement préféré utiliser la méthode 2 pour pouvoir bénéficier des dernières versions des dépendances utilisées
2. **Deuxième méthode :heavy_check_mark: - mettre à jour le frontend fourni :**
    - Changer la version du package frontend qui pose problème : **npm install node-sass@4.12.0 --no-save --unsafe-perm**
    - Réinstaller les packages du backend avec les dernières versions
    - Lancer le backend avec la dernière version de Node.js (^12)
    - frontend et backend devraient fonctionner correctement


npm check library 

mangoose leve cote base de donné