// Basic imports
import Head from "next/head";

// Types
import type { FC  } from "react";

const IndexSEO: FC = () => {
  const description = "Personal blog app.";

  return (
    <Head>
      <title>kitaBlog</title>
      <meta name="description" content={description} />
      <meta name="author" content="kitanoyoru" />
    </Head>
  );
};

export default IndexSEO;
