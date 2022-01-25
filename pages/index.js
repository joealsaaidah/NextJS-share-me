import Head from "next/head";
import { getSession, useSession } from "next-auth/react";
import { client } from "../utils/client";
import { useEffect } from "react";
import Link from "next/link";

export default function Home({ user }) {
  const { data: session, status } = useSession();
  const { _createdAt, _id, _rev, _type, _updatedAt, email, image, userName } =
    user;

  if (status === "authenticated" && user) {
    return (
      <div className=''>
        <Head>
          <title>MiMiCuCu | Homepage</title>
          <meta name='description' content='Generated by create next app' />
          <link rel='icon' href='/favicon.ico' />
        </Head>

        <h1 className=''>Homepage</h1>
        <p>Signed in as {session.user.email}</p>
      </div>
    );
  } else {
    return (
      <p>
        please signin here{" "}
        <span className='text-blue-500'>
          <Link href='/api/auth/signin'>Sign in</Link>
        </span>
      </p>
    );
  }
}

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  const { name, email, image, id } = session.user;

  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }

  const doc = {
    _id: id,
    _type: "user",
    email: email,
    userName: name,
    image: image,
  };

  const user = await client.createIfNotExists(doc);

  return {
    props: { user, session },
  };
};
