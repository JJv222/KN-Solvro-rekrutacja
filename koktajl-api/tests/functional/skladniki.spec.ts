import { test } from '@japa/runner'
import Skladnik from '#models/skladnik'

test.group('Skladniki', (group) => {
  group.each.teardown(async () => {
    await Skladnik.query().delete()
  })

  test('dodaje nowy składnik', async ({ client }) => {
    const response = await client.post('/skladniki').json({
      nazwa: 'Limonka',
      opis: 'Kwaśny owoc',
      czy_jest_alkoholem: false,
    })

    response.assertStatus(200)
    response.assertBodyContains({ nazwa: 'Limonka' })
  })

  test('pobiera listę składników', async ({ client }) => {
    await Skladnik.create({
      nazwa: 'Rum',
      opis: 'Jasny alkohol',
      czy_jest_alkoholem: true,
    })

    const response = await client.get('/skladniki')
    response.assertStatus(200)
    response.assertBodyContains([{ nazwa: 'Rum' }])
  })
})
