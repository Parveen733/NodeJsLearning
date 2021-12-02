const successResponse = (status,msg,statusCode)=>{
   
    
    return {
        status: status ,
        message: msg,
        statusCode: statusCode,
        data: []
    };
}
const errorResponse = (status,msg,statusCode)=>{
   
    
    return {
        status: status ,
        message: msg,
        statusCode: statusCode,
        data: []
    };
}

module.exports={successResponse,errorResponse};
