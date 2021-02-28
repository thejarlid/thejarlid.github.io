import React from "react"
import { graphql } from "gatsby"
import Column from "../components/column/column"
import BlogSection from "../components/blogsection/blogsection"
import Layout from "../components/layout/layout"
import ColumnHeader from "../components/columnHeader/columnHeader"


const ExternalBlogs = [
  {
    frontmatter: {
      title: "On Being A First Generation College Student",
      date: "November, 2018"
    },
    fields: {
      slug: "https://news.cs.washington.edu/2018/11/08/allen-school-undergrads-are-blazing-new-trails-as-first-generation-college-students/"
    },
    excerpt: "The UW Paul G. Allen School of Computer Science did an interview in which myself and two fellow features shared our thoughts and experiences being a first generation student studying computer science"
  }
]

export default function BlogPage({ data }) {
  return (
    <Layout>
      <Column>
        <ColumnHeader 
          title="blog" 
          subtitle="Just a collection of my thoughts, notes, stories, and things to share..." 
        />
        
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <BlogSection blogPost={node}>{node.frontmatter.title}</BlogSection>
        ))}

        {ExternalBlogs.map((post) => (
          <BlogSection blogPost={post}>{post.frontmatter.title}</BlogSection>
        ))}
      </Column>
    </Layout>
  )
}

export const blogQuery = graphql`
  query BlogQuery {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "MMMM, YYYY")
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`
