const mongoose = require("mongoose");

function connect(callback) {
    let connectionString = "mongodb+srv://web4200:de53zYlMC2bg5lHh@cluster0.8fyqb.mongodb.net/forum?retryWrites=true&w=majority";
    console.log("connecting to db..");

    mongoose
        .connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .catch((err) => {
            console.log("There was an error connecting", err);
        });
    mongoose.connection.once("open", callback);
}

module.exports = connect;