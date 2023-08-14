module.exports.errorHandler = function (err, req, res, next) {
    let statusCode = 0
    let error = []
    switch (err.name) {
        case "not found":
            statusCode = 404
            error.push("Data not found, please recheck id parameter")
            break;
        case "incomplete data":
            statusCode = 404
            error.push("Incomplete Data, please check and complete inputted data")
            break;
        case "incorrect value":
            statusCode = 404
            error.push(`${err.value} value must be ${err.type}`)
            break;
        case "rating error":
            statusCode = 404
            error.push(`rating value must below 10 and larger than 0`)
            break;
        case "SequelizeDatabaseError":
            statusCode = 400
            error.push("invalid input syntax")
            break;
        default:
            statusCode = 500
            error.push("Internal Server Error")
            break;
    }
    res.status(statusCode).json({error})
}