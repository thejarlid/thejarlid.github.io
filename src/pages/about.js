import React from "react"
import Column from "../components/column/column"
import ColumnHeader from "../components/columnHeader/columnHeader"
import Layout from "../components/layout/layout"
// import styled from "styled-components"

const AboutPage = () => {
  return (
    <Layout>
      <Column>
        <ColumnHeader title="about" subtitle=""  />
        <p style={{marginBottom:"1.5rem"}}>
        I'm a caffeine based lifeform currently working as a software engineer at Microsoft on the HoloLens Systems, Firmware, and Drivers team. Outside of my job I love to develop iOS apps that have a focus on sparking wonder and excitment with their use and design. Recently I've had an interest in learning more about computer vision and machine learning theory and practice specifically in their applicaiton towards precision medicine. In general I love learning (and teaching) new things and I use code as my medium to express my creativity. 
        </p>
        <p>
        In my free time I love playing soccer, tennis, boxing, reading, cooking, and enjoying a nice cup of coffee somewhere.
        </p>
      </Column>
    </Layout>
  )
}

export default AboutPage

// import React from "react"
// import { graphql } from "gatsby"
// import Column from "../components/column/column"
// import WorkSection from "../components/worksection/worksection"
// import Layout from "../components/layout/layout"
// import ColumnHeader from "../components/columnHeader/columnHeader"

// export default function WorkPage({ data }) {
//   return (
//     <Layout>
//       <Column>
//         <ColumnHeader 
//           title="work"
//           subtitle="Some of my favourite projects and past experience that I want to highlight."
//         />
//         {data.allWorkYaml.edges.map(({ node }) => (
//           <WorkSection workItem={node}/>
//         ))}
//       </Column>
//     </Layout>
//   )
// }

// export const workQuery = graphql`
//   query WorkQuery {
//     allWorkYaml {
//       edges {
//         node {
//           id
//           description
//           name
//           link
//           date
//           imgSrc
//         }
//       }
//     }
//   }
// `
