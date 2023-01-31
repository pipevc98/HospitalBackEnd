const { Schema, model } = require('mongoose');


const medicoSchema = Schema({
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
    },
    hospital: {
        require: true,
        type: Schema.Types.ObjectId,
        ref: 'hospital'
    }
}); 


medicoSchema.method('toJSON', function() {
    const {__v, ...object } = this.toObject();


    return object;
})

module.exports = model('medico', medicoSchema);