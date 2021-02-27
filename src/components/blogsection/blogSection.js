import React from "react"
import SplitDetailSection from "../SplitDetailSection/SplitDetailSection"

export default function BlogSection(props) {
  const postTitle = props.blogPost.frontmatter.title ? props.blogPost.frontmatter.title : ""
  const postDate = props.blogPost.frontmatter.date ? props.blogPost.frontmatter.date : ""
  const postLink = props.blogPost.fields.slug ? props.blogPost.fields.slug : ""
  const postExcerpt = props.blogPost.excerpt ? props.blogPost.excerpt : ""

  return (
    <SplitDetailSection 
      name={postTitle} 
      date={postDate} 
      link={postLink} 
      description={postExcerpt} />
  )
}

