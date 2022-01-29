const returnErrorAsResponse = (res,error) => {
    res.status(400).json({error});
}

const returnMessageAsResponse = (res,message) => {
    res.status(200).json({message});
}

module.exports = {
    returnErrorAsResponse,
    returnMessageAsResponse
}