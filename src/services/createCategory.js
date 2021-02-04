import axios from "axios";

export async function createCategory(category){
    axios.post('http://127.0.0.1:4000/expense/category/', category)
    .then(result => {
        console.log("___________REQUEST___________")
        console.log(result.data)
        return result;
    })
    .catch(err => {
        console.log("___________REQUEST_ERROR___________")
        console.log(err.response.data)
        // return (err.response.data)
        // if (err.response){
        //     console.log(err.response.data)
        //     return err.response.data
        //   }else if(err.request){
        //     console.log('request')
        //     console.log(err.request.data)
        //   }else if(err.message){
        //     console.log('message')
        //     console.log(err.message.data)
        //   }else{
        //     console.log(err)
        //     return err;
        //   }
        
    })
}