const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app=express();

app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
    res.sendFile(__dirname+ "/index.html");
})

app.post("/",function(req,res){
    // console.log(req.body.cityname);//input cityname is show in terminal 
    const query =req.body.cityname;
    const apikey="e5c0e58706ee1320e78d83671f3a5ebb#";
    const units="metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&units="+units+"&appid="+apikey;
    // change path of "geo/1.0/ddi" extra 'd' can add in path than stutscode is '404' genrate because path does not existuytyuhjjhgthjk
    // const url="https://api.openweathermap.org/geo/1.0/ddirect?q=London&limit=5&units=metric&appid=e5c0e58706ee1320e78d83671f3a5ebb#";
    // 'appid=ae5c0e58' in 'a' extra add than genrate statuscode is '401' mean unauthorized http request
    // const url="https://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&units=metric&appid=ae5c0e58706ee1320e78d83671f3a5ebb#";
    https.get(url,function(response){
        // http status code refrence mdn doc https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
        console.log(response.statusCode);

        
        response.on("data",function(data){
            // console.log(data);//this is hexa decimal code of data refrence website to check https://cryptii.com/
            const wetherData=JSON.parse(data);
            // console.log(wetherData);//data of wether api to nodejs like data of content
            // const object={
            //     name:"vishal",
            //     FavouriteFood:"dhosa"
            // }
            // console.log(JSON.stringify(object));//creat like json file mean all element are string 
            const temp=wetherData.main.temp;//main.temp path is selected form chrome extention json viewer pro
            // console.log(temp);
            const discription=wetherData.weather[0].description;//weather[0].description path is selected form chrome extention json viewer pro
            const icon=wetherData.weather[0].icon;//wetherData[0].icon path is selected form chrome extention json viewer pro
            const imageUrl= "http://openweathermap.org/img/wn/"+icon+"@2x.png"; //this url is copy from website https://openweathermap.org/weather-conditions //"10d" to conver our icon image url 

            // multiple add line of html content than use write() not use send() method 
            res.write("<p>The wether is currently "+discription+"<p>");
            res.write("<h1>The temprature in "+query+" is "+temp+" degress Celcius.</h1>");
            res.write("<img src="+imageUrl+">");
            res.send();
        })
    });
    // res.send("Server is Up and Running .");
})



app.listen(3000,function(){
    console.log("Server is running on 3000 port");
})