import z from 'zod';
import { customArrayJsonb, customJsonb } from './custom_json_type';

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

export const exampleUserContacts: UserContactsType = {
  names: {
    first_name: '',
    middle_name: '',
    last_name: '',
    position: '',
  },
  phone_number: [],
  email: [],
  relationship: '',
  location: {
    street: '',
    city: '',
    province: '',
    state: '',
    postal_address: '',
    zip_code: '',
    nationality: '',
  },
};

export const user_contacts = customJsonb<UserContactsType[]>([
  exampleUserContacts,
]);

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

export const exampleSocialMediaIntegration: SocialMediaIntegrationType = {
  profile_name: '',
  link: '',
  logo: '',
  profile_picture: '',
  social_media: 'Gmail',
  integration: {
    paid: false,
    total_paid: '',
    api_key: '',
    meta: {},
  },
};

export const social_media_lists: social_media_type[] = [
  'Facebook',
  'Twitter',
  'Instagram',
  'Whatsapp',
  'SMS',
  'Gmail',
  'Yahoo',
];
export const social_media_integrations =
  customArrayJsonb<SocialMediaIntegrationType>(exampleSocialMediaIntegration);

export const contactUsFormSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  message: z.string(),
  boundaryId: z.string().regex(/[0-9a-zA-Z]+/),
  valid: z.boolean(),
});

export const exampleContactUsForm = {
  name: '',
  email: 'test@email.us',
  message: '',
  boundaryId: '',
  valid: false,
};

export const contact_us_form_t = customJsonb(exampleContactUsForm);
