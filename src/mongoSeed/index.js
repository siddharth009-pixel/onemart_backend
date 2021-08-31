const mongoose = require('mongoose');
const logicFunc = require('./functionFile');
const Sheet1 =require('./cate/hitachi')

const connectMongoose=async()=> {

    mongoose
    .connect(
      `mongodb://localhost:27017/onemartRemote`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      }
    )
    .then(() => {
      console.log("database connected");
    })
    .catch((err) => {
      console.log(err);
    });

}

connectMongoose();

setTimeout(function(){
  logicFunc(Sheet1,'612d0b46e2654965e8a4372d');
}, 2* 1000)

// console.log(Sheet1)
// logicFunc(Sheet1,'612dfe5f1a9b05831831dbef');

