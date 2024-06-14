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

// components
import Game from "../components/Game";
import GameDetails from "../components/GameDetails";

export default function Home() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [popularGameIndex, setPopularGameIndex] = useState(() =>
    initi(windowWidth)
  );
  const [newGameIndex, setNewGameIndex] = useState(() => initi(windowWidth));
  const [upcomingIndex, setUpcomingIndex] = useState(() => initi(windowWidth));
  const [searchIndex, setSearchIndex] = useState(() => initi(windowWidth));
  const location = useLocation();
  const pathId = location.pathname.split("/")[2];
  const dispatch = useDispatch();

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
    setPopularGameIndex(initi(windowWidth));
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

  const gamePopularArray = show(popularGameIndex, popular).map((game) =>
    giveGame(game)
  );
  const gameNewArray = show(newGameIndex, newGame).map((game) =>
    giveGame(game)
  );

  const gameUpcomingArray = show(upcomingIndex, upComing).map((game) =>
    giveGame(game)
  );
  const searchGameArray = show(searchIndex, search).map((game) =>
    giveGame(game)
  );

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
              <LayoutGroup>
                <AnimatePresence>
                  {pathId && <GameDetails pathId={pathId} />}
                </AnimatePresence>
                {search.length > 0 && (
                  <Carrosel
                    arrayToRender={searchGameArray}
                    arrayNormal={search}
                    IndexModificador={setSearchIndex}
                  >
                    Search games
                  </Carrosel>
                )}
                <Carrosel
                  arrayToRender={gamePopularArray}
                  arrayNormal={popular}
                  IndexModificador={setPopularGameIndex}
                >
                  Popular games
                </Carrosel>
                <Carrosel
                  arrayToRender={gameNewArray}
                  arrayNormal={newGame}
                  IndexModificador={setNewGameIndex}
                >
                  New games
                </Carrosel>
                <Carrosel
                  arrayToRender={gameUpcomingArray}
                  arrayNormal={upComing}
                  IndexModificador={setUpcomingIndex}
                >
                  Upcoming games
                </Carrosel>
              </LayoutGroup>
            )}
          </motion.div>
        </>
      )}
    </>
  );
}
