import { FormInput } from '@blackstar/lib/_components/form_components';
import MainSection from '@blackstar/lib/_components/main';

import {
    exampleSocialMediaIntegration,
    exampleUserContacts,
    SocialMediaIntegrationType,
    UserContactsType,
} from '@blackstar/server/db/schema/utils/contact_info';
import { api } from '@blackstar/utils/api';
import { GetServerSideProps } from 'next';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    return {
        props: {},
    };
};

type tabs_t = 'user_profile' | 'organisation' | 'social_media' | 'loading';


export default function ProfilePage() {
    const session = useSession();
    const router = useRouter();
    const tabs_list: tabs_t[] = ['user_profile', 'organisation', 'social_media',];
    const [tabSelect, sTabSelect] = React.useState<tabs_t>('user_profile');

    const api_profile_info = api.userProfileManagement.get.useQuery();

    const [social_media_integration_info, sSocialMediaInfo] = React.useState([
        exampleSocialMediaIntegration,
    ]);
    const [user_info, sUserInfo] = React.useState(api_profile_info?.data?.user);
    const [organisation_info, sOrganisationInfo] = React.useState(
        api_profile_info?.data?.organisation,
    );

    React.useEffect(() => {
        const { status, data, error, refetch } = api_profile_info;
        switch (status) {
            case 'pending':
                return;
            case 'error':
                console.log({ error });
                // setTimeout(refetch, 500)
                return;
            case 'success':
                console.log({ data, loc: 'api_profile_info' });
                if (!data?.success) {
                    // setTimeout(refetch, 500)
                    return;
                }
        }
        const { user, organisation } = data;
        if (user) sUserInfo(user);
        if (organisation) {
            const tmp_org = organisation;
            tmp_org.social_media_integration = null;
            tmp_org.contact_information = tmp_org?.contact_information?.length ? tmp_org.contact_information : [exampleUserContacts]
            sOrganisationInfo(tmp_org);
            if (organisation.social_media_integration?.length) {
                sSocialMediaInfo(organisation.social_media_integration);
            } else {
                sSocialMediaInfo([exampleSocialMediaIntegration]);
            }
        }

        // console.log({ social_media_info, user_info, organisation_info })
    }, [tabSelect]);

    const TabBody = ({
        children,
        show,
    }: { children?: React.ReactNode; show: boolean }) => {
        return (
            <div className={`flex justify-center flex-col ${show ? '' : 'hidden'}`}>
                {children}
            </div>
        );
    };

    return (
        <MainSection title="dashboard/profile" heading="Profile">
            <div className="h-[3rem] w-full flex bg-blue-200  px-2">
                {tabs_list.map((tab_item, i) => {
                    return (
                        <div
                            key={`tab_item:${i}`}
                            className="mx-auto items-center justify-center flex ">
                            <p
                                className={` p-2  ${tabSelect === tab_item ? 'bg-white hover:bg-gray-200' : 'hover:bg-blue-400'} capitalize`}
                                onClick={() => sTabSelect(tab_item)}>
                                {tab_item.replaceAll("_", " ")}
                            </p>
                        </div>
                    );
                })}
            </div>
            <div >
                <TabBody show={tabSelect === 'user_profile'}>
                    <UserProfileTab {...{ user_info }} />
                </TabBody>
                <TabBody show={tabSelect === 'organisation'}>
                    <OrganisationProfileTab {...{ organisation_info }} />
                </TabBody>
                <TabBody show={tabSelect === 'social_media'}>
                    <SocialMediaIntegrationTab {...{ social_media_integration_info }} />
                </TabBody>
            </div>
        </MainSection>
    );
}

type user_info_t = {
    name: string | null;
    id: string;
    email: string;
    emailVerified: Date | null;
    image: string | null;
    client_org: string | null;
    contact_info: UserContactsType[] | null;
};

function UserProfileTab({ user_info }: { user_info?: user_info_t }) {
    const user_info_form = useForm<user_info_t>({
        defaultValues: user_info,
        reValidateMode: "onSubmit"
    })
    const onSubmit = user_info_form.handleSubmit((form_entries) => {

    })

    return <>
        {JSON.stringify(user_info)}
        <form>
            <FormInput input_props={{ ...user_info_form.register("id"), disabled: true }} input_label='UserId' />
            <FormInput input_props={{ ...user_info_form.register("name") }} input_label='Name' />
            <FormInput input_props={{ ...user_info_form.register("email") }} input_label='Email' />
            <FormInput input_props={{ ...user_info_form.register("image") }} input_label='Image' />

        </form>
    </>;
}

type organisation_info_t = {
    name: string;
    address: string;
    domain_name: string | null;
    client_id: string;
    contact_information: UserContactsType[] | null;

    id: number;
    created_at: Date;
    updated_at: Date;
};

function OrganisationProfileTab({
    organisation_info,
}: { organisation_info?: organisation_info_t }) {

    const organisation_info_form = useForm<organisation_info_t>({
        defaultValues: organisation_info
    })
    return <>
        <div className='w-full flex justify-center '><h2>Organisation Info</h2></div>
        {JSON.stringify(organisation_info)}
        <form>
            <FormInput input_props={{ ...organisation_info_form.register("name") }} input_label='Business Name' />
            <FormInput input_props={{ ...organisation_info_form.register("domain_name"), disabled: true }} input_label='Domain Name' />
            <FormInput input_props={{ ...organisation_info_form.register("address"), type: 'textarea' }} input_label='Postal Address' />
            <FormInput input_props={{ ...organisation_info_form.register("client_id"), disabled: true }} input_label='ClientId' />
        </form>
        {organisation_info?.contact_information?.map((contact_item, i) => {

            return <div key={`contact_item_form:${i}`}>


                <form>
                    <FormInput input_props={{ ...organisation_info_form.register(`contact_information.${i}.names.first_name`) }} input_label='First Name' />
                    <FormInput input_props={{ ...organisation_info_form.register(`contact_information.${i}.names.middle_name`) }} input_label='Middle Name' />
                    <FormInput input_props={{ ...organisation_info_form.register(`contact_information.${i}.names.last_name`) }} input_label='Last Name' />
                    <FormInput input_props={{ ...organisation_info_form.register(`contact_information.${i}.phone_number`) }} input_label='Phone Number' />
                </form>
            </div>
        })}
    </>;
}

function SocialMediaIntegrationTab({
    social_media_integration_info,
}: { social_media_integration_info?: SocialMediaIntegrationType[] }) {
    return <>{JSON.stringify(social_media_integration_info)}</>;
}
