const mongoose = require('mongoose');

const VeiculoEmpregadoSchema = new mongoose.Schema({
    //para ir obter empregado dos modelos
    empregado_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Empregado', required: true },
    veiculo_id: { type: String, required: true },
    data_inicio: { type: Date, required: true },
    data_fim: { type: Date },
    kms_inicial: { type: Number, required: true },
    kms_final: { type: Number },
    carro_vendido: { type: Boolean, default: false }
}, { timestamps: true });

const VeiculoEmpregado = mongoose.model('VeiculoEmpregado', VeiculoEmpregadoSchema);

module.exports = VeiculoEmpregado;
