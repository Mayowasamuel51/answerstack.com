import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";


function ShowPortfollo() {
    function getA() {
        return axios.get(`api/codardeveloper/portfolio_url`).then(res => res.data.data)
    }
    const { status, data, error } = useQuery({
        queryKey: ['posts'],
        queryFn: getA
    })
    if (status === 'loading') {
        return <h1 className="text-success text-center">LOADING.............</h1>
    }

    if (status === 'error') {
        return <h4 className="text-danger text-center">Error: {error.message}</h4>
    }
    return (
        <>
            <div className=" ">
            <div className="row" style={{ marginTop: '30px', margin:'20px' }}>
                <h3 className="text-center">Developers portfolio</h3>
                <List item={data} />
            </div>


           </div>
        </>
    )
}

function List({ item }) {
    return (
        <>
            {
                item.map((item, index) => {
                    return (
                        <div key={index} className="col-4 " >
                            <div className="mt-3" style={{width:'50%'}}>
                                <a className="h4" href={`${item.portfolio_url}`} style={{textDecoration: 'none', padding: '40%' }}>
                                   <h3>{item.portfolio_url}</h3> 
                                </a>
                            </div>
                        </div>
                    )
                })
            }

        </>
    )
}
export default ShowPortfollo;