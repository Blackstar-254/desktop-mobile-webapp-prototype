import { env } from "@blackstar/env";
import { InputEl } from "@blackstar/lib/_components/form_components";
import MainSection, { LoadingSection } from "@blackstar/lib/_components/main";
import { image_t } from "@blackstar/server/api/routers/gallery";
import { api } from "@blackstar/utils/api";
import Image from "next/image";
import React from "react";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";

export default function DashboardGalleryIndex() {
  const gallery_images_list = api.dashboardGallery.view_all.useQuery();
  const [images_list, sImagesList] = React.useState<image_t[]>()
  React.useEffect(() => {
    const { data, error, isLoading } = gallery_images_list
    if (isLoading) {
      return
    }

    if (data) {
      sImagesList(data)
    }


  }, [gallery_images_list])

  return (
    <MainSection title="dashboard/gallery" heading="Gallery">
      <div className=" overflow-y-scroll">
        <div className="flex flex-wrap">
          <GalleryCard>
            <div className=" w-[200px] h-[200px] m-auto bg-blue-200 rounded-md flex items-center justify-center">
              <a href="/dashboard/gallery/new" className="p-2 rounded-md hover:bg-blue-400 hover:text-white">
                Add New Image
              </a>
            </div>
          </GalleryCard>
          {
            images_list?.length ?
              images_list?.map((p, i) => {

                return (
                  <GalleryCard key={`photo:${i}`}>
                    <img src={p.url} alt={p.alt} className="max-h-full w-full" />
                  </GalleryCard>
                )
              }) : <GalleryCard><LoadingSection className="w-[200px] h-[200px]" /></GalleryCard>}
        </div>
      </div>
    </MainSection>
  );
}

type GalleryCardProps = {
  children?: React.ReactNode;
};
function GalleryCard({ children }: GalleryCardProps) {
  return (
    <div className="max-w-[300px]  max-h-[300px] items-center p-2 m-2 border-2 border-blue-300 hover:border-blue-600">
      {children}
    </div>
  );
}
