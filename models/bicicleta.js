var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bicicletaSchema= new Schema({
	code: Number,
	color: String, 
	modelo: String,
	ubicacion: {
		type: [Number], index: { type: '2dsphere', sparse: true }//Indice de tipo geografico.
	}
});

bicicletaSchema.statics.createInstance= function(code, color, modelo, ubicacion){
	return new this({
		code: code,
		color: color,
		modelo: modelo,
		ubicacion: ubicacion
	});
}

bicicletaSchema.methods.toString = function(){
	return "code: "+ this.code + ' | color: '+this.color;
};

bicicletaSchema.statics.allBicis = function(cb){
	return this.find({}, cb);
};

bicicletaSchema.statics.add = function(aBici, cb){
	this.create(aBici, cb);

};

bicicletaSchema.statics.findByCode = function(aCode, cb){
	return this.findOne({code:aCode}, cb);
};

bicicletaSchema.statics.removeByCode = function(aCode, cb){
	return this.deleteOne({code:aCode}, cb);
};



module.exports = mongoose.model('Bicicleta', bicicletaSchema);







/*
var Bicicleta = function(id, color, modelo, ubicacion){
	this.id = id;
	this.color = color;
	this.modelo = modelo;
	this.ubicacion = ubicacion;
}

Bicicleta.prototype.toString = function (){
	return 'id: ' + this.id + " | color: " + this.color + " | ubicacion" + this.ubicacion;
}
//Array donde se guarda las bicicletas
Bicicleta.allBicis = [];
Bicicleta.add = function(aBici){
	Bicicleta.allBicis.push(aBici);
}

Bicicleta.findById = function(aBiciId){
	var aBici = Bicicleta.allBicis.find(x => x.id == aBiciId);
	if (aBici)
		return aBici;
	else
		throw new Error(`No existe una bicicleta con el id ${aBiciId}`);
}

Bicicleta.removeById = function(aBiciId){
	for(var i = 0; i < Bicicleta.allBicis.length; i++){
		if (Bicicleta.allBicis[i].id == aBiciId){
			Bicicleta.allBicis.splice(i, 1);
			break;
		}
	}
}
// //Añadir bicibletas
// var a = new Bicicleta(1, 'rojo', 'urbana', [4.579609971451944, -74.15755897972817]);
// var b = new Bicicleta(2, 'blanca', 'urbana', [4.580979794824863, -74.1559421117009]);

// Bicicleta.add(a);
// Bicicleta.add(b);

module.exports = Bicicleta;*/
