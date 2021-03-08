import jwt from 'jsonwebtoken'

const token = localStorage.getItem('etrackertoken')
export const protectRouted =  () => {
    return new Promise(async function(resolve, reject){
          if (token) {
              
            const decoded = await verifyToken(token)
            const exp = decoded.exp;
            if (Date.now() >= exp * 1000) reject(Error(false));
            resolve(true)
          }else{
              reject(false)
          }
    })
  }
  
export const logOut = () => {
    localStorage.removeItem('etrackertoken');
    window.location.href = '/login'
}
export const verifyToken = async (token) => {
    const secret = process.env.REACT_APP_SECRET_KEY;
    const decoded = jwt.verify(token, secret);
    return decoded;
}

export const checkToken = () => {
  if(token){
    return true
  }else{
    return false
  }
}