import Head from "next/head";

import Fileupload from "../components/Fileupload";

export default function Home() {
  return (
    <div>
      <Head>
        <title>FileUpload</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Fileupload title="S3 FileUpload" />
      </main>
    </div>
  );
}
