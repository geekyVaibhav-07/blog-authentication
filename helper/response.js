class Response {
    constructor(responseData) {
        const {
            status = 1,
            message = '',
            data = [],
            actions = [],
            err = '',
            stack = '',
            devResponse = ''
        } = responseData;
        this.timeStamp = (new Date()).getTime();
        this.status = status;
        this.message = message;
        this.data = data;
        if (Array.isArray(actions) && actions.length > 0) {
            this.actions = actions;
        }
        if (err) {
            this.err =  err;
        }
        if (stack) {
            this.stack = stack
        }
        if (process.env.NODE_ENV.toLowerCase() === 'development') {
            this.devResponse = devResponse
        }
    }
}

module.exports = Response;