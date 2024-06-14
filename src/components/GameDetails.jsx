import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { smallImage } from "../util";
import { motion } from "framer-motion";
//Image
import nintendo from "../img/nintendo.svg";
import xbox from "../img/xbox.svg";
import playstation from "../img/playstation.svg";
import apple from "../img/apple.svg";
import gamepad from "../img/gamepad.svg";
import steam from "../img/steam.svg";
import starEmpty from "../img/star-empty.png";
import starFull from "../img/star-full.png";


export default function GameDetails({ pathId }) {
  const navigate = useNavigate();
  const { details, screen, isLoading } = useSelector(
    (state) => state.detailGame
  );

  //Exit details when click the gray part of the screen
  const exitDetailsHandler = (e) => {
    const element = e.target;
    if (element.classList.contains("card-shadow")) {
      document.body.style.overflow = "auto";
      navigate("/");
    }
  };

  //Get platform
  const getPlatform = (platform) => {
    if (platform.includes("PlayStation")) {
      return playstation;
    } else if (platform.includes("Xbox")) {
      return xbox;
    } else if (platform === "PC") {
      return steam;
    } else if (platform === "Nintendo Switch") {
      return nintendo;
    } else if (platform.includes("OS")) {
      return apple;
    } else {
      return gamepad;
    }
  };

  //get start

  function getStart () {
    let startArray = []
    const rating = Math.floor(details.rating)
    for(let i = 1; i <= 5; i++){
      if(i <= rating) {
        startArray.push(<img key={i} alt="start" src={starFull} />)
      } else {
        startArray.push(<img key={i} alt="start" src={starEmpty} />)
      }
    }
    return startArray
  }


  //renders

  const platformArray = details.platforms.map((data) => (
    <img key={data.platform.id} src={getPlatform(data.platform.name)} alt={data.platform.name} /> 
  ));

  const screenArray = screen.results.map((data) => (
    <img key={data.id} src={data.image} alt="game" />
  ));

  return (
    <>
      {!isLoading && (
        <motion.div className="card-shadow" onClick={exitDetailsHandler}>
          <motion.div layoutId={pathId} className="detail">
            <div className="stats">
              <div className="rating">
                <motion.h3 layoutId={`title ${pathId}`}>
                  {details?.name}
                </motion.h3>
                <p>Rating: {details.rating}</p>
                {getStart()}
              </div>
              <div className="info">
                <h3>Platforms</h3>
                <div className="platforms">{platformArray}</div>
              </div>
            </div>
            <div className="media">
              <motion.img
                layoutId={`image ${pathId}`}
                src={details?.background_image}
                alt="image"
              />
            </div>
            <div className="description">{details?.description_raw}</div>
            <div className="gallery">{screenArray}</div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
