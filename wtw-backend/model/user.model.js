const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);

const UserSchema = new Schema({  
  nom: {
    type: String,
    required: true
  },
  prenom: {
    type: String,
    required: true
  }
},
{
  timestamps: true // Saves createdAt and updatedAt as dates. createdAt will be our timestamp.
});

module.exports = mongoose.model('User', UserSchema);  