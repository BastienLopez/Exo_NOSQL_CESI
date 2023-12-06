// app.js
const express = require("express");
const bodyParser = require("body-parser");
const Controller_de_resto = require("./Controller_de_restaurants");

const app = express();
app.use(bodyParser.json());

// a. Récupérer une donnée par son name
app.get("/restaurants/:name", async (req, res) => {
  const restaurant = await Controller_de_resto.getRestaurantByName(
    req.params.name
  );
  res.json(restaurant);
});

// b. Insérer un nouveau restaurant
app.post("/restaurants", async (req, res) => {
  const newRestaurant = await Controller_de_resto.createRestaurant(req.body);
  res.json(newRestaurant);
});
/*
// c. Modifier un restaurant existant
app.put('/restaurants/:id', async (req, res) => {
  const updatedRestaurant = await Controller_de_resto.updateRestaurant(req.params.id, req.body);
  res.json(updatedRestaurant);
});

// d. Supprimer un restaurant existant
app.delete('/restaurants/:id', async (req, res) => {
  const deletedRestaurant = await Controller_de_resto.deleteRestaurant(req.params.id);
  res.json(deletedRestaurant);
});
*/

// c. Modifier un restaurant existant
app.put("/restaurants/:id", async (req, res) => {
  try {
    const updatedRestaurant = await Controller_de_resto.updateRestaurant(
      req.params.id,
      req.body
    );
    res.json(updatedRestaurant);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// d. Supprimer un restaurant existant
app.delete("/restaurants/:id", async (req, res) => {
  try {
    const deletedRestaurant = await Controller_de_resto.deleteRestaurant(
      req.params.id
    );
    res.json(deletedRestaurant);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});
