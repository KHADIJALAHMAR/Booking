const mongoose =require('mongoose');


const CreditSchema = new mongoose.Schema({
  numero_carte: { 
    type: Number,
    required: true,
    maxlength: [16, ' obligatoire entre  16 numéros   ']
              },

  password: {
  type: Number,
  required: true,
  minlength: [3, 'the password must be greater than 3 characters'],
  maxlength: [4, 'the password must be less than 4 characters']
                        
              },
}); 

const CashSchema = new mongoose.Schema({
  Montant :{
    type:Number,
    required: true,
            },
}); 
const CheckSchema = new mongoose.Schema({
  Montant :{
    type:Number,
    required: true,
            },
    Date:{
      type:Date,
      required: true,
    }
}); 


const SchemaTypePayment = new mongoose.Schema({
  payementMethod: {
    type: String,
    enum: ['cash' , 'check' , 'credit']
  },
  payementMethodInfos: {
    enum: [CashSchema, CheckSchema , CreditSchema],
  }
}); 
const TypePayment = mongoose.model("TypePayment", SchemaTypePayment);

module.exports = TypePayment;