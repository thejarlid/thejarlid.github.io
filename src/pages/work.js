import React from "react"
import { graphql } from "gatsby"
import Column from "../components/column/column"
import WorkSection from "../components/worksection/worksection"
import Layout from "../components/layout/layout"
import ColumnHeader from "../components/columnHeader/columnHeader"

export default function WorkPage({ data }) {
  return (
    <Layout>
      <Column>
        <ColumnHeader 
          title="work"
          subtitle="Some of my favourite projects and past experience that I want to highlight."
        />
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
