import React from "react"
import Layout from "../components/layout/layout"
import Typed from 'react-typed';
import styled from "styled-components"


const HelloMessage = styled.h1`
  position: relative;
  font-weight: 300;
  font-size: 3em;
  display: inline-block;
  width: 100%;
  margin: 7px 0;

  @media screen and (max-width: 350px) {
    position: relative;
    font-weight: 400;
    font-size: 2em;
    display: inline-block;
    width: 100%;
  }

  @media screen and (max-height: 500px) {
    position: relative;
    font-weight: 400;
    font-size: 2em;
    display: inline-block;
    width: 100%;
  }
`

const Prompt = styled.h2`
  font-size: 1.5em;
  font-weight: 200;
  position: relative;
  display: block;
  margin: 7px 0;

  @media screen and (max-width: 350px) {
    font-size: 1em;
    font-weight: 100;
    position: relative;
    display: block;
  }

  @media screen and (max-height: 500px) {
    font-size: 1em;
    font-weight: 100;
    position: relative;
    display: block;
  }
  
`

const HomeContent = styled.div`
  position: relative;
  width: 100%;
  line-height: 1.5;
  padding-top: 18%;
  padding-left: 20%;
  padding-right: 20%;
  color: black;
  opacity: 1;

  @media screen and (max-width: 600px) {
    width: 80%;
    padding-left: 10%;
    padding-right: 10%;
    padding-bottom: 0%;
  }

  @media screen and (max-height: 500px) {
    width: 80%;
    padding-left: 10%;
    padding-right: 0%;
    padding-top: 15%;
    padding-bottom: 0;
    padding-bottom: 0%;
  }
  
`

const IndexPage = () => {
  return (
    <Layout>
      <HomeContent>
        <HelloMessage>Hi, I'm Dilraj.</HelloMessage>
        <Prompt>
          <Typed strings={[
              "In a nutshell I build cool things.", 
              "My passion in CS are in low level systems and medical applications of ML, CV, and AI.",
              "I'm a software engineer on the HoloLens team @ Microsoft.", 
              "I develop iOS apps in my free time.",
              "I studied Computer Science @ the University of Washington.",
              "I'm a first generation college graduate.",
              "I love soccer, tennis, and boxing.",
              "My favourite book is Notes From the Underground.",
              "My favourite albums are Channel Orange, Not Waving But Drowning, and My Beautiful Dark Twisted Fantasy.",
              "I grew up in England and currently live in Seattle.",
              "I can solve the rubix cube in under 2 minutes."]}
              typeSpeed={30}
              backSpeed={20}
              backDelay={1000}
              loop={true}/>
        </Prompt>
      </HomeContent>
    </Layout>
  )
}

export default IndexPage
