var mongoose = require('mongoose');
var Bicicleta = require('../../../models/bicicleta');

describe('Testing Bicicletas', () => {
    beforeEach(function(done) {
        const mongoDB = 'mongodb://127.0.0.1:27017/red_bicicletas';
        mongoose.connect(mongoDB, { useNewUrlParser: true });

        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error'));
        db.once('open', () => {
            console.log('We are connected to test DB');
            done();
        });
    });

    afterEach(function(done) {
        Bicicleta.deleteMany({}, (err, success) => {
            if (err) console.log(err);
            mongoose.disconnect(err);
            done();
        });
    });


    describe('Bicicleta.createInstance', () => {
        it('Crea una instancia de Bicicleta', () => {
            let bici = Bicicleta.createInstance(1, "verde", "urbano", [-32.063642, -60.637726]);

            expect(bici.code).toBe(1);
            expect(bici.color).toBe("verde");
            expect(bici.modelo).toBe("urbano");
            expect(bici.ubicacion[0]).toBe(-32.063642);
            expect(bici.ubicacion[1]).toBe(-60.637726);
        });
    });

    describe('Bicicleta.allBicis', () => {
        it('comienza vacia', (done) => {
            Bicicleta.allBicis(function(err, bicis) {
                expect(bicis.length).toBe(0);
                done();
            });
        });
    });

    describe('Bicicleta.add', () => {
        it('agrega solo una bici', (done) => {
            let aBici = new Bicicleta({code: 1, color: "verde", modelo: "urbano"});
            Bicicleta.add(aBici, function(err, newBici) {
                if (err) console.log(err);
                Bicicleta.allBicis(function(err, bicis) {
                    expect(bicis.length).toEqual(1);
                    expect(bicis[0].code).toEqual(aBici.code);

                    done();
                });
            });
        });
    });

    describe('Bicicleta.findByCode', () => {
        it('debe devolver la bici con code 1', (done) => {
            Bicicleta.allBicis(function(err, bicis) {
                expect(bicis.length).toBe(0);

                let aBici = new Bicicleta({code: 1, color: "verde", modelo: "urbano"});
                Bicicleta.add(aBici, function(err, newBici) {
                    if (err) console.log(err);

                    let aBici2 = new Bicicleta({code: 2, color: "rojo", modelo: "urbano"});
                    Bicicleta.add(aBici2, function(err, newBici) {
                        if (err) console.log(err);
                        Bicicleta.findByCode(1, function(error, targetBici) {
                            expect(targetBici.code).toBe(aBici.code);
                            expect(targetBici.color).toBe(aBici.color);
                            expect(targetBici.modelo).toBe(aBici.modelo);

                            done();
                        });
                    });
                });
            });
        });
    });

    describe('Bicicleta.removeByCode', () => {
        it('debe eliminar la bici con code 2', (done) => {
            Bicicleta.allBicis(function(err, bicis) {
                expect(bicis.length).toBe(0);
                
                let aBici = new Bicicleta({code: 1, color: "verde", modelo: "urbano"});
                Bicicleta.add(aBici, function(err, newBici) {
                    if (err) console.log(err);

                    let aBici2 = new Bicicleta({code: 2, color: "rojo", modelo: "urbano"});
                    Bicicleta.add(aBici2, function(err, newBici) {
                        if (err) console.log(err);
                        Bicicleta.removeByCode(2, function(error, targetBici) {
                            expect(Bicicleta.allBicis.length).toBe(1);
                            done();
                        });

                    });
                });
            });
        });
    });

});

/*
beforeEach(() => {Bicicleta.allBicis = []});
describe('Bicicleta.allBicis',() =>{
    it('comienza vacia', () =>{
        expect(Bicicleta.allBicis.length).toBe(0);
    });
});

describe('Bicicleta.add', () =>{
    it('agregamos una', () =>{
        expect(Bicicleta.allBicis.length).toBe(0);
        var a = new Bicicleta(1, 'rojo', 'urbana', [4.579609971451944, -74.15755897972817]);
        Bicicleta.add(a);
        expect(Bicicleta.allBicis.length).toBe(1);
        expect(Bicicleta.allBicis[0]).toBe(a);
    });
});

describe('Bicicleta.findById',() =>{
    it('debe devolver la bici con id 1', () =>{
        expect(Bicicleta.allBicis.length).toBe(0);
        var aBici = new Bicicleta(1, 'verde', 'urbana', [4.579609971451944, -74.15755897972817]);
        var aBici2 = new Bicicleta(2, 'rojo', 'urbana', [4.579609971451944, -74.15755897972817]);
        Bicicleta.add(aBici);
        Bicicleta.add(aBici2);

        var targetBici = Bicicleta.findById(1);
        expect(targetBici.id).toBe(1);
        expect(targetBici.color).toBe(aBici.color);
        expect(targetBici.modelo).toBe(aBici.modelo);
    });
});*/

