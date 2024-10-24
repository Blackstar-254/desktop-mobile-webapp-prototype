import {
  exampleSocialMediaIntegration,
  exampleUserContacts,
  type SocialMediaIntegrationType,
  type UserContactsType,
} from '@blackstar/server/db/schema/utils/contact_info';

export type user_profile_return_t = {
  id: string;
  name: string;
  email: string;
  email_verified: string;
  image: string | null;
  client_org: string;
  contact_info: UserContactsType[];
  organisations_id: 2;
  organisations_created_at: string;
  organisations_updated_at: string;
  address: string;
  domain_name: string;
  client_id: string;
  contact_information: UserContactsType[];
  social_media_integration: SocialMediaIntegrationType[];
};

export const user_profile_return_example: user_profile_return_t = {
  id: '',
  name: '',
  email: '',
  email_verified: '',
  image: '',
  client_org: '',
  contact_info: [exampleUserContacts],
  organisations_id: 2,
  organisations_created_at: '',
  organisations_updated_at: '',
  address: '',
  domain_name: '',
  client_id: '',
  contact_information: [exampleUserContacts],
  social_media_integration: [exampleSocialMediaIntegration],
};
