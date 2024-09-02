import Layout from "@/components/Layout";
import Header from "@/components/Header";
import MainCategory from "@/components/MainCategory";
import { getSession } from "next-auth/react";

export default function Home() {
  return (
    <div>
      <Header/>
      <MainCategory />
      <Layout>This is explore page</Layout>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
