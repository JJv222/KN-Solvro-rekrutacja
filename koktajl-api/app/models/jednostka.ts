import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import KoktajlSkladnik from './koktajl_skladnik.js'

export default class Jednostka extends BaseModel {

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nazwa: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => KoktajlSkladnik, {
    foreignKey: 'jednostka_id',
  })
  declare koktajlSkladniki: HasMany<typeof KoktajlSkladnik>
}
