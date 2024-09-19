export type ContactUsFormType = {
  FullName: string;
  Email: string;
  Message: string;
  Webkit: string;
};
export declare const examplContactUsForm: ContactUsFormType;
export declare const contact_us_form: <TName extends string>(
  dbName: TName,
  fieldConfig?: unknown,
) => import('drizzle-orm/pg-core').PgCustomColumnBuilder<
  import('drizzle-orm/pg-core').ConvertCustomConfig<
    TName,
    {
      data: ContactUsFormType;
      driverData: string;
      default: true;
    }
  >
>;
export type UserContactsType = {
  names: {
    first_name: string;
    middle_name: string;
    last_name: string;
    position?: string;
  };
  phone_number: string[];
  email: string[];
  relationship?: string;
  location: {
    street?: string;
    city?: string;
    province?: string;
    state?: string;
    postal_address?: string;
    zip_code?: string;
    nationality?: string;
  };
};
export declare const exampleUserContacts: UserContactsType;
export declare const user_contacts: <TName extends string>(
  dbName: TName,
  fieldConfig?: unknown,
) => import('drizzle-orm/pg-core').PgCustomColumnBuilder<
  import('drizzle-orm/pg-core').ConvertCustomConfig<
    TName,
    {
      data: UserContactsType[];
      driverData: string;
      default: true;
    }
  >
>;
export type social_media_type =
  | 'Facebook'
  | 'Twitter'
  | 'Instagram'
  | 'Whatsapp'
  | 'SMS'
  | 'Gmail'
  | 'Yahoo';
export type SocialMediaIntegrationType = {
  profile_name: string;
  link: string;
  logo: string;
  profile_picture: string;
  social_media: social_media_type;
  integration?: {
    paid: boolean;
    total_paid: string;
    api_key: string;
    meta: Record<string, string>;
  };
};
export declare const exampleSocialMediaIntegration: SocialMediaIntegrationType;
export declare const social_media_lists: social_media_type[];
export declare const social_media_integrations: <TName extends string>(
  dbName: TName,
  fieldConfig?: unknown,
) => import('drizzle-orm/pg-core').PgCustomColumnBuilder<
  import('drizzle-orm/pg-core').ConvertCustomConfig<
    TName,
    {
      data: SocialMediaIntegrationType[];
      driverData: string;
      default: true;
    }
  >
>;
