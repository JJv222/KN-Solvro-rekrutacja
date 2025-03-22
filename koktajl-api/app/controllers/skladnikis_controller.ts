import type { HttpContext } from '@adonisjs/core/http'
import Skladnik from '#models/skladnik'

export default class SkladnikiController {
  async index({}: HttpContext) {
    return await Skladnik.all()
  }

  async store({ request }: HttpContext) {
    const data = request.only(['nazwa', 'opis', 'czy_jest_alkoholem', 'zdjecie'])
    const skladnik = await Skladnik.create(data)
    return skladnik
  }

  async show({ params }: HttpContext) {
    const skladnik = await Skladnik.findOrFail(params.id)
    return skladnik
  }

  async update({ params, request }: HttpContext) {
    const skladnik = await Skladnik.findOrFail(params.id)
    const data = request.only(['nazwa', 'opis', 'czy_jest_alkoholem', 'zdjecie'])
    skladnik.merge(data)
    await skladnik.save()
    return skladnik
  }

  async destroy({ params, response }: HttpContext) {
    const skladnik = await Skladnik.findOrFail(params.id)
    await skladnik.delete()
    return response.status(204)
  }
}
