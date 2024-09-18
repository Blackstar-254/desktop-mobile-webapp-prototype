import { customJsonb } from './custom_json_type';

export type VisitorInfoType = {
  ip_address: string;
  last_visit: Date;
  cookie: string;
  banned: {
    isBanned: boolean;
    time: Date;
    duration: number;
  };
};

export const exampleVisitorInfo = {
  ip_address: '',
  last_visit: new Date(),
  cookie: '',
  banned: {
    isBanned: false,
    time: new Date(),
    duration: 0,
  },
};

export const visitor_info_t = customJsonb<VisitorInfoType>(exampleVisitorInfo);
