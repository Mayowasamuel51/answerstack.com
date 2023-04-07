import { Link, Outlet } from "react-router-dom";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.min.js'
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function Navbar() {
    const [input, setInput] = useState('');
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false)
    const [errorResult, setErrorResult] = useState(false)
    const Handler = (e) => {
        setInput(e.target.value)
    }
    const getting = (search) => {
        axios.get(`/api/codardeveloper/${search}`).then((res) => {
            if (res.data.status === 404) {
                alert('not found title')
                setErrorResult(true)
            }
            else if (res.status === 200) {

                setData(res.data.data)
                setIsLoading(false)
                setErrorResult(false)
            }

        }).catch((err) => {
            setError(true)
            setErrorResult(false)
        })
    }
    const Find = () => {
        setIsLoading(true)
        getting(input)
    }
    let contentPage = ''
    if (error) {
        contentPage = <h4 className="text-danger text-center">CHECK YOUR NETWORK</h4>
    } else if (errorResult) {
        contentPage = <h4 className="text-warning text-center fw-bolder">NOT FOUND </h4>
    } else {
        if (isLoading) {
            contentPage = <h3 className="text-success text-center">LOADING ...........</h3>
        } else {
            contentPage = <div>
                {data.length > 0 ? <List questions={data} /> : <Outlet />}
            </div>
        }
    }
    return (
        <>
            <div className="container-fluid">
                <nav className="navbar navbar-expand-lg bg-light">
                    <div className="container-fluid">
                        <Link className="navbar-brand fw-bolder" to="/">StackAnswer

                        </Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" style={{ fontWeight: 'bolder' }} to="/allquestions">All Questions</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/form" style={{ fontWeight: 'bolder' }}>Ask question</Link>
                                </li>
                                <li className="nav-item dropdown">
                                    {/* <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"> */}
                                        {/* Dropdown */}
                                    {/* </a> */}
                                    {/* <ul className="dropdown-menu">
                                        <li><a className="dropdown-item" href="#">Action</a></li>
                                        <li><a className="dropdown-item" href="#">Another action</a></li>
                                        <li><hr className="dropdown-divider" /></li>
                                        <li><a className="dropdown-item" href="#">Something else here</a></li>
                                    </ul> */}
                                </li>
                                <li className="nav-item">
                                    {/* <a className="nav-link disabled">Disabled</a> */}

                                </li>
                            </ul>
                            <div className="d-flex" role="search">
                                <input className="form-control me-2" type="text" value={input} onChange={Handler} placeholder="Search  questions" aria-label="Search" />
                                <button className="btn btn-outline-success" onClick={Find}>Search
                                </button>
                            </div>
                        </div>
                    </div>
                </nav>
                <div style={{ margin: '10px' }}>
                    {contentPage}
                </div>
            </div>
        </>
    )
}
function List({ questions }) {

    return (
        <>
            <div className='row ' style={{ margin: '20px' }}>
                <h2 className='fw-bolder'>Related  Questions</h2>
                {questions.map((item, index) => {
                    return (
                        <div key={index} className='col-4 flex-wrap'>
                            <hr />
                            <div>
                                <Link style={{
                                    fontFamily: 'sans-serif', fontWeight: 'bolder'
                                }} to={`/createanswer/${item.question_martic}/${item.ptitle}/${item.id}`}>{item.ptitle}  </Link>
                                <br />
                                <p className='mt-3'>
                                    {item.problem_descritpion}
                                </p>
                                <h4>Question on   <span>{item.language_category}</span></h4>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}
export default Navbar;