"use strict";(()=>{var e={};e.id=880,e.ids=[880],e.modules={671:(e,t)=>{Object.defineProperty(t,"M",{enumerable:!0,get:function(){return function e(t,r){return r in t?t[r]:"then"in t&&"function"==typeof t.then?t.then(t=>e(t,r)):"function"==typeof t&&"default"===r?t:void 0}}})},4877:(e,t,r)=>{r.a(e,async(e,n)=>{try{r.r(t),r.d(t,{config:()=>l,default:()=>d,routeModule:()=>c});var o=r(816),s=r(9455),a=r(671),i=r(3764),u=e([i]);i=(u.then?(await u)():u)[0];let d=(0,a.M)(i,"default"),l=(0,a.M)(i,"config"),c=new o.PagesAPIRouteModule({definition:{kind:s.A.PAGES_API,page:"/api",pathname:"/api",bundlePath:"",filename:""},userland:i});n()}catch(e){n(e)}})},2806:(e,t,r)=>{r.d(t,{A:()=>a});var n=r(6037),o=r.n(n);let s=new(o()).Schema({userId:{type:String,required:!0,unique:!0},timezone:{type:String,required:!0},trackingCategories:{type:[String],required:!0},setupCompleted:{type:Boolean,default:!1},setupTimestamp:{type:Date,default:Date.now}}),a=o().models.SetupNote||o().model("SetupNote",s)},6643:(e,t,r)=>{r.d(t,{A:()=>u});var n=r(718),o=r(6037),s=r.n(o);let a=new(s()).Schema({userId:{type:String,required:!0},gptResponse:{type:String,required:!0},createdAt:{type:Date,default:Date.now}}),i=s().models.Timestamp||s().model("Timestamp",a);async function u(e,t){if("POST"!==e.method)return t.status(405).json({error:"Method not allowed"});let{userId:r,gptResponse:o}=e.body;if(!r||!o)return t.status(400).json({error:"Missing required fields"});try{await (0,n.connectToDatabase)();let e=new i({userId:r,gptResponse:o,timestamp:new Date});await e.save(),t.status(201).json({message:"Timestamp logged successfully",timestamp:e})}catch(e){console.error("Error in addTimestamp:",e),t.status(500).json({error:"Internal Server Error"})}}},5311:(e,t,r)=>{r.d(t,{A:()=>s});var n=r(718),o=r(2806);async function s(e,t){if("GET"!==e.method)return t.status(405).json({error:"Method not allowed"});let{userId:r}=e.query;if(!r)return t.status(400).json({error:"Missing userId parameter"});try{await (0,n.connectToDatabase)();let e=await o.A.findOne({userId:r});e?t.status(200).json(e):t.status(404).json({error:"Setup Note not found"})}catch(e){console.error("Error in getSetupNote:",e),t.status(500).json({error:"Internal Server Error"})}}},3764:(e,t,r)=>{r.a(e,async(e,n)=>{try{r.r(t),r.d(t,{default:()=>c});var o=r(6404),s=r(9493),a=r(5311),i=r(104),u=r(6643),d=e([o]);o=(d.then?(await d)():d)[0];let l=(0,o.createRouter)();l.use((e,t,r)=>{if("GET"!==e.method&&"application/json"!==e.headers["content-type"])return t.status(400).json({error:"Invalid content type. Use application/json."});r()}),l.use("/setup",s.A),l.use("/getSetupNote",a.A),l.use("/insertNote",i.A),l.use("/addTimestamp",u.A),l.get("/",(e,t)=>{t.status(200).json({message:"Welcome to the Jarvis API!"})}),l.all("*",(e,t)=>{t.status(404).json({error:"Route not found."})});let c=l.handler();n()}catch(e){n(e)}})},104:(e,t,r)=>{r.d(t,{A:()=>u});var n=r(718),o=r(6037),s=r.n(o);let a=new(s()).Schema({userId:{type:String,required:!0},title:{type:String,required:!0},content:{type:String,required:!0},createdAt:{type:Date,default:Date.now}}),i=s().models.Note||s().model("Note",a);async function u(e,t){if("POST"!==e.method)return t.status(405).json({error:"Method not allowed"});let{userId:r,content:o}=e.body;if(!r||!o)return t.status(400).json({error:"Missing required fields"});try{await (0,n.connectToDatabase)();let e=new i({userId:r,content:o,createdAt:new Date});await e.save(),t.status(201).json({message:"Note saved successfully",note:e})}catch(e){console.error("Error in insertNote:",e),t.status(500).json({error:"Internal Server Error"})}}},9493:(e,t,r)=>{r.d(t,{A:()=>s});var n=r(718),o=r(2806);async function s(e,t){if("POST"!==e.method)return t.status(405).json({error:"Method not allowed"});let{userId:r,timezone:s,trackingCategories:a}=e.body;if(!r||!s||!a)return t.status(400).json({error:"Missing required fields"});try{await (0,n.connectToDatabase)();let e=await o.A.updateOne({userId:r},{$set:{timezone:s,trackingCategories:a,setupCompleted:!0,setupTimestamp:new Date}},{upsert:!0});t.status(200).json({success:!0,result:e})}catch(e){console.error("Error in setup:",e),t.status(500).json({error:"Internal Server Error"})}}},718:(e,t,r)=>{if(r(6037),!process.env.MONGODB_URI)throw Error("Please define the MONGODB_URI environment variable inside .env");let n=global.mongoose;n||(n=global.mongoose={conn:null,promise:null})},9455:(e,t)=>{var r;Object.defineProperty(t,"A",{enumerable:!0,get:function(){return r}}),function(e){e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE",e.IMAGE="IMAGE"}(r||(r={}))},816:(e,t,r)=>{e.exports=r(5600)},6037:e=>{e.exports=require("mongoose")},5600:e=>{e.exports=require("next/dist/compiled/next-server/pages-api.runtime.prod.js")},6404:e=>{e.exports=import("next-connect")}};var t=require("../webpack-runtime.js");t.C(e);var r=t(t.s=4877);module.exports=r})();