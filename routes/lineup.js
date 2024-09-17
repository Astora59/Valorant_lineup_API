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



// Route pour chercher une lineup par agent
router.get('/agent/:agentName', async (req, res) => {
  try {
    // Récupérer le nom de l'agent à partir des paramètres de l'URL
    const agentName = req.params.agentName;
    
    // Rechercher dans la base de données les lineups avec cet agent
    const lineups = await Lineup.find({ agent: agentName });
    
    // Si aucune lineup n'est trouvée, envoyer une réponse vide
    if (lineups.length === 0) {
      return res.status(404).json({ message: "Aucune lineup trouvée pour cet agent." });
    }
    
    // Renvoyer les lineups trouvées au format JSON
    res.json(lineups);
  } catch (err) {
    // Gérer les erreurs et renvoyer une réponse 500
    res.status(500).json({ message: err.message });
  }
});

router.get('/map/:mapName', async (req, res) => {
  try {
    // Récupérer le nom de la map à partir des paramètres de l'URL
    const mapName = req.params.mapName;
    
    // Rechercher dans la base de données les lineups avec cet agent
    const lineups = await Lineup.find({ map: mapName });
    
    // Si aucune lineup n'est trouvée, envoyer une réponse vide
    if (lineups.length === 0) {
      return res.status(404).json({ message: "Aucune lineup trouvée pour cette map." });
    }
    
    // Renvoyer les lineups trouvées au format JSON
    res.json(lineups);
  } catch (err) {
    // Gérer les erreurs et renvoyer une réponse 500
    res.status(500).json({ message: err.message });
  }
});

router.get('/lineups/:agentName/:mapName', async (req, res) => {
  try {
    // Récupérer les paramètres de l'URL
    const { agentName, mapName } = req.params;
    
    // Rechercher dans la base de données les lineups avec l'agent et la map spécifiés
    const lineups = await Lineup.find({ agent: agentName, map: mapName });
    
    // Si aucune lineup n'est trouvée, renvoyer une réponse 404
    if (lineups.length === 0) {
      return res.status(404).json({ message: `Aucune lineup trouvée pour l'agent ${agentName} sur la map ${mapName}.` });
    }
    
    // Renvoyer les lineups trouvées au format JSON
    res.json(lineups);
  } catch (err) {
    // Gérer les erreurs et renvoyer une réponse 500
    res.status(500).json({ message: err.message });
  }
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
