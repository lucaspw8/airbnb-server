'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

const Database = use('Database')

class Imovel extends Model {

    static scopeNearBy(query, latitude, longitude, distance){
        
        //Cálculo naval de distância
        const haversine = `(6361 *acos(cos(radians(${latitude}))
        *cos(radians(latitude))
        *cos(radians(longitude)
        - radians(${longitude})) 
        + sin(radians(${latitude}))
        * sin(radians(latitude))))`

        return query
        .select('*', Database.raw(`${haversine} as distance`))
        .whereRaw(`${haversine} < ${distance}`)
    }

    //Relacionamento Imovel com User
    user(){
        return this.belongsTo('App/Models/User')
    }

    //Relacionamento Imovel com Imagem
    images(){
        return this.hasMany('App/Models/Image')
    }
}

module.exports = Imovel
