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
    console.log("CATEGORYID : " + categoryId)
    return new Promise(function(resolve, reject){
        axios.get('http://127.0.0.1:4000/expense', {params: {categoryId}, ...config})
        .then(result => {
            const data = []
            console.log(result.data.data)
            result.data.data.map(expense => (data.push(expense)))
            resolve(data)
        })
        .catch(err => {
            console.log("WWWWWKSJDFKDFKMEKEGFKEG")
            const errorData = err.response
            console.log(err)
            reject(errorData);
        })
    }
)}