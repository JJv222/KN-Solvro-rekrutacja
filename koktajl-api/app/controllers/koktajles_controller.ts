import type { HttpContext } from '@adonisjs/core/http'
import Koktajl from '#models/koktajl'

export default class KoktajleController {
  async index({}: HttpContext) {
    const koktajle = await Koktajl
      .query()
      .preload('skladniki', (pivotQuery) => {
        pivotQuery
          .preload('skladnik')
          .preload('jednostka')
      })

    return koktajle.map(this.formatKoktajl)
  }

  async show({ params }: HttpContext) {
    const koktajl = await Koktajl
      .query()
      .where('id', params.id)
      .preload('skladniki', (pivotQuery) => {
        pivotQuery
          .preload('skladnik')
          .preload('jednostka')
      })
      .firstOrFail()

    return this.formatKoktajl(koktajl)
  }

  formatKoktajl(k: Koktajl) {
    return {
      id: k.id,
      nazwa: k.nazwa,
      kategoria: k.kategoria,
      instrukcja: k.instrukcja,
      skladniki: k.skladniki.map((sklad) => ({
        nazwa: sklad.skladnik?.nazwa,
        ilosc: sklad.ilosc,
        miara: sklad.jednostka?.nazwa,
      })),
    }
  }

  async store({ request }: HttpContext) {
    const data = request.only(['nazwa', 'kategoria', 'instrukcja'])
    return await Koktajl.create(data)
  }

  async update({ params, request }: HttpContext) {
    const koktajl = await Koktajl.findOrFail(params.id)
    const data = request.only(['nazwa', 'kategoria', 'instrukcja'])
    koktajl.merge(data)
    await koktajl.save()
    return koktajl
  }

  async destroy({ params, response }: HttpContext) {
    const koktajl = await Koktajl.findOrFail(params.id)
    await koktajl.delete()
    return response.status(204)
  }
}
