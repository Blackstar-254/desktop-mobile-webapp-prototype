import { env } from '@blackstar/env';
import { InputEl } from '@blackstar/lib/_components/form_components';
import MainSection from '@blackstar/lib/_components/main';
import { image_t } from '@blackstar/server/api/routers/gallery';
import { api } from '@blackstar/utils/api';
import Image from 'next/image';
import React from 'react';
import { useForm } from 'react-hook-form';



export default function DashboardGalleryIndex() {
  const gallery_images_list = api.dashboardGallery.view_all.useQuery()
  const [images_list, sImagesList] = React.useState<image_t[]>([])
  const [new_image_id, sNewImageId] = React.useState(crypto.randomUUID())
  const [image_name, sImageName] = React.useState("")
  React.useEffect(() => {


  }, [gallery_images_list])
  const image_form = useForm({
    defaultValues: {
      image: new File([], "default-image.png"),
    },

    resetOptions: {
      keepValues: true,
      keepDirty: true,
      keepIsSubmitSuccessful: false
    }
  })

  const handleSubmit = image_form.handleSubmit(async (data) => {
    const destination_url = `${env.NEXT_PUBLIC_BLACKSTARTECH_CMS_URL}/api/cms/gallery/${new_image_id}`
    console.log({
      data,
      destination_url
    })
  })
  return (
    <MainSection title="dashboard/gallery" heading="Gallery">

      <div className='flex flex-wrap text-sm'>
        <GalleryCard>
          <form onSubmit={handleSubmit} className='p-2 mx-auto flex flex-col justify-center '>
            <p>Image Name:  {image_name}</p>
            <div className='bg-blue-200 rounded-md px-2 my-2 hover:bg-blue-300 '>
              choose image
              <input {...{ type: "file", accept: 'image/png, image/jpeg, image/webp', ...image_form.register("image"), className: "opacity-0 rounded-md" }}
                onChange={(e) => {
                  const data = e as unknown as InputEvent & { target: { value?: any } }
                  let new_name: string = data?.target?.value ?? ""

                  new_name = new_name.replaceAll("\\", "/").split("/").pop() ?? ""
                  sImageName(new_name)


                  return e
                }}
              />

            </div>

            <button type='submit' className='text-white bg-blue-400 border-2 border-transparent px-2 hover:text-black hover:bg-white hover:border-blue-400'>
              Submit
            </button>

          </form></GalleryCard>
        {
          gallery_images_list?.data?.map((v) => (
            <GalleryCard>
              <img src={""} />
            </GalleryCard>
          ))
        }
      </div>
    </MainSection>
  );
}

type GalleryCardProps = {
  children?: React.ReactNode
}
function GalleryCard({ children }: GalleryCardProps) {

  return <div className='flex flex-col p-2 m-2 rounded-md hover:border-blue-500 border-2 border-blue-100 w-[40vw] lg:w-[30vw] justify-center items-center bg-white overflow-clip relative'>
    {children}
  </div>
}