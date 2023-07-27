const mongoose = require("mongoose");
// const mongoURI = "mongodb+srv://web_developer:mern1234@cluster0.l6hcir2.mongodb.net/gofood?retryWrites=true&w=majority"
const mongoURI = "mongodb://web_developer:mern1234@ac-xpbq0z0-shard-00-00.l6hcir2.mongodb.net:27017,ac-xpbq0z0-shard-00-01.l6hcir2.mongodb.net:27017,ac-xpbq0z0-shard-00-02.l6hcir2.mongodb.net:27017/gofood?ssl=true&replicaSet=atlas-14bxk3-shard-0&authSource=admin&retryWrites=true&w=majority"
const mongoDB = async () => {
    await mongoose.connect(mongoURI, { useNewUrlParser: true }, async (err, result) => {
        if (err)
            console.log("---", err)

        else {
            console.log("connected");
            const fetched_data = await mongoose.connection.db.collection("food_item");
            fetched_data.find({}).toArray(async function (err, data) {
                const foodcategory = await mongoose.connection.db.collection("food_category");
                foodcategory.find({}).toArray(function (err, categorydata) {
                    if (err) console.log(err);
                    else {
                        global.food_items = data;
                        global.foodCategory = categorydata;
                    }
                })
            })
        }
    });
}
module.exports = mongoDB;