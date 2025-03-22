import type { HttpContext } from '@adonisjs/core/http'
import Jednostka from '#models/jednostka'

export default class JednostkiController {
  // GET /jednostki
  async index({}: HttpContext) {
    return await Jednostka.all()
  }

  // GET /jednostki/:id
  async show({ params, response }: HttpContext) {
    const jednostka = await Jednostka.find(params.id)

    if (!jednostka) {
      return response.status(404).json({ message: 'Jednostka nie znaleziona' })
    }

    return jednostka
  }

  // POST /jednostki
  async store({ request }: HttpContext) {
    const data = request.only(['nazwa'])
    const jednostka = await Jednostka.create(data)
    return jednostka
  }

  // PUT /jednostki/:id
  async update({ params, request, response }: HttpContext) {
    const jednostka = await Jednostka.find(params.id)

    if (!jednostka) {
      return response.status(404).json({ message: 'Jednostka nie znaleziona' })
    }

    const data = request.only(['nazwa'])
    jednostka.merge(data)
    await jednostka.save()

    return jednostka
  }

  // DELETE /jednostki/:id
  async destroy({ params, response }: HttpContext) {
    const jednostka = await Jednostka.find(params.id)

    if (!jednostka) {
      return response.status(404).json({ message: 'Jednostka nie znaleziona' })
    }

    await jednostka.delete()
    return response.status(204)
  }
}
