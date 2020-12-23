if(process.env.NODE_ENV === "production"){
    module.exports = {
        DataBaseURI: process.env.DATABASE_URI
    }
}else{
    module.exports = require("./dev")
}