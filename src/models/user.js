const mongoose=require('mongoose')
const bcrypt=require('bcrypt')

const userSchema=new mongoose.Schema({
    firstname:{
        type:String,
        require:true,
        trim:true,
        min:3,
        max:20
    },
    lastname:{
        type:String,
        require:true,
        trim:true,
        min:3,
        max:20
    },
    username:{
        type:String,
        require:true,
        trim:true,
        lowercase:true,
        unique:true,
        index:true
    },
    email:{
        type:String,
        require:true,
        unique:true,
        trim:true,
        lowercase:true
    },
    hash_password:{
        type:String,
        require:true
    },
    role:{
        type:String,
        enum:['admin','user'],  
        default:'user'
    },
    contactNumber:{
        type:String
    },
    profilePicture:{
        type:String
    },
},{timestamps:true})

// userSchema.virtual('password')
// .set(function(password){
//     this.hash_password=bcrypt.hashSync(password,10);
// })

userSchema.virtual('fullname')
.set(function(firstname,lastname){
    return `${firstname} ${lastname}`
})

userSchema.methods={
    authenticate:async function(password){
        return await bcrypt.compare(password,this.hash_password);
    }
}



const userModel=mongoose.model('user',userSchema)

module.exports=userModel;