import Head from "next/head";
import Image from "next/image";
import GlobalStyles from "../src/globalStyles";
import styled from "styled-components";

const StyledH1 = styled.h1`
  font-family: var(--font-headings);
`;

const StyledP = styled.h1`
  font-family: var(--font-contents);
`;

export default function Home() {
  return (
    <div>
      <GlobalStyles />
      <Head>
        <title>eCyeshe - Home</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <StyledH1>eCyeshe coming soon</StyledH1>
        <StyledP>Hello WORLD</StyledP>
      </main>
    </div>
  );
}
