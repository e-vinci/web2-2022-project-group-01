const db = require('better-sqlite3')('C:/Users/hamza/OneDrive - Haute Ecole Léonard de Vinci/bd2_sql/bd_web_projet.sqlite', { verbose: console.log });

module.exports = db;
