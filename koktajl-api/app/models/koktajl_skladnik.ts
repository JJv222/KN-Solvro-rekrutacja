import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import Koktajl from './koktajl.js'
import Skladnik from './skladnik.js'
import Jednostka from './jednostka.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class KoktajlSkladnik extends BaseModel {

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare koktajl_id: number

  @column()
  declare skladnik_id: number

  @column()
  declare ilosc: number

  @column()
  declare jednostka_id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Koktajl, {
    foreignKey: 'koktajl_id',
  })
  declare koktajl: BelongsTo<typeof Koktajl>

  @belongsTo(() => Skladnik, {
    foreignKey: 'skladnik_id',
  })
  declare skladnik: BelongsTo<typeof Skladnik>

  @belongsTo(() => Jednostka, {
    foreignKey: 'jednostka_id',
  })
  declare jednostka: BelongsTo<typeof Jednostka>
}
