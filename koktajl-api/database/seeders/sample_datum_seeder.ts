import { BaseSeeder } from '@adonisjs/lucid/seeders'
import koktajl from '#models/koktajl'
import skladnik from '#models/skladnik'
import jednostka from '#models/jednostka'
import koktajlSkladnik from '#models/koktajl_skladnik'

export default class extends BaseSeeder {
  public async run () {
    // Dodaj jednostki
    const ml = await jednostka.create({ nazwa: 'ml' })
    const sztuka = await jednostka.create({ nazwa: 'sztuka' })

    // Dodaj składniki
    const wodka = await skladnik.create({
      nazwa: 'Wódka',
      opis: '40% alkohol',
      czy_jest_alkoholem: true,
      zdjecie: Buffer.from([]),
    })

    const sokPom = await skladnik.create({
      nazwa: 'Sok pomarańczowy',
      opis: 'Naturalny sok z pomarańczy',
      czy_jest_alkoholem: false,
      zdjecie: Buffer.from([]),
    })

    const limonka = await skladnik.create({
      nazwa: 'Limonka',
      opis: 'Świeża limonka',
      czy_jest_alkoholem: false,
      zdjecie: Buffer.from([]),
    })

    // Dodaj koktajl
    const sexOnTheBeach = await koktajl.create({
      nazwa: 'Sex on the Beach',
      kategoria: 'alkoholowy',
      instrukcja: 'Wymieszaj składniki w shakerze i podawaj z lodem.',
    })

    // Powiąż składniki z koktajlem
    await koktajlSkladnik.createMany([
      {
        koktajl_id: sexOnTheBeach.id,
        skladnik_id: wodka.id,
        ilosc: 50,
        jednostka_id: ml.id,
      },
      {
        koktajl_id: sexOnTheBeach.id,
        skladnik_id: sokPom.id,
        ilosc: 100,
        jednostka_id: ml.id,
      },
      {
        koktajl_id: sexOnTheBeach.id,
        skladnik_id: limonka.id,
        ilosc: 1,
        jednostka_id: sztuka.id,
      },
    ])
  }
}
