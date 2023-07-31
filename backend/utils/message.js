const moment = require("moment");

const fmessage = (username,text)=>{
    return {
        username,
        text,
        time:moment().format("h:mm a")
    }
}

module.exports = {
    fmessage
}