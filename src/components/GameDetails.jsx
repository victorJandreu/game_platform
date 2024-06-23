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
    if (element.classList.contains("card-shadow") || element.classList.contains("x-close") ) {
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

  function getStart() {
    let startArray = [];
    const rating = Math.floor(details.rating);
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        startArray.push(<img key={i} alt="start" src={starFull} />);
      } else {
        startArray.push(<img key={i} alt="start" src={starEmpty} />);
      }
    }
    return startArray;
  }

  //renders

  const platformArray = details.platforms.map((data) => (
    <img
      key={data.platform.id}
      src={getPlatform(data.platform.name)}
      alt={data.platform.name}
    />
  ));

  const screenArray = screen.results.map((data) => (
    <img key={data.id} src={data.image} alt="game" />
  ));

  return (
    <>
      {!isLoading && (
        <div className="card-shadow" onClick={exitDetailsHandler}>
          <div  className="detail">
            <div className="buton-div">
              <button className="x-close" onClick={exitDetailsHandler}>X</button>
            </div>
            <div className="stats">
              <div className="rating">
                <h3 >
                  {details?.name}
                </h3>
                <p>Rating: {details.rating}</p>
                {getStart()}
              </div>
              <div className="info">
                <h3>Platforms</h3>
                <div className="platforms">{platformArray}</div>
              </div>
            </div>
            <div className="media">
              <img
                src={details?.background_image}
                alt="image"
              />
            </div>
            <div className="description">{details?.description_raw}</div>
            <div className="gallery">{screenArray}</div>
          </div>
        </div>
      )}
    </>
  );
}
