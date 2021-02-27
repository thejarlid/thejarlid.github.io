import React from "react"
import SplitDetailSection from "../SplitDetailSection/SplitDetailSection";

export default function WorkSection(props) {
  const projectName = props.workItem.name ? props.workItem.name : ""
  const projectDate = props.workItem.date ? props.workItem.date : ""
  const projectLink = props.workItem.link ? props.workItem.link : ""
  const projectDescription = props.workItem.description ? props.workItem.description : ""
  const projectIconPath = props.workItem.imgSrc ? props.workItem.imgSrc : ""


  return (
    <SplitDetailSection 
      name={projectName} 
      date={projectDate} 
      link={projectLink} 
      description={projectDescription} 
      imgSrc={projectIconPath} 
      sectionMargin="75px"/>
  )
}