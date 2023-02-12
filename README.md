# API-SHOP-V2
Versión 2 de la API_SHOP, con persistencia de datos con un motor de DB relacional en Postgres, en el cual, utiliza el ORM sequelize, para tener una flexibilidad de migraciones de diferentes DB, se obtienen productos, categorias, usuarios, orden de compra, con sus respectivos CRUD.
Tiene los endpoints para recuperar contraseña y actualizarla, por el cual se le manda un correo al usario con su token para actualizar su contraseña.
La autenticación y autorización se hacen mendiante JWT y passport.js en donde se encripta, las contraseñas.

npm run migrations:generate
npm run migrations:run
docker-compose up -d postgres  
npm run dev
