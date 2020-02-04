var User = require("../model/user.model");
var Session = require("../model/session.model");


class userController {
    create(req, res) {
        console.log(req);
        //verification des données
        if (!req.body.nom || !req.body.prenom) {
            res.json({ success: false, msg: 'Il manque des informations pour la création du user' });
        } else {
            var newUser = new User({
                nom: req.body.nom,
                prenom: req.body.prenom
            });

            newUser.save((err) => {
                if (err) {
                    console.log(err);
                    return res.json({ success: false, message: err });
                }
                res.json({ success: true, msg: 'User créé avec succès' });

            });
        }
    }

    readAll(req, res) {
        User.find({}, (err, users) => {
            if (err) throw err;

            if (!users) {
                res.status(404).send({ success: false, msg: 'Aucun user trouvé' });
            } else {
                res.json(users);
            }
        });
    }

    readOne(req, res) {
        User.findOne({
            _id: req.params.id
        }, (err, user) => {
            if (err) {
                res.status(404).send({ success: false, msg: 'User non trouvé' });
            } else if (!user) {
                res.status(404).send({ success: false, msg: 'User non trouvé' });
            } else {
                res.json(user);
            }
        });
    }

    delete(req, res) {
        User.deleteOne({
            _id : req.params.id
        }, (err) => {
            if (err) {
                res.status(404).send({ success: false, msg: err });
            } else {
                res.status(200).send({ success: true });
            }
        });
    }

}

module.exports = new userController();