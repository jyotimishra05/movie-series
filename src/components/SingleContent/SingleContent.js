import React from 'react'
import "./SingleContent.css";

import { img_300,unavailable } from '../../config/Config'
import ContentModal from '../ContentModal/ContentModal';

const SingleContent = ({id,
    poster,
    title,
    date,
    media_type,
    vote_average,}) => {
  return (
    <ContentModal media_type={media_type} id={id}>
   
    <img className="poster" src= {poster ?`${img_300}${poster}` :unavailable}/>
    <b className="title">{title}</b>
      <span className="subTitle">
        {media_type === "tv" ? "TV Series" : "Movie"}
        <span className="subTitle">{date}</span>
      </span>
    
    </ContentModal>
  )
}

export default SingleContent