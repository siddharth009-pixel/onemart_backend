const express=require('express')
const app=express()
const _env=require('dotenv')
const bodyParser=require('body-parser')
const mongoose=require('mongoose')
const userRoutes=require('./src/routes/user')
const adminRoutes=require('./src/routes/admin/user')
const categoryRoutes=require('./src/routes/category')
const productRoutes=require('./src/routes/product')
const cartRoutes=require('./src/routes/cart')
const initialDataRoutes=require('./src/routes/admin/initialData')
const pageRoutes=require('./src/routes/admin/page')
const addressRoutes=require('./src/routes/address')
const orderRoutes=require('./src/routes/order')
const adminOrderRoutes=require('./src/routes/admin/order')
// const { requiredSignIn } = require('./common-middleware')
const path=require('path')
const fs = require('fs').promises;
const cors=require('cors')
_env.config();

mongoose
  .connect(

`    mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASSWORD}@cluster0.yeyo4.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`,
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

// mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASSWORD}@cluster0.yeyo4.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority


app.use(cors())
app.use(express.json())
app.use('/public',express.static(path.join(__dirname,'uploads')))
app.use('/api',initialDataRoutes);
app.use('/api',userRoutes);
app.use('/api',adminRoutes)
app.use('/api',categoryRoutes)
app.use('/api',productRoutes)
app.use('/api',cartRoutes)
app.use('/api',pageRoutes)
app.use('/api',addressRoutes)
app.use('/api',orderRoutes)
app.use('/api',adminOrderRoutes)

app.get('/api',(req,res)=>{
    
    console.log("you are signed in")
    res.send("you are logged in")
})


app.listen(process.env.PORT||2000,`${process.env.IPADDRESS}`||`localhost`,()=>{
    console.log(`server running pn port number http://${process.env.IPADDRESS}:${process.env.port}`)
})

