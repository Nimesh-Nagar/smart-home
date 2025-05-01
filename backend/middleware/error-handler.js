export const errorHandlerMiddleware = async (err, req, res, next) =>{
    console.log(err)
    return res.status(500).json( {msg : 'Somthing went Worng, Please try again after sometime. '})
}


// 500 - Internal server error