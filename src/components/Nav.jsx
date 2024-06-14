
import { useDispatch } from "react-redux"
import { searchGameFetch } from "../store/popularGame/slice"
import { useState } from "react"
import { clear } from "../store/popularGame/slice"
import { fadeIn } from "../../animation"
import { motion } from "framer-motion"
import { GiFireball } from "react-icons/gi";

export default function Nav(){
    const dispatch = useDispatch()
    const [textInput, setTextInput] = useState("")

    const inputHandle = (e) => {
        setTextInput(e.target.value)
    }

    const submitSearch = (e) => {
     e.preventDefault()
        dispatch(searchGameFetch(textInput))
        setTextInput("")
    }

    const clearSeacrh = () => {
        dispatch(clear())
    }

    const sty = {
        height: "2rem",
        width: "2rem",
        color: "#ff7676"
    }

    return(
        <motion.nav variants={fadeIn} initial="hidden" animate="show">
            <div onClick={clearSeacrh} className="logo">
                <GiFireball style={sty} />
                <h1>Fireballgame</h1>
            </div>
            <form className="search">
                <input value={textInput} onChange={inputHandle} type="text" />
                <button onClick={submitSearch} type="submit">Search</button>
            </form>
        </motion.nav>
    )
}