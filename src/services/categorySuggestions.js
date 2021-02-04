import axios from "axios";

export async function findSuggestions(token){
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    console.log(config)
    axios.get('http://127.0.0.1:4000/expense/category/', config)
    .then(result => {
        console.log("___________REQUEST___________")
        console.log(result.data)
        let data = result.data;
        return "klk";
    })
    .catch(err => {
        console.log("___________REQUEST_ERROR___________")
        console.log(err.response.data)
        return "error"
    })
}