import React from "react"
import styled from "styled-components"

const ColumnContent = styled.div`
  display: block;
  margin: auto;
  padding: 0px;
  padding-top: 72px;
  padding-bottom: 72px;
  width: 600px;

  @media screen and (max-width: 600px) {
    width: 100%;
  }
`

export default function Column({ children }) {
  return (
    <ColumnContent>
      {children}
    </ColumnContent>
  )
}