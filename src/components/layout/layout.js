import React from "react"
import Header from "../header/header"
import Footer from "../footer/footer"
import styled from "styled-components"
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body, div, h1, h2, h3, h4, h5, h6, p {
    margin: 0;
    padding: 0;
    border: 0;
    font: inherit;
    font-family: 'Open Sans', "Helvetica Neue", Helvetica, "Segoe UI", Arial, freesans, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    vertical-align: baseline;
    font-style: normal;
    font-weight: normal;
  }
  
  html, body {
    width: 100%;
    height: 100%;
    background-color: #fff;
  }

  html {
    font-size: 16px;
  }
  
  h1 {
    position: relative;
    font-weight: 300;
    font-size: 3em;
    display: inline-block;
    width: 100%;
    margin: 7px 0;
    letter-spacing: 2px;
    color: rgb(17, 17, 17);
  }
  
  h2 {
    font-size: 2rem;
    font-weight: 200;
    position: relative;
    display: block;
    margin: 7px 0;
    letter-spacing: 2px;
    color: rgb(17, 17, 17);
  }
  
  h3 {
    margin: 0;
    font-size: 1.6em;
    letter-spacing: 2px;
    color: rgb(17, 17, 17);
  }

  h4 {
    margin: 0;
    font-size: 1.4em;
    letter-spacing: 2px;
    color: rgb(17, 17, 17);
  }

  h5 {
    margin: 0;
    font-size: 1.2rem;
    letter-spacing: 2px;
    color: rgb(17, 17, 17);
  }

  h6 {
    margin: 0;
    font-size: 1rem;
    letter-spacing: 2px;
    color: rgb(17, 17, 17);
  }
  
  p {
    color: rgb(102, 102, 102);
    display: block;
    font-size: 0.8rem;
    font-style: normal;
    font-weight: 200;
    letter-spacing: 1px;
    line-height: 22px;
    text-align: left;
  }
  
  a {
    letter-spacing: 2px;
    padding-bottom: 0px;
    text-decoration: none;
    color: #77c4d3;
  }
  
  a:hover{
    color: #77c4d3;
    border-color: #77c4d3;
  }
`

const Site = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  margin: auto;

  @media screen and (max-width: 1099px) {
    max-width: calc(100% - 80px);
  }
`

const SiteContent = styled.div`
  flex-grow:1;

  @media screen and (max-width: 1099px) {
    flex-grow: none;
  }
`

export default function Layout({ children }) {

  return (
    <Site>
      <GlobalStyle />
      <Header />
      <SiteContent>{children}</SiteContent>
      <Footer />
    </Site>
  );
}
