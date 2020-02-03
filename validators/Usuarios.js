const {check, body} = require('express-validator')
const usuarioDao = require('../models/Usuarios')

class Usuarios {

    static validacoes(){
        return [
            check('nome').isLength({min: 5, max: 100}).withMessage("O nome deve ter entre 5 e 100 caracteres"),
            check('email').isEmail().withMessage("O email digitado é inválido"),
            check('cpf').isNumeric().withMessage("Apenas números são permitidos"),
            check('sexo').isLength({min:1, max: 1}).withMessage("O sexo deve conter apenas um caracter"),
            check('senha').isLength({min:6, max: 15 }).withMessage("A senha deve conter no mínimo 6 caracteres"),
            body('email').custom(email => {
                return usuarioDao.buscarPorEmail(email)
                    .then(retorno => {
                        if(retorno)
                            return Promise.reject('E-mail já cadastrado')
                })
            })
        ]
    }

}

module.exports = Usuarios