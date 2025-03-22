import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import KoktajlSkladnik from './koktajl_skladnik.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class Skladnik extends BaseModel {

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nazwa: string

  @column()
  declare opis: string

  @column()
  declare czy_jest_alkoholem: boolean

  @column()
  declare zdjecie: Buffer

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => KoktajlSkladnik, {
    foreignKey: 'skladnik_id',
  })
  declare koktajle: HasMany<typeof KoktajlSkladnik>
}
