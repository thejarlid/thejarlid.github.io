import React from "react"
import { graphql } from "gatsby"
import Column from "../components/column/column"
import WorkSection from "../components/worksection/worksection"
import Layout from "../components/layout/layout"

export default function WorkPage({ data }) {
  console.log(data);
  return (
    <Layout>
      <Column>
        <h2>work</h2>
        <h6 style={{marginTop:"30px", fontWeight:"200"}}>A collection of some of my favourite projects and past experience that I want to highlight.</h6>
        {data.allWorkYaml.edges.map(({ node }) => (
          <WorkSection workItem={node}/>
        ))}
      </Column>
    </Layout>
  )
}

export const workQuery = graphql`
  query WorkQuery {
    allWorkYaml {
      edges {
        node {
          id
          description
          name
          link
          date
          imgSrc
        }
      }
    }
  }
`
