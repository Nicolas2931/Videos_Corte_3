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
//Añadir bicibletas
var a = new Bicicleta(1, 'rojo', 'urbana', [4.579609971451944, -74.15755897972817]);
var b = new Bicicleta(2, 'blanca', 'urbana', [4.580979794824863, -74.1559421117009]);

Bicicleta.add(a);
Bicicleta.add(b);

module.exports = Bicicleta;
