import React from "react"
import styled from "styled-components"

const ColumnHeaderWrapper = styled.div`
  margin-bottom: 100px;
`

const ColumnSubtitle = styled.h6`
  margin-top: 30px;
  font-weight: 200;
`

export default function ColumnHeader(props) {
  return (
    <ColumnHeaderWrapper>
        <h2>{props.title}</h2>
        <ColumnSubtitle>{props.subtitle}</ColumnSubtitle>
    </ColumnHeaderWrapper>
  );
}
