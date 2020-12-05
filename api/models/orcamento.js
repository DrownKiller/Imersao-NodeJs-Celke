const mongoose = require('mongoose');
const { Schema } = mongoose;

const orcamento = new Schema({
   name: {
       type: String
   },
   email: {
        type: String
   },
   phone: {
        type: String
   },
   whats: {
        type: String
    },
   msg: {
        type: String
    }
  },{
      timestamps: true
  });

  const Blog = mongoose.model('Orcamento', orcamento);