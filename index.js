const express = require('express')
const app = express();

app.get('/',(req,res)=>{
    res.send("Hello World");
});


const PORT = 3000;

// Make the server listen on the 3000 port
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});


