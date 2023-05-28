var express = require('express');
var router = express.Router();
var bicicletaController = require('../controllers/bicicleta');

router.get('/', bicicletaController.bicicleta_list);
router.get('/create', bicicletaController.bicicleta_creaete_get);
router.post('/create', bicicletaController.bicicleta_creaete_post);
router.get('/:id/update', bicicletaController.bicicleta_update_get);
router.post('/:id/update', bicicletaController.bicicleta_update_post);
router.post('/:id/delete', bicicletaController.bicicletas_delete_post);

module.exports = router;
