import { useState } from "react";
import Navbar from "./Navbar";
import ShowPortfollo from "../pages/ShowPortfollo";



function Search() {
    const [input, setInput] = useState('');
    const Handler = (e) => {
        setInput(e.target.value)
    }
    const FindF = () => {
        console.log(input)
        console.log('working')
    }
    return ( 
        <>
            <h1>SEARCH</h1>
            
            {/* <Navbar name={'sdsdsds'} inputv={ input} Handler={Handler} Find={FindF} /> */}
        
        </>
    )
}

export default Search;