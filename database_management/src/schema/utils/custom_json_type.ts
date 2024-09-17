import { customType } from 'drizzle-orm/pg-core'

export const customJsonb = <TData>(example: TData) =>
  customType<{ data: TData; driverData: string; default: true }>({
    dataType() {
      return 'jsonb'
    },
    toDriver(value: TData): string {
      return JSON.stringify({
        ...example,
        ...value,
      })
    },
    fromDriver(value: string): TData {
      const val = JSON.parse(value)
      return {
        ...example,
        ...val,
      }
    },
  })
