import React, { Component } from "react"
import Layout from "../components/layout/layout"
import styled from "styled-components"
import { Helmet } from "react-helmet"
import useScript from "../hooks/useScript"

const WorkCarosel = styled.div`
  position: absolute;
  left: 0;
  top: 10;
  width: 100%;
  height: 80%;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.15);
  overflow: hidden;
  z-index: 2;

  .side-gradation {
    position: absolute;
    left: 0;
    top: 0;
    width: 0;
    height: 100%;
  }

  .side-gradation.r{ 
    left: auto;
    right: 0;
    -webkit-transform: rotateY(180deg);
    transform: rotateY(180deg);
  }

  .side-gradation div {
    position: absolute;
    top: 0;
    width: 1px;
    height: 100%;
  }

  ul {
    position: relative;
    height: 100%;
    z-index: 2;
    cursor: -webkit-grab;
    cursor: -moz-grab;
    cursor: grab;
  }

  .grabbing, .grabbing #list ul {
    cursor: -webkit-grabbing;
    cursor: -moz-grabbing;
    cursor: grabbing;
  }

  li {
    position: absolute;
    left: 0;
    top: 50%;
    width: 120px;
    height: 120px;
    list-style: none;
    margin-top: -60px;
    z-index: 0;
    opacity: 1;
    visibility: hidden;
    background-color: #77c4d3;
  }

  li.show {
    z-index: 1;
    visibility: visible;
  }

  li a{
    position: relative;
    width: 100%;
    height: 100%;
    color: #606060;
    text-decoration: none;
    background-clip: #000;
    display: block;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
  }

  li a .thumb{
    position: relative;
    width: 100%;
    height: 100%;
    display: block;
    overflow: hidden;
    cursor: pointer;
  }

  li a img{
    position: absolute;
    left: 50%;
    top: 50%;
    width: 120px;
    height: 120px;
    margin: -60px 0 0 -60px;
    display: block;
  }

  li a strong{
    visibility: hidden;
  }

  h5{
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    font-size: 13px;
    font-weight: 500;
    color: #606060;
    line-height: normal;
    text-align: center;
    text-shadow: 0 1px 0 rgba(0,0,0,0.35);
    margin-top: 80px;
    padding: 10px 0;
    z-index: 1;
    pointer-events: none;
  }

  .indicator{
    position: absolute;
    left: 50%;
    top: 10%;
    bottom: 10%;
    width: auto;
    margin-left: -1px;
    border-left: 1px dashed #606060;
    opacity: 1;
    z-index: 0;
    pointer-events: none;
  }

  li a:before, #list li a:after{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    content: '';
    border: 2px solid #77c4d3;
    opacity: 0;
    z-index: 1;
    pointer-events: none;
    cursor: pointer;
    -webkit-transform: rotate(-0.0001deg) scale(1.35, 1.35);
    transform: rotate(-0.0001deg) scale(1.35, 1.35);
    -webkit-transform: all 0.01s 0.2s cubic-bezier(0.550, 0.550, 0.675, 0.190), opacity 0.2s linear;
    transform: all 0.01s 0.2s cubic-bezier(0.550, 0.550, 0.675, 0.190), opacity 0.2s linear;
  }

  li a.on:before, #list li a.on:after, .hoverable #list li a:hover:before, .hoverable #list li a:hover:after{
    opacity: 1;
    -webkit-transform: scale(1,1);
    tranform: scale(1,1);
    -webkit-transition: all 0.5s cubic-bezier(0.215, 0.610, 0355, 1.000);
    transform: all 0.5s cubic-bezier(0.215, 0.610, 0355, 1.000);
  }

  .hoverable #list li a:hover:after{
    -webkit-transition-delay:0.125s;
    transition-delay: 0.125s;
  }
`

const sliderScriptHtml = () => {
  return { __html: `<script src="scripts/move.js"></script><script src="scripts/sliderSetup.js"></script>` }
}


const WorkPage = () => {
  useScript("scripts/move.js")
  useScript("scripts/sliderSetup.js")
  return (
    <Layout>
      <Helmet>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
        <script src='https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.5/jquery-ui.min.js'></script>
      </Helmet>
      <div className="container">
        <WorkCarosel id="list">
          <ul>
              <li data-color="#1">
                  <a href="https://merakiapp.co"><strong>Meraki</strong></a>
              </li>
              <li data-color="#f17330">
                  <a href="https://github.com/Dilraj-Singh-Devgun/xv6"><strong>xv6 - Unix Operating System</strong></a>
              </li>
              <li data-color="#646ebe">
                  <a href="https://github.com/Dilraj-Singh-Devgun/MagnificationPagingControl"><strong>Magnification Paging Control</strong></a>
              </li>
              <li data-color="#005aa0">
                  <a href="https://courses.cs.washington.edu/courses/cse481a/18wi/projects/xkvisor.pdf"><strong>xkvisor</strong></a>
              </li>
              <li data-color="#005aa0">
                  <a href="https://github.com/thejarlid/DDImageLib"><strong>Image Processing Library</strong></a>
              </li>
              <li data-color="#005aa0">
                  <a href="https://github.com/thejarlid/VideoStabilizationPy"><strong>Auto directed video stabilization</strong></a>
              </li>
              <li data-color="#002d4d">
                  <a href="https://www.microsoft.com/en-us/hololens"><strong>HoloLens</strong></a>
              </li>
              <li data-color="#222">
                  <a href="https://appadvice.com/appnn/2016/01/be-more-productive-with-citrus-motivational-task-manager"><strong>Citrus - Motivational Task Manager</strong></a>
              </li>
          </ul>

          <h5>Meraki</h5>
          <div className="indicator"></div>
        </WorkCarosel>
      </div>
    </Layout>
  )
}

export default WorkPage
