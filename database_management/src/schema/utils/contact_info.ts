import { customJsonb } from './custom_json_type'

export type ContactUsFormType = {
  FullName: string
  Email: string
  Message: string
  Webkit: string
}

export const examplContactUsForm: ContactUsFormType = {
  FullName: '',
  Email: '',
  Message: '',
  Webkit: '',
}

export const contact_us_form =
  customJsonb<ContactUsFormType>(examplContactUsForm)

export type UserContactsType = {
  names: {
    first_name: string
    middle_name: string
    last_name: string
    position?: string
  }
  phone_number: string[]
  email: string[]
  relationship?: string
  location: {
    street?: string
    city?: string
    province?: string
    state?: string
    postal_address?: string
    zip_code?: string
    nationality?: string
  }
}

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
}

export const user_contacts = customJsonb<UserContactsType[]>([
  exampleUserContacts,
])

export type social_media_type =
  | 'Facebook'
  | 'Twitter'
  | 'Instagram'
  | 'Whatsapp'
  | 'SMS'
  | 'Gmail'
  | 'Yahoo'
export type SocialMediaIntegrationType = {
  profile_name: string
  link: string
  logo: string
  profile_picture: string
  social_media: social_media_type
  integration?: {
    paid: boolean
    total_paid: string
    api_key: string
    tokens: Record<string, string>
  }
}

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
    tokens: {},
  },
}

export const social_media_lists: social_media_type[] = [
  'Facebook',
  'Twitter',
  'Instagram',
  'Whatsapp',
  'SMS',
  'Gmail',
  'Yahoo',
]
export const social_media_integrations = customJsonb<
  SocialMediaIntegrationType[]
>([])
