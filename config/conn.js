const mongoose = require('mongoose');
mongoose.Types.ObjectId.isValid('your id here');
mongoose.connect(process.env.URI, 
    { useNewUrlParser: true,
     useUnifiedTopology: true })
    .then((data) => {
        console.log(`Database connected to ${data.connection.host}`)
})
