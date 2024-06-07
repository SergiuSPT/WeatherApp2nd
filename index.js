import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "http://api.weatherapi.com/v1/forecast.json";
const key = "5f857c804e30492a873103739243005";

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
let h1var;
let detailsFlag = 0;
let location;
let days;
app.get("/", (req, res) => {
    h1var = "Insert the city you want to see the weather for and for how many days...";
    res.render("index.ejs", {
        h1: h1var,
    });
});

app.post("/submit", async (req, res) => {
    try{
        h1var = "Here is your forecast";
        location = req.body["location"];
        days = req.body["days"];
        
        const response = await axios.get(API_URL + `?key=${key}&q=${location}&days=${days}`);
        let result = response.data;
        console.log(result);
        res.render("index.ejs", {
            h1: h1var,
            location: location,
            days: days,
            weather: result,
        });
    }catch(error){
        console.error("Failed to make request:", error.message);
        res.render("index.ejs",{
            error:"No activities that match your criteria.",
        });
    }

});

app.post("/details" , async (req, res) =>{
    try{
        detailsFlag = 1;
        h1var = "Here is your forecast";
        const response = await axios.get(API_URL + `?key=${key}&q=${location}&days=${days}`);
        let result = response.data;
        console.log(result);
        res.render("index.ejs", {
            h1: h1var,
            location: location,
            days: days,
            weather: result,
        });
    }catch(error){
        console.error("Failed to make request:", error.message);
        res.render("index.ejs",{
            error:"No activities that match your criteria.",
        });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}...`);
});