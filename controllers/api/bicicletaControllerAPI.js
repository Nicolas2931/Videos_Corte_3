var Bicicleta = require('../../models/bicicleta');

exports.bicicleta_list = (req, res) => {
    Bicicleta.find({}, (err, bicicletas) => {
        res.status(200).json({
            bicicletas: bicicletas
        });
    });
}

exports.bicicleta_create = (req, res) => {
    let bici = new Bicicleta({
        code: req.body.code, 
        color: req.body.color, 
        modelo: req.body.modelo
    });
    bici.ubicacion = [req.body.lat, req.body.lng];
    
    Bicicleta.add(bici);

    res.status(200).json({
        bicicletas: bici
    });
}

exports.bicicleta_delete = function(req, res){
	Bicicleta.removeById(req.body.id);
	res.status(204).send();
}
