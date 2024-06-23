import { useDispatch, useSelector } from "react-redux";
import { popularGameFetch } from "../store/popularGame/slice";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, LayoutGroup } from "framer-motion";
import { fadeIn } from "../../animation";
import { motion } from "framer-motion";
import Carrosel from "../components/Carrosel";
import { initi } from "../util";
import Nav from "../components/Nav";
import Swiper from "../components/Swiper";

// components
import Game from "../components/Game";
import GameDetails from "../components/GameDetails";

export default function Home() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [newGameIndex, setNewGameIndex] = useState(() => initi(windowWidth));
  const [upcomingIndex, setUpcomingIndex] = useState(() => initi(windowWidth));
  const [searchIndex, setSearchIndex] = useState(() => initi(windowWidth));
  const location = useLocation();
  const pathId = location.pathname.split("/")[2];
  const dispatch = useDispatch();
  const [intento, setIntento] = useState([]);
  const [intento2, setIntento2] = useState([]);
  const [intento3, setIntento3] = useState([]);
  const [intento4, setIntento4] = useState([]);

  const { popular, isLoading, error, newGame, upComing, search } = useSelector(
    (state) => state.game
  );

  useEffect(() => {
    dispatch(popularGameFetch());
  }, []);

  //if size change, then the carrosel will saw X windows depending the init function

  useEffect(() => {
    function watchWidth() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", watchWidth);
    return function () {
      window.removeEventListener("resize", watchWidth);
    };
  }, []);

  useEffect(() => {
    setNewGameIndex(initi(windowWidth));
    setUpcomingIndex(initi(windowWidth));
    setSearchIndex(initi(windowWidth));
  }, [windowWidth]);

  //filter the game that will apeard in the front page from all the games array
  function show(stateToCheck, arrayToFilter) {
    let array = [];
    for (let i = 0; i < stateToCheck.length; i++) {
      array.push(
        arrayToFilter.filter((x, index) => index === stateToCheck[i].indicador)
      );
    }
    return array.flat();
  }

  //create the Games array with the indicator to the carrosel in order to incorporate inside the carrosel in the render part

  function giveGame(game) {
    return (
      <Game
        key={game?.id}
        name={game?.name}
        released={game?.released}
        id={game?.id}
        image={game?.background_image}
      />
    );
  }

  const gameNewArray = show(newGameIndex, newGame).map((game) =>
    giveGame(game)
  );

  const gameUpcomingArray = show(upcomingIndex, upComing).map((game) =>
    giveGame(game)
  );
  const searchGameArray = show(searchIndex, search).map((game) =>
    giveGame(game)
  );

  useEffect(() => {
    const prueba = popular.map((x) => giveGame(x));
    if (intento.length === 0 && prueba.length > 0) {
      setIntento(
        prueba.map((x, index) => <swiper-slide key={index}>{x}</swiper-slide>)
      );
    }
  }, [popular]);

  useEffect(() => {
    const prueba = upComing.map((x) => giveGame(x));
    if (intento2.length === 0 && prueba.length > 0) {
      setIntento2(
        prueba.map((x, index) => <swiper-slide key={index}>{x}</swiper-slide>)
      );
    }
  }, [upComing]);

  useEffect(() => {
    const prueba = newGame.map((x) => giveGame(x));
    if (intento4.length === 0 && prueba.length > 0) {
      setIntento4(
        prueba.map((x, index) => <swiper-slide key={index}>{x}</swiper-slide>)
      );
    }
  }, [newGame]);

  useEffect(() => {
    const prueba = search.map((x) => giveGame(x));
    if (search.length > 0) {
      setIntento3(
        prueba.map((x, index) => <swiper-slide key={index}>{x}</swiper-slide>)
      );
    }
  }, [search]);

  return (
    <>
      {error ? (
        <p className="loading">
          We cannot get the data, please refresh the page
        </p>
      ) : (
        <>
          <Nav />
          <motion.div
            className="gameList"
            variants={fadeIn}
            initial="hidden"
            animate="show"
          >
            {isLoading ? (
              <p className="loading">Loading...</p>
            ) : (
              <>
                <>{pathId && <GameDetails pathId={pathId} />}</>
                {search.length > 0 && (
                  <>
                    <h2 className="title">Search games</h2>
                    <Swiper
                      render={intento3}
                      nombreIzq="tresI"
                      nombreDer="tresD"
                    />
                  </>
                )}

                <h2 className="title">Popular games</h2>
                <Swiper render={intento} nombreIzq="unoI" nombreDer="unoD" />
                <h2 className="title">Upcoming games</h2>
                <Swiper render={intento2} nombreIzq="dosI" nombreDer="tresD" />
                <h2 className="title">New games</h2>
                <Swiper
                  render={intento4}
                  nombreIzq="cuatroI"
                  nombreDer="cuatroD"
                />
              </>
            )}
          </motion.div>
        </>
      )}
    </>
  );
}
