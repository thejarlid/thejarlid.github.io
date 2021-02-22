import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

const Navbar = styled.div`
  padding-top: 1rem;
  overflow: hidden;
  color: #606060;
  z-index: 55;
  float: right;
  overflow: hidden;
  display: inline-block;
  vertical-align: baseline;
  margin-top: 1rem;
  margin-right: 1.5rem;

  @media screen and (max-width: 1099px) {
    text-align: center;
  }
`

const Navigation = styled.ul`
  float: right;
  color: #606060;

  @media screen and (max-width: 1099px) {
    width: 100%;
    height: auto;
    margin-bottom: 1em;
    text-align: center;
  }
`

const NavigationListElement = styled.li`
  list-style-type: none;
  list-style-position: inside;
  display: inline-block;
`

const NavLink = styled(Link)`
  font-size: 0.7em;
  font-style: normal;
  font-weight: normal;
  letter-spacing: 2px;
  line-height: 20.899999618530273px;
  list-style-type: disc;
  padding-bottom: 0px;
  padding-left: 11px;
  padding-right: 11px;
  padding-top: 15px;
  text-align: left;
  text-decoration: none;
  text-transform: uppercase;
  color: #606060;

  &:hover{
    color: #77c4d3;
    border-color: #77c4d3;
  }
`

export default function Header() {
  return (
    <div>
      <header style={{overflow: 'auto'}}>
        <Navbar>
          <Navigation>
            <NavigationListElement>
              <NavLink to="/">Home</NavLink>
            </NavigationListElement>
            <NavigationListElement>
              <NavLink to="/">Resume</NavLink>
            </NavigationListElement>
            <NavigationListElement>
              <NavLink to="/">Work</NavLink>
            </NavigationListElement>
            <NavigationListElement>
              <NavLink to="/">Blog</NavLink>
            </NavigationListElement>
            <NavigationListElement>
              <NavLink to="/">About</NavLink>
            </NavigationListElement>
          </Navigation>
        </Navbar>
      </header>
    </div>
  )
}