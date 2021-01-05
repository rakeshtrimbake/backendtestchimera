const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/chimeratest",{useNewUrlParser:true,useUnifiedTopology:false},
() => {
    console.log(`Database Connected Succefully`);
});