import React from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

import GlobalStyles from "src/globalStyles";
import Button from "src/components/Button";

const Header = styled.header`
  height: 4rem;
  display: flex;
  flex-direction: "row";
  justify-content: space-between;
  margin: 2rem 0;

  &:first-child {
    flex-grow: 3;
  }
`;

const Main = styled.main``

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr min(1300px, 100%) 1fr;

  & > * {
    grid-column: 2;
  }
`;

const Nav = styled.ul`
  display: flex;
  flex-grow: 1;
`;

const NavItems = styled.ul`
  display: flex;
  list-style-type: none;
`;

const NavItem = styled.li`
  padding: 1rem 2rem;
  height: 90px;
  text-transform: capitalize;
  font-family: var(--font-contents);
  font-size: large;
  font-weight: 700;
  font-size: 1.25rem;
`;

const StyledLink = styled.a`
  text-decoration: none;
  color: var(--color-text);
  line-height: 1;
  word-break: break-word;
  word-wrap: break-word;
  font-style: normal;
  cursor: pointer;
  transition: background-size 0.2s ease-in;
  background-size: 100% 0%;
  &:hover {
    background-image: linear-gradient(120deg, #ff13a7 0%, #ff13a7 100%);
    background-repeat: no-repeat;
    background-size: 100% 90%;
    background-position: 0 90%;
  }
`;

const Img = styled(Image)`
  cursor: pointer;
  margin-top: -1rem;
`;

interface ILayout {
  children: React.ReactNode
}

function Layout({ children }: ILayout) {
  return (
    <>
    <GlobalStyles />
    <Head>
      <title>eCyeshe | Discover & book local beauty professionals</title>
      <meta
        name="description"
        content="eCyeshe is the online destination for beauty & wellness professionals and clients"
      />
      <style>@import url(https://fonts.googleapis.com/css?family=Kumbh+Sans:300,400,700&amp;display=swap);</style>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Grid>
      <Header>
        <Link href="/"><Img width="170" height="130" src="/logo.png" alt="logo" /></Link>
        <Nav>
          <h2 className="sr-only" id="header-navigation">
            Header navigation
          </h2>
          <NavItems>
            <NavItem>
              <Link passHref href="#"><StyledLink >Set Up My Business</StyledLink></Link>
            </NavItem>
            <NavItem>
            <Link passHref href="#"><StyledLink>Sign Up</StyledLink></Link>
            </NavItem>
            <NavItem>
            <Link passHref href="#"><StyledLink>Log In</StyledLink></Link>
            </NavItem>
            <NavItem>
            <Link passHref href="#"><StyledLink>Help</StyledLink></Link>
            </NavItem>
          </NavItems>
        </Nav>
        <div>
          <Button href="#">Book an appointment</Button>
        </div>
      </Header>
      <Main>
        {children}
      </Main>
      </Grid>
    </>
  );
}

export default Layout;
