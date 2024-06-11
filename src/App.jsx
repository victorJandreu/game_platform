import { useDispatch, useSelector } from "react-redux";
import { popularGameFetch } from "./store/popularGame/slice";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  const { popular, isLoading, error } = useSelector((state) => state.game);
  useEffect(() => {
    dispatch(popularGameFetch());
  }, []);

  console.log(popular);

  return (
    <>
      <p>hola</p>
      <p>adios</p>
    </>
  );
}

export default App;
