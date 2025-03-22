import Koktajl from '#models/koktajl'
import Skladnik from '#models/skladnik'
import Jednostka from '#models/jednostka'
import KoktajlSkladnik from '#models/koktajl_skladnik'

export default class SampleDataSeeder {
  public async run () {
    // Jednostki
    const ml = await Jednostka.create({ nazwa: 'ml' })
    const szt = await Jednostka.create({ nazwa: 'sztuka' })
    const lyzka = await Jednostka.create({ nazwa: 'łyżka' })

    // Składniki
    const skladniki = await Skladnik.createMany([
      { nazwa: 'Wódka', opis: '40% alkohol', czy_jest_alkoholem: true, zdjecie: Buffer.from([]) },
      { nazwa: 'Sok pomarańczowy', opis: 'Słodki i naturalny', czy_jest_alkoholem: false, zdjecie: Buffer.from([]) },
      { nazwa: 'Limonka', opis: 'Świeża limonka', czy_jest_alkoholem: false, zdjecie: Buffer.from([]) },
      { nazwa: 'Rum', opis: 'Jasny rum', czy_jest_alkoholem: true, zdjecie: Buffer.from([]) },
      { nazwa: 'Mięta', opis: 'Liście mięty', czy_jest_alkoholem: false, zdjecie: Buffer.from([]) },
      { nazwa: 'Cukier trzcinowy', opis: 'Brązowy cukier', czy_jest_alkoholem: false, zdjecie: Buffer.from([]) },
      { nazwa: 'Cola', opis: 'Gazowany napój', czy_jest_alkoholem: false, zdjecie: Buffer.from([]) },
      { nazwa: 'Tequila', opis: 'Meksykański alkohol', czy_jest_alkoholem: true, zdjecie: Buffer.from([]) },
      { nazwa: 'Triple sec', opis: 'Pomarańczowy likier', czy_jest_alkoholem: true, zdjecie: Buffer.from([]) },
      { nazwa: 'Sok żurawinowy', opis: 'Kwaśny i orzeźwiający', czy_jest_alkoholem: false, zdjecie: Buffer.from([]) },
    ])

    // Koktajle
    const koktajle = await Koktajl.createMany([
      {
        nazwa: 'Margarita',
        kategoria: 'alkoholowy',
        instrukcja: 'Wstrząśnij tequilę, likier i limonkę z lodem i podaj w szklance z solą.',
      },
      {
        nazwa: 'Sex on the Beach',
        kategoria: 'alkoholowy',
        instrukcja: 'Wymieszaj składniki w shakerze i podaj z lodem.',
      },
      {
        nazwa: 'Mojito',
        kategoria: 'alkoholowy',
        instrukcja: 'Ugnieć miętę z cukrem i limonką, dodaj rum i wodę gazowaną.',
      },
      {
        nazwa: 'Tequila Sunrise',
        kategoria: 'alkoholowy',
        instrukcja: 'Wlej tequila, sok pomarańczowy, a na końcu grenadynę.',
      },
      {
        nazwa: 'Cuba Libre',
        kategoria: 'alkoholowy',
        instrukcja: 'Połącz rum, colę i limonkę w szklance z lodem.',
      },
    ])

    // Powiązania koktajl_skladnik (przykładowe proporcje)
    await KoktajlSkladnik.createMany([
      // Margarita
      { koktajl_id: koktajle[0].id, skladnik_id: skladniki[7].id, ilosc: 50, jednostka_id: ml.id }, // Tequila
      { koktajl_id: koktajle[0].id, skladnik_id: skladniki[8].id, ilosc: 25, jednostka_id: ml.id }, // Triple sec
      { koktajl_id: koktajle[0].id, skladnik_id: skladniki[2].id, ilosc: 1, jednostka_id: szt.id }, // Limonka

      // Sex on the Beach
      { koktajl_id: koktajle[1].id, skladnik_id: skladniki[0].id, ilosc: 40, jednostka_id: ml.id }, // Wódka
      { koktajl_id: koktajle[1].id, skladnik_id: skladniki[8].id, ilosc: 20, jednostka_id: ml.id }, // Triple sec
      { koktajl_id: koktajle[1].id, skladnik_id: skladniki[1].id, ilosc: 80, jednostka_id: ml.id }, // Sok pom.

      // Mojito
      { koktajl_id: koktajle[2].id, skladnik_id: skladniki[3].id, ilosc: 50, jednostka_id: ml.id }, // Rum
      { koktajl_id: koktajle[2].id, skladnik_id: skladniki[4].id, ilosc: 10, jednostka_id: szt.id }, // Mięta
      { koktajl_id: koktajle[2].id, skladnik_id: skladniki[5].id, ilosc: 2, jednostka_id: lyzka.id }, // Cukier
      { koktajl_id: koktajle[2].id, skladnik_id: skladniki[2].id, ilosc: 1, jednostka_id: szt.id }, // Limonka

      // Tequila Sunrise
      { koktajl_id: koktajle[3].id, skladnik_id: skladniki[7].id, ilosc: 40, jednostka_id: ml.id }, // Tequila
      { koktajl_id: koktajle[3].id, skladnik_id: skladniki[1].id, ilosc: 100, jednostka_id: ml.id }, // Sok pom.

      // Cuba Libre
      { koktajl_id: koktajle[4].id, skladnik_id: skladniki[3].id, ilosc: 50, jednostka_id: ml.id }, // Rum
      { koktajl_id: koktajle[4].id, skladnik_id: skladniki[6].id, ilosc: 100, jednostka_id: ml.id }, // Cola
      { koktajl_id: koktajle[4].id, skladnik_id: skladniki[2].id, ilosc: 1, jednostka_id: szt.id }, // Limonka
    ])
  }
}
