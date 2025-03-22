import { test } from '@japa/runner'
import Jednostka from '#models/jednostka'

test.group('Jednostki', (group) => {
  group.each.teardown(async () => {
    await Jednostka.query().delete()
  })

  test('tworzy jednostkę miary', async ({ assert }) => {
    const j = await Jednostka.create({ nazwa: 'ml' })
    assert.equal(j.nazwa, 'ml')
  })

  test('pobiera wszystkie jednostki', async ({ assert }) => {
    await Jednostka.createMany([
      { nazwa: 'ml' },
      { nazwa: 'sztuka' },
    ])

    const jednostki = await Jednostka.all()
    assert.lengthOf(jednostki, 2)
  })
})
