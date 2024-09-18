import { customType } from 'drizzle-orm/pg-core';

export const customJsonb = <TData>(example: TData) =>
  customType<{ data: TData; driverData: string; default: true }>({
    dataType() {
      return 'jsonb';
    },
    toDriver(value: TData): string {
      return JSON.stringify({
        ...example,
        ...value,
      });
    },
    fromDriver(value: string): TData {
      const val = JSON.parse(value);
      return {
        ...example,
        ...val,
      };
    },
  });

export const customArrayJsonb = <TData>(example: TData) =>
  customType<{ data: TData[]; driverData: string; default: true }>({
    dataType() {
      return 'jsonb';
    },
    toDriver(value: TData[]): string {
      if (value.length < 1) {
        value = [example];
        return JSON.stringify(value);
      }
      let res = value.map((v) => ({ ...example, ...v }));
      return JSON.stringify(res);
    },
    fromDriver(value: string): TData[] {
      let val = JSON.parse(value);
      return val.map((v: any) => ({ ...example, ...v }));
    },
  });
