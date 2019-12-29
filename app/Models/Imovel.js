'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Imovel extends Model {

    //Relacionamento Imovel com User
    user(){
        return this.belongsTo('App/Models/User')
    }

    //Relacionamento Imovel com Imagem
    imagens(){
        return this.hasMany('App/Models/Image')
    }
}

module.exports = Imovel
