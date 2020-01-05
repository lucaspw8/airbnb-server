'use strict'
//Dar acesso ao caminho da pasta de uploads chamada tmp.
const Helpers = use('Helpers')


const Image = use('App/Models/Image')
const Imovel = use('App/Models/Imovel')
class ImageController {

    async store({params, request, response}){
        const imovel = await Imovel.findOrFail(params.id)
        
        const images = request.file('image',{
            types: ['image'],
            size: '2mb'
        })

        await images.moveAll(Helpers.tmpPath('uploads'), file => ({
            name: `${Date.now()}-${file.clientName}`
        }))

        if(!images.movedAll()){
            return response.status(415).send(images.errors())
        }

        await Promise.all(
            images.movedList()
            .map(image => imovel.images().create({path: image.fileName}))
        )
    }

    async show({params, response}){
        //return params.path;
        return response.download(Helpers.tmpPath(`/uploads/${params.path}`))
    }
}

module.exports = ImageController
