import axios from "axios";
import { useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import { useQuery } from "@tanstack/react-query";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/dist/js/bootstrap';
// import { getA } from "../api/get";
import moment from 'moment'
function CreateAnswer() {
    const { question, problem_title, id } = useParams();

    const main_id = id;
    const [data, setData] = useState([]);
    const [answerquestions, setanswerquestions] = useState([])
    // const answerquestions = useLoaderData()
    var notyf = new Notyf();
    const getquestions_id = question;
    const p_title = problem_title;
    const [text, setText] = useState('');
    const inputsHandler = (e) => {
        setText(e.target.value)
    }

    // const getAnswers = useQuery({
    //     queryKey: ['posts'],
    //     queryFn: getA
    // })
    const fetchPost = () => {
        axios('/api/getquestions').then((res) => {
            if (res.status === 200) {
                setData(res.data.data)
            }
        })
    }
    let myquestion_id = ''
    let questionImage;
    data.map((item) => {
        myquestion_id = item.ids
        questionImage = item.myimage
    })
    const postAnswer = (e) => {
        e.preventDefault();
        let data = {
            user_id: main_id,
            descritpion: text,
            problem_title: p_title
        }
        axios.post(`/api/codardeveloper/${getquestions_id}/${p_title}`, data).then((res) => {
            if (res.status === 200) {
                window.location.reload()
                console.log('done')
                notyf.success('SUCCESSFULLY ADDED...............');
            }
        })
    }
    const getInfo = async () => {
        axios(`/api/codardeveloper/answer/${main_id}`).then((res) => {
            if (res.status === 200) {
                const api = res.data.data
                setanswerquestions(api)
                console.log(api)
            }
        })
    }
    useEffect(() => {
        fetchPost()

    }, [])
    useEffect(() => {
        setTimeout(() => {
            getInfo()
        }, 1000)
    }, [])
    // if (getAnswers.status === 'loading') {
    //     return <h1>LOADING</h1>
    // }
    // if (getAnswers.status === 'error') {
    //     return <h1>{JSON.stringify(getAnswers.error)}</h1>
    // }
    return (
        <>
            <div className=" container">
                <div className="mt-4">
                    <h3 className="text-center">
                        {problem_title}
                    </h3>

                    <div>
                        <img src={`http://127.0.0.1:8000/storage/uploads/${questionImage}` } />
                    </div>
                </div>
                <div className=" " style={{
                    width: '90%'
                }}>
                    <Question question={answerquestions} />
                </div>

                <form className=" flex flex-col gap-y-5 w-3/4" onSubmit={postAnswer}>
                    <div className=" flex flex-col">
                        <label className="mb-3 mt-4 fw-bolder">
                            Your Answer
                        </label>

                        <textarea
                            type="text"
                            onChange={inputsHandler}
                            value={text}
                            name="title"
                            className="form-control mb-4 "
                            placeholder="e.g. What is a JavaScript function"
                        />
                        {/* <span className="bg-red-100 font-medium">{error.problem_title}</span> */}
                    </div>

                    <button
                        style={{ marginBottom: '50px' }}
                        className="btn btn-success fw-bolder"
                        type="submit">   Post Your Answer </button>
                </form>
            </div>

        </>
    )
}
function Question({ question }) {
    return (
        <>

            {
                question.map((item, index) => {
                    return (
                        <div key={index} className="mt-3" style={{
                            padding: '20px', boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px'
                        }}>

                            <div>
                                
                                <br />
                                <p>
                                    {item.descritpion}
                                </p>
                                <h4>
                                    Answered 
                                    <span className="pt-4 pl-4 h-5"> {moment(item.created_at)
                                                        .utc().format("YYYY-MM-DD")}</span>
                                </h4>
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}

export default CreateAnswer;