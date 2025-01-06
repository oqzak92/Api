const mysql = require('mysql2'); 
require('dotenv').config();


const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

connection.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données:', err);
  } else {
    console.log('Connexion réussie à la base de données');
  }
});



// voir tout marques
const getAllMarques = (callback) => {
    connection.query('SELECT * FROM marques', (err, results) => {
        callback(err, results);
    });
};

// ADD marque
const addMarque = (nom, callback) => {
    connection.query('INSERT INTO marques (nom) VALUES (?)', [nom], (err, results) => {
        callback(err, results);
    });
};

// MAJ marque
const updateMarque = (id, nom, callback) => {
    connection.query('UPDATE marques SET nom = ? WHERE id = ?', [nom, id], (err, results) => {
        callback(err, results);
    });
};

// SUPP marque
const deleteMarque = (id, callback) => {
    connection.query('DELETE FROM marques WHERE id = ?', [id], (err, results) => {
        callback(err, results);
    });
};

// voir tout modeles
const getAllModeles = (callback) => {
    connection.query(
        'SELECT m.*, ma.nom AS marque FROM modeles m JOIN marques ma ON m.marque_id = ma.id',
        (err, results) => {
            callback(err, results);
        }
    );
};

// ADD un modele
const addModele = (modele, prix, description, marque_id, callback) => {
    connection.query(
        'INSERT INTO modeles (modele, prix, description, marque_id) VALUES (?, ?, ?, ?)',
        [modele, prix, description, marque_id],
        (err, results) => {
            callback(err, results);
        }
    );
};

// MAJ un modele
const updateModele = (id, modele, prix, description, marque_id, callback) => {
    connection.query(
        'UPDATE modeles SET modele = ?, prix = ?, description = ?, marque_id = ? WHERE id = ?',
        [modele, prix, description, marque_id, id],
        (err, results) => {
            callback(err, results);
        }
    );
};

// SUPP un modele
const deleteModele = (id, callback) => {
    connection.query('DELETE FROM modeles WHERE id = ?', [id], (err, results) => {
        callback(err, results);
    });
};

// Exporter
module.exports = {
    connection,
    getAllMarques,
    addMarque,
    updateMarque,
    deleteMarque,
    getAllModeles,
    addModele,
    updateModele,
    deleteModele
};
