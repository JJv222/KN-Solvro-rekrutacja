import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import KoktajlSkladnik from './koktajl_skladnik.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class Koktajl extends BaseModel {

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nazwa: string

  @column()
  declare kategoria: string

  @column()
  declare instrukcja: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => KoktajlSkladnik, {
    foreignKey: 'koktajl_id',
  })
  declare skladniki: HasMany<typeof KoktajlSkladnik>
}
