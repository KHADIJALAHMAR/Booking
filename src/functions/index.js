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
        console.log(splitedErr);
        if(index === 0) {
            errorsObject = {
                [splitedErr[1]] : splitedErr[2]
            };
        }else {
            errorsObject = {
                [splitedErr[0]] : splitedErr[1]
            };
        }     
    });
    res.status(200).json({errorobject});
}

module.exports = {
    returnErrorAsResponse,
    returnMessageAsResponse,
    returnRegisterError
}