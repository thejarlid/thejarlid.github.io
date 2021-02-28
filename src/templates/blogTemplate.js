import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout/layout";
import styled from "styled-components"
// import SEO from "../utils/SEO";
import RehypeReact from "rehype-react"
import "katex/dist/katex.min.css"
import { defineCustomElements as deckDeckGoHighlightElement } from '@deckdeckgo/highlight-code/dist/loader';

deckDeckGoHighlightElement();

const Article = styled.article`
  width: 600px;
  margin: 5% auto;
  word-wrap: break-word;

  @media screen and (max-width: 600px) {
    position: relative;
    font-weight: 400;
    width: 100%;
  }
`

const ArticleTitle = styled.h1`
  font-weight: 200;
  font-size: 2rem;
  margin-bottom: 1rem;
`

const ArticleSubtitle = styled.h2`
  font-weight: 200;
  font-size: 1.5rem;
  margin-top: 50px;
  margin-bottom: 30px;
`

const ArticleH3 = styled.h3`
  font-weight: 300;
  font-size: 1.2rem;
  margin-top: 50px;
  margin-bottom: 30px;
`


const ArticleDate = styled.h2`
  font-weight: 300;
  font-size: 1rem;
  color: rgb(170, 170, 170);
  margin-bottom: 75px;
`

const ArticleText = styled.p`
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  font-size: 14px;

  @media screen and (max-width: 700px) {
    font-size: 1rem;
  }
`

const ArticleListElement = styled.li`
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  font-size: 14px;
  font-weight: 200;

  @media screen and (max-width: 700px) {
    font-size: 1rem;
  }
`

const ArticleUnorderedList = styled.ul`
  margin: 0;
  list-style-position: inside;
`

const ArticleOrderedList = styled.ol`
  margin: 0;
  list-style-position: inside;
`

const ArticleBlockquote = styled.blockquote`
  padding-left: 30px;
`

const renderAst = new RehypeReact({
  createElement: React.createElement,
  components: {
    h1: ArticleTitle,
    h2: ArticleSubtitle,
    h3: ArticleH3,
    p: ArticleText,
    li: ArticleListElement,
    ul: ArticleUnorderedList,
    ol: ArticleOrderedList,
    blockquote: ArticleBlockquote,
  },
}).Compiler;

export default function DocumentTemplate({data}) {
  const post = data.markdownRemark
  return (
    <Layout>
      {/* <SEO title={post.frontmatter.title}/> */}
      <Article>
        <ArticleTitle>{post.frontmatter.title}</ArticleTitle>
        <ArticleDate>{post.frontmatter.date}</ArticleDate>
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