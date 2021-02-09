const express =require('express');
const path=require('path');
const handlebars=require('express-handlebars');
const axios=require('axios');
const app=express();
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers','Content-Type');
    next();
});

app.set('views',path.join(__dirname,'/views/'));
app.engine('hbs',handlebars({extname:'hbs',defaultLayout:'index',layoutsDir:__dirname + '/views/layouts/'}));
app.set('view engine','hbs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.get("/",(req,res)=>{
        axios.get(process.env.API_URL || "https://api.wazirx.com/api/v2/tickers")
        .then((response)=>{
                console.log(Object.keys(response)[5]);
                console.log(response.data);
            res.render("table/table",{
                title:"Hello Tanveer",
                result:response.data
            })
        }).catch((err)=>{   
            res.render("table/error",{
                error:"Cannot get the Data from API"
            })
            console.log("Error :",err );
        })
})
const PORT=3000 || process.env.PORT;
app.listen(PORT,()=>{
    console.log(`Server started at port ${PORT}`);
})