import fs from 'node:fs';
import MainSection from '@blackstar/lib/_components/main';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import resource_urls from '@blackstar/lib/utils/resources_urls.json';


const error_images = resource_urls['error-message-images'] as unknown as Record<string, string> & typeof resource_urls['error-message-images']
const error_images_list = Object.keys(error_images).map((v) => error_images[v]).filter((v) => v?.includes("404"))


export default function ErrorPage404() {
  const rand = Math.round(Math.random() * error_images_list.length) % error_images_list.length

  return <MainSection >
    <div className='w-screen flex justify-center items-center'>
      <div className='flex flex-col'>
        <img src={error_images_list[rand]} alt="404 error image" />
        <div>
          Page not found
        </div>
      </div>
    </div>
  </MainSection>;
}
