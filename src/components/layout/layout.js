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
    font-size: 100%;
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
  
  h1 {
    position: relative;
    font-weight: 400;
    font-size: 3em;
    display: inline-block;
    width: 100%;
    margin: 7px 0;
  }
  
  h2 {
    font-size: 1.5em;
    font-weight: 100;
    position: relative;
    display: block;
    margin: 7px 0;
  }
  
  h3 {
    margin: 0;
    font-size: 1.3em;
  }
  
  p {
    color: rgb(81, 81, 81);
    display: block;
    font-size: 0.9em;
    font-style: normal;
    font-weight: normal;
    letter-spacing: 1px;
    line-height: 25px;
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
