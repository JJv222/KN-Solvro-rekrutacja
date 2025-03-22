import { test } from '@japa/runner'
import Koktajl from '#models/koktajl'
import Skladnik from '#models/skladnik'
import Jednostka from '#models/jednostka'
import KoktajlSkladnik from '#models/koktajl_skladnik'

test.group('KoktajlSkladnik', (group) => {
  group.each.teardown(async () => {
    await KoktajlSkladnik.query().delete()
    await Koktajl.query().delete()
    await Skladnik.query().delete()
    await Jednostka.query().delete()
  })

  test('dodaje składnik do koktajlu', async ({ assert }) => {
    const koktajl = await Koktajl.create({
      nazwa: 'Test',
      kategoria: 'testowa',
      instrukcja: 'Testowa instrukcja',
    })

    const skladnik = await Skladnik.create({
      nazwa: 'Wódka',
      opis: '40%',
      czy_jest_alkoholem: true,
    })

    const jednostka = await Jednostka.create({ nazwa: 'ml' })

    const relacja = await KoktajlSkladnik.create({
      koktajl_id: koktajl.id,
      skladnik_id: skladnik.id,
      jednostka_id: jednostka.id,
      ilosc: 50,
    })

    assert.equal(relacja.koktajl_id, koktajl.id)
    assert.equal(relacja.ilosc, 50)
  })
})
