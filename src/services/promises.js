import axios from "axios"

export const fetchCategory = (token) =>{
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    return new Promise(function(resolve, reject){
        axios.get('http://127.0.0.1:4000/expense/category/', config)
        .then(result => {
            const data = []
            result.data.map(category => (data.push(category.category)))
            resolve(data)
        })
        .catch(err => {
            reject(Error(err.response.data));
        })
    }
)}

export const fetchExpense = (token, categoryId) =>{
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    return new Promise(function(resolve, reject){
        axios.get('http://127.0.0.1:4000/expense', {params: {categoryId}, ...config})
        .then(result => {
            const data = []
            result.data.data.map(expense => (data.push(expense)))
            resolve(data)
        })
        .catch(err => {
            const errorData = err.response
            reject(errorData);
        })
    }
)}

export function sleep(milliSeconds){
    var startTime = new Date().getTime();                    // get the current time
    while (new Date().getTime() < startTime + milliSeconds); // hog cpu until time's up
}