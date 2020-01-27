const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);

const SessionSchema = new Schema({  
    appareil: {
        type: String,
        required: true
    },
    debut: {
        type: Date,
        required: true
    },
    fin:{
        type: Date,
        required: true
    },
    data:[Number],
    userId: {
        type: String
    },
    commentaireKine: {
        type: String
    },
    commentairePatient: {
        type: String
    }
},
                           {
    timestamps: true // Saves createdAt and updatedAt as dates. createdAt will be our timestamp.
});

module.exports = mongoose.model('Session', SessionSchema);  