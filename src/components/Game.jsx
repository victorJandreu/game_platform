import { useDispatch, useSelector } from "react-redux";
import { detailGame } from "../store/detailGame/slice";
import { Link } from "react-router-dom";
import { smallImage } from "../util";
import { motion } from "framer-motion";
import { popUp } from "../../animation";


export default function Game({ name, released, image, id }) {
  const dispatch = useDispatch();
  const stringPathId = id.toString()

//to not go scroll down the body and dispatch the details info games
  function handleDetail() {
    document.body.style.overflow = "hidden";
    dispatch(detailGame(id));
  }

  return (
    <motion.div variants={popUp} initial="hidden" animate="show" layoutId={stringPathId} onClick={handleDetail} className="game">
      <Link to={`/game/${id}`}>
        <motion.h3 layoutId={`title ${stringPathId}`}>{name}</motion.h3>
        <p>{released}</p>
        {image && <div className="img-container"> <motion.img layoutId={`image ${stringPathId}`} src={smallImage(image, 640)} alt={name} /> </div>}
      </Link>
    </motion.div>
  );
}
