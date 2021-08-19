import { useEffect, useState } from "react";
import { GameContainer, ButtonContainer, RiddlerLogo, Checkers, GifImage } from "./style";
// import riddlerLogo from "../../../assets/riddlerlogo_svg.svg";
import riddlerLogo from "../../../assets/power.svg";

import playButton from "../../../assets/play_button.svg";
import playWithColor from "../../../assets/PlaywithColor.svg";

import guideWithColor from "../../../assets/guideWithColor.svg";
import guideButton from "../../../assets/guide_button.svg";
import leaderboardButton from "../../../assets/leaderboard_button.svg";
import leaderboardwithColor from "../../../assets/leaderboardwithColor.svg";
import checkerLine from "../../../assets/checkers_line.svg";
import { ReactComponent as StarRed } from "../../../assets/star_thing_1.svg";
import { ReactComponent as StarBlue } from "../../../assets/star_thing_2.svg";
import { ReactComponent as StarYellow } from "../../../assets/star_thing_3.svg";
import { ReactComponent as StarsmallBlue } from "../../../assets/star_thing_4.svg";
import checkers from "../../../assets/checkers.svg";
import GIF from "../../../assets/GIF.gif";

import { useHistory } from "react-router-dom";
import { useDrag } from "react-use-gesture";
import { useSpring, animated } from "@react-spring/web";

const Game = () => {
  const history = useHistory();
  const routeChange = (path) => {
    history.push(path);
  };
  const logoPos = useSpring({ x: 0, y: 0 });
  const aPos = useSpring({ x: 0, y: 0 });
  const bPos = useSpring({ x: 0, y: 0 });
  const cPos = useSpring({ x: 0, y: 0 });
  const bindLogoPos = useDrag((params) => {
    logoPos.x.set(params.offset[0]);
    logoPos.y.set(params.offset[1]);
  });
  const bindaPos = useDrag((params) => {
    aPos.x.set(params.offset[0]);
    aPos.y.set(params.offset[1]);
  });
  const bindbPos = useDrag((params) => {
    bPos.x.set(params.offset[0]);
    bPos.y.set(params.offset[1]);
  });
  const bindcPos = useDrag((params) => {
    cPos.x.set(params.offset[0]);
    cPos.y.set(params.offset[1]);
  });
  const [stateGuide, setstateGuide] = useState(guideButton)
  const [statePlay, setstatePlay] = useState(playButton)
  const [stateLeaderboard, setstateLeaderboard] = useState(leaderboardButton)

  


  return (
    <>
      <GameContainer>
        <animated.div
          {...bindLogoPos()}
          style={{
            x: logoPos.x,
            y: logoPos.y,
            position: "absolute",
            top: "10%",
            right: "12%",
            zIndex:"6",
            cursor: "pointer",
      
          }}
        >
          <StarRed />
        </animated.div>
        <animated.div
          {...bindaPos()}
          style={{
            x: aPos.x,
            y: aPos.y,
            position: "absolute",
            top: "20%",
            right: "12%",
            zIndex:"6",
            cursor: "pointer",

            // userSelect:"none",
          }}
        >
          <StarBlue />
        </animated.div>
        <animated.div
          {...bindbPos()}
          style={{
            x: bPos.x,
            y: bPos.y,
            position: "absolute",
            bottom: "10%",
            left: "12%",
            zIndex:"6",
            cursor: "pointer",

            // userSelect:"none",
          }}
        >
          <StarYellow />
        </animated.div>
        <animated.div
          {...bindcPos()}
          style={{
            x: cPos.x,
            y: cPos.y,
            position: "absolute",
            bottom: "20%",
            left: "10%",
            zIndex:"6",
            cursor: "pointer",

            // userSelect:"none",
          }}
        >
          <StarsmallBlue />
        </animated.div>

        <Checkers style={{ top: 0}} src={checkers} alt="Checkers" />
        <Checkers style={{ bottom: 0 }} src={checkers} alt="Checkers" />
        <RiddlerLogo src={riddlerLogo} alt={"Riddler Logo"} />
        <ButtonContainer>
          <div onMouseEnter={()=>{
            setstateGuide(guideWithColor)
          }}
          onMouseLeave={()=>{
            setstateGuide(guideButton)
          }} 
          >
          <img
            id="/guide"
            src={stateGuide}
            alt={"Riddler Logo"}
            onClick={(e) => {
              routeChange(e.target.id);
            }}
            
          />
          </div>
          <div onMouseEnter={()=>{
            setstatePlay(playWithColor)
          }}
          onMouseLeave={()=>{
            setstatePlay(playButton)
          }} 
          >
          <img
            id="/play"
            src={statePlay}
            alt={"Riddler Logo"}
            onClick={(e) => {
              routeChange(e.target.id);
            }}
          />
          </div>
          <div onMouseEnter={()=>{
            setstateLeaderboard(leaderboardwithColor)
          }}
          onMouseLeave={()=>{
            setstateLeaderboard(leaderboardButton)
          }} 
          >
          <img
            id="/leaderboard"
            src={stateLeaderboard}
            alt={"Riddler Logo"}
            onClick={(e) => {
              routeChange(e.target.id);
            }}
          />
          </div>
        </ButtonContainer>
      </GameContainer>
    </>
  );
};

export default Game;
