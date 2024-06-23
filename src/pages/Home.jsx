import { useDispatch, useSelector } from "react-redux";
import { popularGameFetch } from "../store/popularGame/slice";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { fadeIn } from "../../animation";
import { motion } from "framer-motion";
import Nav from "../components/Nav";
import Swiper from "../components/Swiper";


// components
import Game from "../components/Game";
import GameDetails from "../components/GameDetails";

export default function Home() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const location = useLocation();
  const pathId = location.pathname.split("/")[2];
  const dispatch = useDispatch();
  const [popularState, setPopularState] = useState([]);
  const [upcomingState, setUpcomingState] = useState([])
  const [newGameState, setNewGameState] = useState([])
  const [searchState, setSearchState] = useState([])


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




  //create the swiper information

 const swiperArray = (array, metodo, setter) => {
    const prueba = array.map((x) => giveGame(x));
    if (metodo.length === 0 && prueba.length > 0) {
      setter(
        prueba.map((x, index) => <swiper-slide key={index}>{x}</swiper-slide>)
      );
    }
  }
  
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

  // to call the slide information
  useEffect(() => {
    swiperArray(popular, popularState, setPopularState)
  }, [popular]);

  useEffect(() => {
    swiperArray(upComing, upcomingState, setUpcomingState)
  }, [upComing])

  useEffect(() => {
    swiperArray(newGame, newGameState, setNewGameState)
  }, [newGame])

  // to search for games
  useEffect(() => {
    const prueba = search.map((x) => giveGame(x));
      setSearchState(
        prueba.map((x, index) => <swiper-slide key={index}>{x}</swiper-slide>)
      );
  }, [search])

 


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
                      render={searchState}
                      nombreIzq="tresI"
                      nombreDer="tresD"
                    />
                  </>
                )}

                <h2 className="title">Popular games</h2>
                <Swiper render={popularState} nombreIzq="unoI" nombreDer="unoD" />
                <h2 className="title">Upcoming games</h2>
                <Swiper render={upcomingState} nombreIzq="dosI" nombreDer="tresD" />
                <h2 className="title">New games</h2>
                <Swiper
                  render={newGameState}
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
