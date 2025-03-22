import { test } from '@japa/runner'
import Koktajl from '#models/koktajl'

test.group('Koktajle', (group) => {
  group.each.teardown(async () => {
    await Koktajl.query().delete()
  })

  test('może utworzyć koktajl', async ({ client }) => {
    const response = await client.post('/koktajle').json({
      nazwa: 'Margarita',
      kategoria: 'alkoholowy',
      instrukcja: 'Wstrząśnij i podaj.',
    })

    response.assertStatus(200)
    response.assertBodyContains({
      nazwa: 'Margarita',
    })
  })

  test('może pobrać listę koktajli', async ({ client }) => {
    await Koktajl.create({
      nazwa: 'Mojito',
      kategoria: 'alkoholowy',
      instrukcja: 'Ugnieć limonkę z cukrem.',
    })

    const response = await client.get('/koktajle')
    response.assertStatus(200)
    response.assertBodyContains([{ nazwa: 'Mojito' }])
  })

  test('może usunąć koktajl', async ({ client, assert }) => {
    const k = await Koktajl.create({
      nazwa: 'Cuba Libre',
      kategoria: 'alkoholowy',
      instrukcja: 'Wymieszaj z colą.',
    })

    const response = await client.delete(`/koktajle/${k.id}`)
    response.assertStatus(204)

    const check = await Koktajl.find(k.id)
    assert.isNull(check)
  })
})
