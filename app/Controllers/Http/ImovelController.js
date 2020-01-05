'use strict'

const Imovel = use('App/Models/Imovel')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with imovels
 */
class ImovelController {
  /**
   * Show a list of all imovels.
   * GET imovels
   *
   */
  async index ({request}) {
    const {latitude, longitude} = request.all()

    const imoveis = await Imovel.query().with('images')
    .nearBy(latitude, longitude, 10).fetch()
    return imoveis
  }

  /**
   * Create/save a new imovel.
   * POST imovels
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({auth, request, response }) {
    const {id} = auth.user
    const data = request.only([
      'title',
      'address',
      'latitude',
      'longitude',
      'price'
    ])

    const imovel = await Imovel.create({...data,user_id: id})

    return imovel
  }

  /**
   * Display a single imovel.
   * GET imovels/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params }) {
    const imovel = await Imovel.findOrFail(params.id)

    await imovel.load('images')

    return imovel
  }



  /**
   * Update imovel details.
   * PUT or PATCH imovels/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const imovel = await Imovel.findOrFail(params.id)

    const data = request.only([
      'title',
      'address',
      'latitude',
      'longitude',
      'price'
    ])    

    imovel.merge(data)

    await imovel.save()

    return imovel
  }

  /**
   * Delete a imovel with id.
   * DELETE imovels/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, auth, response }) {
    var imovel = await Imovel.findOrFail(params.id)
    if(imovel.user_id !== auth.user.id){
      return response.status(401).send({error: "Não autorizado"})
    }
    console.log(imovel)
    await imovel.delete()
  }
}

module.exports = ImovelController
