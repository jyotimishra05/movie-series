
import React, { useEffect, useState } from 'react'
import Backdrop from '@mui/material/Backdrop';

import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import { makeStyles } from "@material-ui/core/styles";
import axios from 'axios';
import YouTubeIcon from "@material-ui/icons/YouTube";
import "./ContentModal.css";
import {
    img_500,
    unavailable,
    unavailableLandscape,
  } from "../../config/Config";

const useStyles = makeStyles((theme) => ({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      marginTop:"2%",
      outline:"none",
      height: "80%",
      backgroundColor:"white",
      border: "1px solid #282c34",
      borderRadius: 20,
      

      color: "black",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(1, 1, 4),
    },
  }));

export default function ContentModal({children,media_type,id}) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [content, setContent] = useState();
    const [video, setVideo] = useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const fetchData =async ()=>{
    const {data}=await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}?api_key=00c0c07dfded532b45ecbeba5fc3aac6&language=en-US`)
    setContent(data);
  }
  const fetchVideo =async ()=>{
    const {data}=await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=00c0c07dfded532b45ecbeba5fc3aac6&language=en-US`)
    setVideo(data.results[0]?.key);
  }
  useEffect(() => {
    fetchData();
    fetchVideo();
    // eslint-disable-next-line
  }, []);

  return (
    <>
     <div
        className="media"
        style={{ cursor: "pointer" }}
        color="inherit"
        onClick={handleOpen}
      >
        {children}
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
        {content && (
            <div className={classes.paper}>
              <div className="ContentModal">
                <img
                  src={
                    content.poster_path
                      ? `${img_500}/${content.poster_path}`
                      : unavailable
                  }
                  alt={content.name || content.title}
                  className="ContentModal__portrait"
                />
                <img
                  src={
                    content.backdrop_path
                      ? `${img_500}/${content.backdrop_path}`
                      : unavailableLandscape
                  }
                  alt={content.name || content.title}
                  className="ContentModal__landscape"
                />
                <div className="ContentModal__about">
                  <span className="ContentModal__title">
                    {content.name || content.title} (
                    {(
                      content.first_air_date ||
                      content.release_date ||
                      "-----"
                    ).substring(0, 4)}
                    )
                  </span>
                  {content.tagline && (
                    <i className="tagline">{content.tagline}</i>
                  )}

                  <span className="ContentModal__description">
                    {content.overview}
                  </span>



                  <Button
                    variant="contained"
                    startIcon={<YouTubeIcon />}
                    color="secondary"
                    target="__blank"
                    href={`https://www.youtube.com/watch?v=${video}`}
                  >
                    Watch the Trailer
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Fade>
      </Modal>
    </>
  );
}