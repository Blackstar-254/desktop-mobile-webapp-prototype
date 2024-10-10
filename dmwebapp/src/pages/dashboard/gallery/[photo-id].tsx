import MainSection from '@blackstar/lib/_components/main';
import { GetServerSideProps } from 'next';


export const getServerSide: GetServerSideProps = async () => {



  return {
    props: {}
  }
}

export default function PhotoIdPage() {
  const photo_id = 'photo-id';
  return (
    <MainSection
      title={`dashboard/gallery/${photo_id}`}
      heading={'Dashboard Gallery'}>
      {/* Dashboard */}
    </MainSection>
  );
}



function NewImageSubpage() {


  return (
    <MainSection
      title={`dashboard/gallery/new`}
      heading={'Dashboard Gallery'}>
      {/* Dashboard */}
    </MainSection>
  );
}