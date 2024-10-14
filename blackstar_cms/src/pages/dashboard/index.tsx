import { env } from '@blackstar/env';
import MainSection from '@blackstar/lib/_components/main';
import { send_log } from '@blackstar/lib/api/log_errors';
import routes from "@blackstar/lib/utils/routes.json"
import { api } from '@blackstar/utils/api';
import { useRouter } from 'next/router';
import React from 'react';
import { useCookies } from "react-cookie";


type contact_forms_list_t = {
  created_at: Date;
  form_data: {
    name: string;
    email: string;
    message: string;
    boundaryId: string;
    valid: boolean;
  };
  visitor_id: string;
}[]

export default function DashboardIndex() {
  const api_contact_forms = api.contactForms.view_all.useQuery()
  const [contact_forms_list, sContactFormsList] = React.useState<contact_forms_list_t>([])
  React.useEffect(() => {
    switch (api_contact_forms.status) {
      case 'error':
        send_log({
          loc: "DashboardIndex",
          message: "error fetching contact_forms list",
          error: api_contact_forms.error,
        })

        return
      case 'success':
        const { data } = api_contact_forms
        if (data?.length) {
          sContactFormsList((curr) => {

            const next: contact_forms_list_t = []

            data.map(({ visitor_id, created_at, form_data }) => {
              if (visitor_id) {
                next.push({
                  created_at,
                  form_data,
                  visitor_id,
                })
              }
            })

            return next
          })

        }

      case 'pending':
        return
    }
  }, [api_contact_forms])
  const router = useRouter()

  const [cookies, sCookies] = useCookies()
  const [iframe_dimensions, sIframeDimensions] = React.useState({
    w: 2,
    h: 2
  })

  React.useEffect(() => {
    const { 'device-type': device_type } = cookies
    console.log({ device_type })
    switch (device_type) {
      case 'laptop':
        sIframeDimensions({
          w: 2,
          h: 1,
        })
        return
      case 'mobile':
        sIframeDimensions({
          w: 1,
          h: 2,
        })
        return
      case 'tablet':
        sIframeDimensions({
          w: 2,
          h: 2,
        })
        return
      case 'desktop':
        sIframeDimensions({
          w: 3,
          h: 2,
        })
        return
    }


  }, [cookies])


  return (
    <MainSection title="dashboard" heading="Dashboard">
      <div className='flex items-center justify-center w-full'>
        <iframe
          src={true ? routes.test.Home : routes.index}
          className={`h-[50vh] w-full`}
          sandbox='allow-forms allow-scripts allow-top-navigation allow-same-origin'
        />
      </div>


    </MainSection>
  );
}
