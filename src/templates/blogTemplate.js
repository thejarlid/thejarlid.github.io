import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout/layout";
import styled from "styled-components"
// import SEO from "../utils/SEO";
import RehypeReact from "rehype-react"

const Article = styled.article`
  width: 540px;
  margin: 5% auto;

  @media screen and (max-height: 700px) {
    position: relative;
    font-weight: 400;
    width: 100%;
  }
`

const ArticleTitle = styled.h1`
  font-weight: 200;
  font-size: 1.75rem;
  color: rgb(83, 83, 88);
  margin-bottom: 1rem;
`

const ArticleDate = styled.h2`
  font-weight: 400;
  font-size: 0.9rem;
  color: rgb(83, 83, 88);
  margin-bottom: 2.5rem;
`

const ArticleText = styled.p`
  font-weight: 200;
  font-size: 1rem;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  color: rgb(83, 83, 88);
`

const ArticleListElement = styled.li`
  font-weight: 200;
  font-size: 1rem;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  color: rgb(83, 83, 88);
`

const ArticleLink = styled.a`
  color: #68A7A2;
  border-color: #68A7A2;
`

const renderAst = new RehypeReact({
  createElement: React.createElement,
  components: {
    h1: ArticleTitle,
    p: ArticleText,
    li: ArticleListElement,
    a: ArticleLink,
  },
}).Compiler;

export default function DocumentTemplate({data}) {
  const post = data.markdownRemark
  return (
    <Layout>
      {/* <SEO title={post.frontmatter.title}/> */}
      <Article>
        <ArticleTitle>{post.frontmatter.title}</ArticleTitle>
        <ArticleDate>Effective {post.frontmatter.date}</ArticleDate>
        <ArticleText>{renderAst(post.htmlAst)}</ArticleText>
      </Article>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      htmlAst
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title      
      }
    }
  }
`