// restaurantController.js
const Restaurant = require("./Model_de_restaurants");

// a. Récupérer une donnée par son name
const getRestaurantByName = async (name) => {
  return await Restaurant.findOne({ name });
};

// b. Insérer un nouveau restaurant
const createRestaurant = async (restaurantData) => {
  const restaurant = new Restaurant(restaurantData);
  return await restaurant.save();
};

/*
// c. Modifier un restaurant existant
const updateRestaurant = async (id, updatedData) => {
  return await Restaurant.findByIdAndUpdate(id, updatedData, { new: true });
};

// d. Supprimer un restaurant existant
const deleteRestaurant = async (id) => {
  return await Restaurant.findByIdAndDelete(id);
};
*/

// c. Modifier un restaurant existant
const updateRestaurant = async (id, updatedData) => {
  const existingRestaurant = await Restaurant.findById(id);

  if (!existingRestaurant) {
    throw new Error("Restaurant fermé a cause des rats ???  ");
  }

  return await Restaurant.findByIdAndUpdate(id, updatedData, { new: true });
};

// d. Supprimer un restaurant existant
const deleteRestaurant = async (id) => {
  const existingRestaurant = await Restaurant.findById(id);

  if (!existingRestaurant) {
    throw new Error("Ce resto n'existe que sur Mars désole chef");
  }

  return await Restaurant.findByIdAndDelete(id);
};

module.exports = {
  getRestaurantByName,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
};
