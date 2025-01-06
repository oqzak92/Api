const express = require('express');
const db = require('./DataBase');  // Correctement importé ici

require('dotenv').config();

const app = express();
const port = 3000;

app.use(express.json());

// Tester la connexion
db.connection.connect((err) => {
    if (err) {
        console.error('Erreur de connexion:', err);
    } else {
        console.log('Connexion réussie à la base de données');
    }
});

// Routes pour les marques
app.get('/marques', (req, res) => {
    db.getAllMarques((err, results) => {
        if (err) {  
            console.error(err);
            res.status(500).json({ error: 'Une erreur est survenue lors de la recherche des marques.' });
        } else {
            res.json(results);
        }
    });
});

app.post('/marques', (req, res) => {
    const { nom } = req.body;
    db.addMarque(nom, (err, results) => {
        if (err) {
            console.error(err);  
            res.status(500).json({ error: 'Une erreur est survenue lors de l\'ajout de la marque.' });
        } else {
            res.json(results);
        }
    });
});

app.put('/marques/:id', (req, res) => {
    const { id } = req.params;
    const { nom } = req.body;
    db.updateMarque(id, nom, (err, results) => {
        if (err) {
            console.error(err);  
            res.status(500).json({ error: 'Une erreur est survenue lors de la mise à jour de la marque.' });
        } else {
            res.json(results);
        }
    });
});

app.delete('/marques/:id', (req, res) => {
    const { id } = req.params;
    db.deleteMarque(id, (err, results) => {
        if (err) {
            console.error(err);  
            res.status(500).json({ error: 'Une erreur est survenue lors de la suppression de la marque.' });
        } else {
            res.json(results);
        }
    });
});

// Routes pour les modèles
app.get('/modeles', (req, res) => {
    db.getAllModeles((err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Une erreur est survenue lors de la recherche des modèles.' });
        } else {
            res.json(results);
        }
    });
});

app.post('/modeles', (req, res) => {
    const { modele, prix, description, marque_id } = req.body;
    db.addModele(modele, prix, description, marque_id, (err, results) => {
        if (err) {
            console.error(err);  
            res.status(500).json({ error: 'Une erreur est survenue lors de l\'ajout du modèle.' });
        } else {
            res.json(results);
        }
    });
});

app.put('/modeles/:id', (req, res) => {
    const { id } = req.params;
    const { modele, prix, description, marque_id } = req.body;
    db.updateModele(id, modele, prix, description, marque_id, (err, results) => {
        if (err) {
            console.error(err);  
            res.status(500).json({ error: 'Une erreur est survenue lors de la mise à jour du modèle.' });
        } else {
            res.json(results);
        }
    });
});

app.delete('/modeles/:id', (req, res) => {
    const { id } = req.params;
    db.deleteModele(id, (err, results) => {
        if (err) {
            console.error(err);  
            res.status(500).json({ error: 'Une erreur est survenue lors de la suppression du modèle.' });
        } else {
            res.json(results);
        }
    });
});

// Lancer le serveur
app.listen(port, () => {
    console.log(`lien http://localhost:3000`);
});
