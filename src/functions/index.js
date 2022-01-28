const returnErrorAsResponse = (res,error) => {
    res.status(400).json({error});
}

module.exports = {
    returnErrorAsResponse
}