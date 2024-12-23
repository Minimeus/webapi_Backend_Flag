const mongoose = require('mongoose');

// Esquema para um empregado da EmpresaFofinhos, seguindo a mifgracao de laraval


    const EmpregadoSchema = new mongoose.Schema({
        nome: { 
            type: String, 
            required: true
        }, 
        apelido: {
            type: String, 
            required: true 
        },
    }, 
    
    { timestamps: true }); /* vai criando por default, sem ter que ser inserido */

    const Empregado = mongoose.model('Empregado', EmpregadoSchema);

    module.exports = Empregado;
