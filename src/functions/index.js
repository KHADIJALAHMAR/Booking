const returnErrorAsResponse = (res,error) => {
    res.status(400).json({error});
}

const returnMessageAsResponse = (res,message) => {
    res.status(200).json({message});
}

const returnRegisterError = (res,message) => {
    const errors = message.split(',');
    let errorsObject = {}
    
    errors.forEach((error, index) => {
        let splitedErr = error.split(':');
        if(index === 0) {
            errorsObject[splitedErr[1].trim()] = splitedErr[2].trim();
        }else {
            errorsObject[splitedErr[0].trim()] = splitedErr[1].trim();
        }     
    });

    res.status(200).json({errorsObject});
}

module.exports = {
    returnErrorAsResponse,
    returnMessageAsResponse,
    returnRegisterError
}