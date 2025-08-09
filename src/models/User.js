const mongoose= resquire('mongoose');

const userSechema = new mongoose.Sechema({
    name :{type:String ,required:true,},
    email:{type:String ,required:true,unique:true},
    role:{type:String, enum:['student','professor'],required:true,default:'student'},
    passwordHash:{type:String,required:true}
},{timeStamps:true}); 

module.exports= mongoose.model('User',userSechema)