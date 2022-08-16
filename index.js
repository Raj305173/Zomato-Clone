require("dotenv").config();
//Libraries
import express from "express";
import cors from "cors";
import helmet from "helmet";
//microservice routes
import Auth from "./apiauth";

const zomato =express();

//config
import googleAuthConfig from "./config/google.config"; 

//database connection
import ConnectDB from "./database/connection";
import passport, { Passport } from "passport";



//application middlewares

zomato.use(express.json());
zomato.use(express.urlencoded({extended:false}));
zomato.use(helmet());
zomato.use(cors());
zomato.use(passport.initialize());
zomato.use(passport.session());
//passport Configuration
googleAuthConfig(passport);
//application Routes

zomato.use("/auth",Auth)


zomato.get("/",(req,res)=>{ res.json({message:"Setup Success"});});
zomato.listen(4000,()=> {ConnectDB().then(()=> console.log("Server is Running")).catch((err)=>console.log(err));});
