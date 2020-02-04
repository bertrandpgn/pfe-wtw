var User = require("../model/user.model");
var Session = require("../model/session.model");

class sessionController {
    create(req, res) {
        //verification des données
        if (!req.body.appareil || !req.body.debut || !req.body.fin) {
            res.json({success: false, msg: 'Il manque des informations pour la création de la session'});
        }else {
            var newSession= new Session({
                appareil: req.body.appareil,
                debut: req.body.debut,
                fin: req.body.fin,
                commentaireKine : req.body.commentaireKine,
                commentairePatient : req.body.commentairePatient,
                userId : req.body.userId,
                dataAngle : req.body.dataAngle,
                dataPoids :req.body.dataPoids
            });

            newSession.save((err) => {
                if (err) {
                    console.log(err);
                    return res.json({success: false,message:err});
                }
                res.json({success: true, msg: 'Session créée avec succès'});

            });
        }
    } 

    readForOneUser(req,res) {
        Session.find({userId:req.params.id}, (err, sessions) => {
            if (err) throw err;

            if (!sessions) {
                res.status(404).send({success: false, msg: 'Aucune session trouvée'});
            } else {
                res.json(sessions);
            }
        });
    }

    readAll(req, res) {
        Session.find({}, (err, sessions) => {
            if (err) throw err;

            if (!sessions) {
                res.status(404).send({ success: false, msg: 'Aucun user trouvé' });
            } else {
                res.json(sessions);
            }
        });
    }

}

module.exports = new sessionController();