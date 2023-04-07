import React, { useEffect, useState } from 'react'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/dist/js/bootstrap';
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from 'axios';
import { Link } from 'react-router-dom';
//this is lastest q
import { useLoaderData } from 'react-router-dom';

function AllQ() {
    return (
        <>
            <List />


        </>
    )
}

export default AllQ;
function List() {
    const questions = useLoaderData()
    return (
        <>
            <div className='row ' style={{ margin: '20px' }}>
                <h2 className='fw-bolder'>All Questions</h2>
                {questions.map((item, index) => {
                    return (
                        <div key={index} className='col-4 flex-wrap'>
                            <hr />
                            <div>
                                <Link style={{
                                    fontFamily: 'sans-serif', fontWeight: 'bolder'
                                }} to={`/createanswer/${item.question}/${item.problem_title}/${item.ids}`}>{item.problem_title}  </Link>
                                <br />
                                <p className='mt-3'>
                                    {/* {item.ptitle} */}
                                    {item.problem_note}
                                </p>
                                <h4>Question on   <span>{item.language}</span></h4>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}


// loader function ......................
export const questionLoader = async () => {
    const res = await axios('https://codarnetwork.online/api/getquestions');
    if (res.status === 200) {
        const data = await res.data.data
        return data
    }

}
