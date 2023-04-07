import { Link, Outlet, Form } from "react-router-dom";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.min.js'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import topics from './topics'
// axios,k,a ,l
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
// import  Button  from '@mui/material/Button';




function FormCompponent() {
    var notyf = new Notyf();
    const [topic, setTopic] = useState([]);
    const [error, setError] = useState([])
    const [inputError, setInputError] = useState(false);
    const handletoplic = (e) => {
        setTopic(e.target.value)
        console.log(e.target.value)
    }
    const [inputs, setInput] = useState({
        title: '',
        email: '',
        phone: '',
        portfolio_url: '',
        language_category: '',
        problem_descritpion: '',
        ptitle: ''
    })
    const inputsHandler = (e) => {
        setInput({ ...inputs, [e.target.name]: e.target.value });
    }
    const [file, setFile] = useState(null)

    const getFile = (e) => {
        setFile(e.target.files[0])
    }

    const postData = (e) => {
        e.preventDefault()
        const form = new FormData()
        const question_martic = Math.floor(Math.random() * 1000)


        form.append('question_martic', question_martic);
        form.append('name', inputs.name);
        form.append('portfolio_url', inputs.portfolio_url);
        form.append('problem_descritpion', inputs.problem_descritpion);
        form.append('problem_title', inputs.title)
        form.append('images', file);
        form.append('language_category', topic)
        form.append('phone', inputs.phone)
        axios.post('/api/codardeveloper', form, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }).then((data) => {
            if (data.data.status === 200) {
                notyf.success('SUCCESSFULLY ADDED...............');
                console.log('enterd well done')
                // history.push(`/showpage/${input.tilte}`)


            } else if (data.data.status === 422) {
                setError(data.data.errors)
                console.log('fill this space')
            }
        })
    }
    return (
        <>
            <div className="" style={{ marginTop: '50px' }}>

                <form
                    onSubmit={postData}
                    className="container "
                    method="post"
                    style={{ marginBottom: '200px' }}
                >
                   
                    <div className=" mb-3 mt-4" >
                        <label className="fw-bolder p-1">
                            Title
                        </label>
                        <span className=" text-xs fw-bolder ">Be specific and imagine you’re asking a question to another person.</span>
                        <input
                            type="text"
                            name="title"
                            value={inputs.title}
                            onChange={inputsHandler}
                            className="form-control "
                            placeholder="e.g. What is a JavaScript function"
                        />
                        <span className="bg-red-100 font-medium">{error.problem_title}</span>
                    </div>

                    <div className="m-b mt-4">
                        <label className=" fw-bolder  text-2xl font-semibold">
                            What are the details of your problem?
                        </label>
                        <span className=" text-xs fw-bolder ">Introduce the problem and expand on what you put in the title. Minimum 20 characters.</span>
                        <textarea
                            value={inputs.problem_descritpion}
                            onChange={inputsHandler}
                            type="text"
                            name="problem_descritpion"
                            className="form-control"
                            placeholder="Describe the problem you're having"
                        />
                        <span className="bg-red-100 font-medium">{error.problem_descritpion}</span>
                    </div>

                    <div className="mb-3 mt-4">
                        <label className=" fw-bolder  text-2xl font-semibold">
                            Upload a screenshot of the problem
                        </label>
                        <input
                            type="file"
                            onChange={getFile}
                            name="file"
                            className="form-control "
                        />
                        <span className="bg-red-100 font-medium">{error.images}</span>
                    </div>

                    <div className="fw-bolder  mt-4">
                        <label>
                            Programming Language
                        </label>
                    </div>
                    <select className="form-control" onChange={handletoplic}>

                        <option >Select the problem's Programming language</option>
                        {topics.map((item, index) => {
                            return (
                                <option key={index} value={item}>{item}</option>
                            )
                        })}
                    </select>
                    <div>
                        <span className="bg-red-100 font-medium">{error.language_category}</span>
                    </div>

                    <div className="mb-4 mt-4">
                        <label className="fw-bolder  text-2xl font-semibold">
                            Input Porfolio URL
                        </label>
                        <input
                            onChange={inputsHandler}
                            type="text"
                            value={inputs.portfolio_url}
                            name="portfolio_url"
                            className="form-control "
                            placeholder="https://github/mike/Portfolio.com"
                        />
                        <span className="text-danger">{error.portfolio_url}</span>
                    </div>


                    <button
                        style={{ marginBottom: '50px' }}
                        className="btn btn-dark mt-4 ml-4 "
                        type="submit">   Post  </button>
                    <br />  <br />  <br />  <br />
                </form>


            </div>

        </>
    )
}

export default FormCompponent;