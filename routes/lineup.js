const express = require('express');
const router = express.Router();
const Lineup = require('../models/lineup'); // On importe notre modèle Lineup

// Route pour récupérer tous les lineups
router.get('/', async (req, res) => {
  try {
    const lineups = await Lineup.find(); // Trouver tous les lineups dans la base de données
    res.json(lineups); // Les renvoyer au format JSON
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET : Récupérer un lineup spécifique par ID
router.get('/:id', getLineup, (req, res) => {
    res.json(res.lineup);
  });

// Route pour créer un nouveau lineup
router.post('/', async (req, res) => {
  const lineup = new Lineup({
    agent: req.body.agent,
    map: req.body.map,
    ability: req.body.ability,
    description: req.body.description,
    videoURL: req.body.videoURL
  });

  try {
    const newLineup = await lineup.save(); // Sauvegarder dans la base de données
    res.status(201).json(newLineup); // Réponse avec le lineup créé
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


async function getLineup(req, res, next) {
    let lineup;
    try {
      lineup = await Lineup.findById(req.params.id);
      if (lineup == null) {
        return res.status(404).json({ message: 'Lineup non trouvé' });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  
    res.lineup = lineup;
    next();
  }

module.exports = router; // Exporter les routes
