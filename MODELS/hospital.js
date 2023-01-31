const { Schema, model } = require('mongoose');


const hospitalSchema = Schema({
    nombre: {
        type: String,
        required: true
    },

    img: {
        type: String
    },
    
    usuario: {
        require: true,
        type: Schema.Types.ObjectId,
        ref: 'usuario'
    }
}); 


hospitalSchema.method('toJSON', function() {
    const {__v, ...object } = this.toObject();


    return object;
})

module.exports = model('hospital', hospitalSchema);