import type { HttpContext } from '@adonisjs/core/http'
import KoktajlSkladnik from '#models/koktajl_skladnik'

export default class KoktajlSkladnikiController {
  async index({}: HttpContext) {
    return await KoktajlSkladnik.all()
  }

  async store({ request }: HttpContext) {
    const data = request.only(['koktajl_id', 'skladnik_id', 'ilosc', 'jednostka_id'])
    const ks = await KoktajlSkladnik.create(data)
    return ks
  }

  async show({ params }: HttpContext) {
    return await KoktajlSkladnik.findOrFail(params.id)
  }

  async update({ params, request }: HttpContext) {
    const ks = await KoktajlSkladnik.findOrFail(params.id)
    const data = request.only(['koktajl_id', 'skladnik_id', 'ilosc', 'jednostka_id'])
    ks.merge(data)
    await ks.save()
    return ks
  }

  async destroy({ params, response }: HttpContext) {
    const ks = await KoktajlSkladnik.findOrFail(params.id)
    await ks.delete()
    return response.status(204)
  }
}
