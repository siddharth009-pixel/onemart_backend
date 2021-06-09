const express=require('express')
const app=express()
const _env=require('dotenv')
const bodyParser=require('body-parser')
const mongoose=require('mongoose')
const userRoutes=require('./routes/user')
const adminRoutes=require('./routes/admin/user')
const categoryRoutes=require('./routes/category')
const productRoutes=require('./routes/product')
const cartRoutes=require('./routes/cart')
const initialDataRoutes=require('./routes/admin/initialData')
// const { requiredSignIn } = require('./common-middleware')
const path=require('path')
const cors=require('cors')

_env.config();

mongoose
  .connect(
    `mongodb://localhost:27017/onemart`,
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

//mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASSWORD}@cluster0.yeyo4.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority


app.use(cors())
app.use(express.json())
app.use('/public',express.static(path.join(__dirname,'uploads')))
app.use('/api',initialDataRoutes);
app.use('/api',userRoutes);
app.use('/api',adminRoutes)
app.use('/api',categoryRoutes)
app.use('/api',productRoutes)
app.use('/api',cartRoutes)

// app.get('/api/check',requiredSignIn,(req,res)=>{
    
//     console.log("you are signed in")
//     res.send("you are logged in")
// })


app.listen(process.env.PORT,()=>{
    console.log(`server running pn port number ${process.env.PORT}`)
})

