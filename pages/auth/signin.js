import {
  getSession,
  getProviders,
  signIn as signInWithProvider,
} from "next-auth/react";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";

const signin = ({ providers }) => {
  return (
    <div className='flex flex-col items-center justify-start h-screen'>
      <div className='relative w-full h-full'>
        <video
          src='/assets/share.mp4'
          type='video/mp4'
          loop
          controls={false}
          muted
          autoPlay
          className='object-cover w-full h-full'
        />
        <div className='absolute top-0 bottom-0 left-0 right-0 flex flex-col items-center justify-center bg-blackOverlay'>
          <div className='p-5'>
            <div className='relative w-[130px] h-[27px]'>
              <Image
                layout='fill'
                objectfit='contain'
                src='/assets/logowhite.png'
                alt='logo'
              />
            </div>
          </div>
          <div className='shadow-2xl'>
            {Object.values(providers).map((provider) => (
              <div key={provider.name}>
                <button
                  className='flex items-center justify-center p-3 rounded-lg outline-none cursor-pointer bg-mainColor'
                  onClick={() =>
                    signInWithProvider(provider.id, { callbackUrl: "/" })
                  }
                >
                  <FcGoogle className='mr-4' /> Sign in with {provider.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default signin;

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  const providers = await getProviders();

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: { providers },
  };
};
