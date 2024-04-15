const uuid = require('uuid')
const path = require('path');
const {Cake, CakeInfo} = require('../models/models')
const ApiError = require('../error/ApiError');

class CakeController {
    async create(req, res, next) {
        try {
            let {name, price, brandId, typeId, info} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const cake = await Cake.create({name, price, brandId, typeId, img: fileName});

            if (info) {
                info = JSON.parse(info)
                info.forEach(i =>
                    CakeInfo.create({
                        title: i.title,
                        description: i.description,
                        cakeId: cake.id
                    })
                )
            }

            return res.json(cake)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }

    async getAll(req, res) {
        let {brandId, typeId, limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let cakes;
        if (!brandId && !typeId) {
            cakes = await Cake.findAndCountAll({limit, offset})
        }
        if (brandId && !typeId) {
            cakes = await Cake.findAndCountAll({where:{brandId}, limit, offset})
        }
        if (!brandId && typeId) {
            cakes = await Cake.findAndCountAll({where:{typeId}, limit, offset})
        }
        if (brandId && typeId) {
            cakes = await Cake.findAndCountAll({where:{typeId, brandId}, limit, offset})
        }
        return res.json(cakes)
    }

    async getOne(req, res) {
        const {id} = req.params
        const Cake = await Cake.findOne(
            {
                where: {id},
                include: [{model: CakeInfo, as: 'info'}]
            },
        )
        return res.json(cake)
    }
}

module.exports = new CakeController()