import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
// import {Tooltip} from '@material-ui/core';
import "./play.css";
import Tooltip from "@material-ui/core/Tooltip";
import hintIcon from "./assets/hint.svg";
import mapIcon from "./assets/map.svg";
import bulb from "../../../assets/bulb_dark.svg";
import {
  FaRedoAlt,
  FaPlay,
  FaDiscord,
  FaLock,
  FaStar,
  FaTimes,
} from "react-icons/fa";
import {
  Button,
  CircularProgress,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Layout from "../../game-navbar/Layout";
import { useSelector } from "react-redux";
import {
  getHint,
  getQuestion,
  penaltyPoint,
  submitAnswer,
} from "../../../api/requests";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { makeStyles } from "@material-ui/core/styles";
import {
  PlaySection,
  QuestionContainer,
  TopBox,
  TrackBox,
  Trackname,
  QuestionBox,
  QBtnContainer,
  AContainer,
  AnswerBox,
  OurButton,
  QuestionContent,
  Image,
  ButtonContainer,
  LinkText,
} from "./playElements";

const useStyles = makeStyles({
  myStyle: {
    backgroundColor: "transparent",
    color: "white",
  },
});

const notify = (message) =>
  toast.dark(message, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    draggable: true,
    progress: undefined,
  });

function Question({ mapOpen, qId, mapData }) {
  const classes = useStyles();

  const trackName = {
    2: "mythical past",
    1: "digital present",
    3: "dystopian future",
  };
  const usertoken = useSelector((state) => state.auth.token);
  const [wantHint, setWantHint] = useState(false);

  const [ques, setQues] = useState("");
  const [quesImg, setQuesImg] = useState([]);
  const [quesLink, setQuesLink] = useState([]);
  const [hintImg, setHintImg] = useState([]);
  const [hintLink, setHintLink] = useState([]);
  const [track1, setTrack1] = useState("digital present");
  const [track2, setTrack2] = useState("digital present");
  const [hint, setHint] = useState("");
  const [unfreezeQues, setUnfreezeQues] = useState(false);

  const [openHintDialog, setOpenHintDialog] = useState(false);
  const [openUnfreezeDialog, setOpenUnfreezeDialog] = useState(false);
  const [hintButton, setHintButton] = useState(true);
  const [loadingPage, setLoadingPage] = useState(true);

  const [correctAnsAlert, setCorrectAnsAlert] = useState(false);

  const handleClickOpen = async () => {
    setOpenHintDialog(true);
  };

  const handleClose = () => {
    setOpenHintDialog(false);
  };

  // const handleUnfreezeClick = () => {

  // }

  const handleCorrectAnsClose = () => {
    setCorrectAnsAlert(false);
  };
  const handleUnfreezeClose = () => {
    setOpenUnfreezeDialog(false);
  };
  const clickNoHint = () => {
    setWantHint(false);
    handleClose();
  };

  const clickYesHint = async () => {
    const res = await getHint(usertoken, qId);
    if (res.code === "S4") {
      const ques = await getQuestion(usertoken, qId);
      setHint(ques.hint.text);
      setHintImg(ques.hint.img);
      setHintLink(ques.hint.links);
      setWantHint(true);
      setHintButton(false);
    }

    handleClose();
  };

  const handleHint = async (res) => {
    if (res.hint.text) {
      setHint(res.hint.text);
      setHintImg(res.hint.img);
      setHintLink(res.hint.links);
      setWantHint(true);
      setHintButton(false);
    }
  };

  const handleAnswer = async () => {
    setLoadingPage(true);
    const answerBox = document.getElementById("answer-box");
    const answer = answerBox.value;
    if (answer) {
      answerBox.value = "";
      const res = await submitAnswer(usertoken, qId, answer);
      console.log("Response of answer submit");
      console.log(res);
      if (res.code === "S2") {
        setCorrectAnsAlert(true);
        setTimeout(function () {
          setCorrectAnsAlert(false);
          mapOpen(true);
        }, 2000);
      } else {
        notify("Incorrect Answer");
      }
    }
    setLoadingPage(false);
  };

  useEffect(() => {
    const asyncQuestion = async () => {
      let res = await getQuestion(usertoken, qId);
      console.log("Question: ");
      console.log(res);
      localStorage.setItem("currentTracks", JSON.stringify(res.track));
      if (res.track.length === 1) res.track = [res.track[0], res.track[0]];
      // setRes(res);
      if (res.question) {
        setQues(res.question.text);
        setQuesLink(res.question.links);
        setQuesImg(res.question.img);
        if (res.track.length === 2) {
          setTrack1(trackName[res.track[0]]);
          setTrack2(trackName[res.track[1]]);
        } else {
          setTrack1(trackName[res.track[0]]);
          setTrack2(trackName[res.track[0]]);
        }
        handleHint(res);
        setLoadingPage(false);
      } else {
        mapOpen(true);
      }
    };

    asyncQuestion();
    setHint("");
    setHintImg([]);
    setHintImg([]);
  }, [wantHint]);

  const handleFreeze = async () => {
    setOpenUnfreezeDialog(true);
    // console.log('On clicking yes after unfreeze');
    // console.log(res);
  };

  const unfreezeYes = async () => {
    setLoadingPage(true);
    const res = await penaltyPoint(usertoken, qId);
    console.log("Response on unfreeze");
    console.log(res);
    if (res.code === "L3") setLoadingPage(false);
    mapOpen(true);
    setOpenUnfreezeDialog(false);
    setUnfreezeQues(true);
  };

  useEffect(() => {
    const asyncUnfreezeQues = async () => {
      let res = await penaltyPoint(usertoken, qId);
      console.log("On Unfreeze yes: ");
      console.log(res);
      // if (res.question) {
      //   setQues(res.question.text);
      //   setQuesLink(res.question.links);
      //   setQuesImg(res.question.img);
      //   if (res.track.length === 2) {
      //     setTrack1(trackName[res.track[0]]);
      //     setTrack2(trackName[res.track[1]]);
      //   } else {
      //     setTrack1(trackName[res.track[0]]);
      //     setTrack2(trackName[res.track[0]]);
      //   }
      //   handleHint(res);
      //   setLoadingPage(false);
      // } else {
      //   mapOpen(true);
      // }
    };
  }, [unfreezeQues]);

  return (
    <>
      <Layout
        backgroundColor={getComputedStyle(
          document.documentElement
        ).getPropertyValue("--map-bg")}
      />
      <PlaySection>
        {loadingPage && (
          <div>
            <div id="map-loading">
              <CircularProgress color="secondary" />
            </div>
            <div id="darken" />
          </div>
        )}
        <TopBox>
          <TrackBox>
            <Trackname>{track1}</Trackname>
            <Trackname>
              <FaTimes />
            </Trackname>
            <Trackname>{track2}</Trackname>
          </TrackBox>
        </TopBox>
        <QuestionContainer>
          <QuestionBox>
            <QuestionContent>{ques}</QuestionContent>
            {quesImg.map((imgLink) => {
              return (
                <Image>
                  <img src={imgLink} alt="" />
                </Image>
              );
            })}
            {quesLink.map((link) => (
              <LinkText href={link} rel="noreferrer" target="_blank">
                {link}
              </LinkText>
            ))}
            {wantHint && (
              <>
                <h1
                  style={{
                    color: "var(--map-bg)",
                    fontFamily: "Poppins",
                  }}
                >
                  Hint
                </h1>
                <QuestionContent>{hint}</QuestionContent>
                {hintImg.map((imgLink) => {
                  return (
                    <Image>
                      <img src={imgLink} alt="" />
                    </Image>
                  );
                })}
                {hintLink.map((link) => (
                      <LinkText href={link} rel="noreferrer" target="_blank">
                        {link}
                      </LinkText>
                ))}
              </>
            )}
          </QuestionBox>
          <QBtnContainer>
            {hintButton && (
              <IconButton onClick={handleClickOpen}>
                <img src={hintIcon} alt="" />
              </IconButton>
            )}
            <IconButton onClick={() => mapOpen(true)}>
              <img src={mapIcon} alt="" />
            </IconButton>
          </QBtnContainer>
        </QuestionContainer>
        <AContainer>
          <AnswerBox
            autoFocus
            id="answer-box"
            type="text"
            placeholder="Type here..."
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleAnswer();
              }
            }}
          ></AnswerBox>
          <ButtonContainer>
            <OurButton onClick={handleAnswer} type="submit">
              SUBMIT
            </OurButton>
            <Tooltip title="What does unfreeze do?">
              <OurButton onClick={handleFreeze}>UNFREEZE</OurButton>
            </Tooltip>
          </ButtonContainer>
        </AContainer>
      </PlaySection>

      <Dialog
        open={openHintDialog}
        keepMounted
        onClose={handleClose}
        className="hintDialog-container"
      >
        <div id="hintDialog-icon">
          <img src={bulb} alt="" />
        </div>
        <DialogTitle id="alert-hintDialog-title">Take a hint?</DialogTitle>
        <DialogContent id="hintDialog-text">
          -5 <FaStar />
        </DialogContent>
        <DialogActions id="hintDialog-buttons">
          <Button id="confirm-button" onClick={clickYesHint} color="primary">
            Yes
          </Button>
          <Button onClick={handleClose} color="primary">
            No
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openUnfreezeDialog}
        keepMounted
        onClose={handleUnfreezeClose}
        className="hintDialog-container"
      >
        <div id="hintDialog-icon">
          <img src={bulb} alt="" />
        </div>
        <DialogTitle id="alert-hintDialog-title">
          Unfreeze this question?
        </DialogTitle>
        <DialogContent id="hintDialog-text">2 chances left</DialogContent>
        <DialogActions id="hintDialog-buttons">
          <Button id="confirm-button" onClick={unfreezeYes} color="primary">
            Yes
          </Button>
          <Button onClick={handleUnfreezeClose} color="primary">
            No
          </Button>
        </DialogActions>
      </Dialog>

      <Modal
        open={correctAnsAlert}
        closeAfterTransition
        className="answer-modal"
      >
        <Fade in={correctAnsAlert}>
          <div id="answer-alert">
            <div id="alert-icon">
              <img src={bulb} alt="" />
            </div>
            <h2 id="alert-title">Correct</h2>
            <p id="alert-message">
              +20 <FaStar />
            </p>
          </div>
        </Fade>
      </Modal>

      <ToastContainer />
    </>
  );
}

export default Question;
