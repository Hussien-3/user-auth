class AppError extends Error  {
    constructor () {
        super();
    }

    create(statusText, statusCode, message) {
        this.statusText = statusText
        this.statusCode = statusCode
        this.message= message

        return this
    }
}

module.exports = new AppError