import axios from "axios"
export function getA() {
    return axios
        .get(`/api/codardeveloper/answer/23`).then(res => res.data.data)
}