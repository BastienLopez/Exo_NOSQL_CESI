-Requêtes

1. Créez une base restaurants, puis une collection new_york.Utilisez mongoDBCompass pour importer les données dans la collection(voir slides)

2. Sur cette base réalisées les opérations suivantes(ces opérations peuvent être faites en cli):

- Affichez tous les documents de la collection new_york
db.new_york.find()

- Comptez le nombre de documents dans la collection new_york
db.new_york.count()

- Affichez les documents ayant un restaurant_id >= 3015000
db.new_york.find({
        restaurant_id: {
            $gte: 3015000
        }
    })

- Comptez le nombre de documents récupérés par la requête précédente
db.new_york.find({
        restaurant_id: {
            $gte: 3015000
        }
    }).count()

- Récupérez le premier document avec un grade de type A et score > 10
db.new_york.findOne({
        "grades.grade": "A",
        "grades.score": {
            $gt: 10
        }
    })

- Ajoutez un nouveau grade de type B au document récupéré précédemment
db.new_york.update({
        "grades.grade": "A",
        "grades.score": {
            $gt: 10
        }
    }, {
        $push: {
            grades: {
                grade: "B",
                score: 10,
                date: new Date()
            }
        }
    })

- Incrémentez de 5 le score du premier grade du restaurant à Brooklyn avec cuisine Hamburgers
db.new_york.update({
        borough: "Brooklyn",
        cuisine: "Hamburgers"
    }, {
        $inc: {
            "grades.0.score": 5
        }
    })

- Affichez les 10 premiers restaurants par ordre alphabétique de 'name'
db.new_york.find().sort({
        name: 1
    }).limit(10)

- Trouvez le restaurant ayant pour coordonnées[73.98513559999999, 40.7676919]
db.new_york.find({
        "address.coord.coordinates": [73.98513559999999, 40.7676919]
    })

- Recherchez les restaurants address.zipcode >= 10500(afficher UNIQUEMENT 'name', 'cuisine', 'restaurant_id')
db.new_york.find({
        "address.zipcode": {
            $gte: 10500
        }
    }, {
        name: 1,
        cuisine: 1,
        restaurant_id: 1,
        \_id: 0
    })

- Ajoutez une prime à tous les restaurants ayant un seul grade dans le tableau de grades
db.new_york.updateMany({
        $expr: {
            $eq: [{
                $size: "$grades"
            }, 1]
        }
    }, {
        $set: {
            prime: true
        }
    })

- (Bonus) Créez une vue affichant les adresses de tous les restaurants n’ ayant qu’ un seul grade
db.createView("singleGradeRestaurants", "new_york", [{
        $match: {
            $expr: {
                $eq: [{
                    $size: "$grades"
                }, 1]
            }
        }
    },
    {
        $project: {
            \
            _id: 0,
            name: 1,
            address: 1
        }
    }
])