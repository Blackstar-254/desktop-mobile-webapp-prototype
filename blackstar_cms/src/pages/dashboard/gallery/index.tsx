import { env } from "@blackstar/env";
import { InputEl } from "@blackstar/lib/_components/form_components";
import MainSection from "@blackstar/lib/_components/main";
import { image_t } from "@blackstar/server/api/routers/gallery";
import { api } from "@blackstar/utils/api";
import Image from "next/image";
import React from "react";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";

export default function DashboardGalleryIndex() {
  const gallery_images_list = api.dashboardGallery.view_all.useQuery();

  return (
    <MainSection title="dashboard/gallery" heading="Gallery">
      Gallery
    </MainSection>
  );
}

type GalleryCardProps = {
  children?: React.ReactNode;
};
function GalleryCard({ children }: GalleryCardProps) {
  return (
    <div className="flex flex-col p-2 m-2 rounded-md hover:border-blue-500 border-2 border-blue-100 w-[40vw] lg:w-[30vw] justify-center items-center bg-white overflow-clip relative">
      {children}
    </div>
  );
}
