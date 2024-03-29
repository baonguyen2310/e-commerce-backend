const StatusCode = {
    FORBIDDEN: 403,
    CONFLICT: 409
}

const ReasonStatusCode = {
    FORBIDDEN: 'Bad request error',
    CONFLICT: 'Conflict error'
}

class ErrorResponse extends Error {
    constructor({ message, statusCode }) {
        super(message)
        this.status = statusCode
    }

    send(res){
        res.status(this.status).json({
            message: this.message,
            status: this.status
        })
    }
}

class BadRequestError extends ErrorResponse {
    constructor({ message = ReasonStatusCode.FORBIDDEN, statusCode = StatusCode.FORBIDDEN }) {
        super({ message, statusCode })
    }
}

class ConflictRequestError extends ErrorResponse {
    constructor({ message = ReasonStatusCode.CONFLICT, statusCode = StatusCode.CONFLICT }) {
        super({ message, statusCode })
    }
}

module.exports = {
    BadRequestError,
    ConflictRequestError
}
