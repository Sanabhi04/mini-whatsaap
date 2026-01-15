const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const chat = require("./models/chat.js");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");


app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));


main()
.then(() => {console.log("Connection Succesfull");

})
.catch(err => console.log(err));


async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');

}

// Index Route
app.get("/chats",async (req, res) => {
    let chats = await chat.find();
    // console.log(chats);
    res.render("index.ejs",{ chats });

});

// NEW Route
app.get("/chats/new", (req , res )=> {

    res.render("new.ejs");
})

// Create A Route
app.post("/chats", (req, res) => {
    let { from, to, msg } = req.body;

    let newChat = new chat({
        from,
        to,
        msg,
        created_at: new Date()
    });

    newChat
        .save()
        .then(() => {
            console.log("Chat Was Saved");
            res.redirect("/chats");
        })
        .catch(err => {
            console.log(err);
            res.status(500).send("Error saving chat");
        });
});

// Edit Route
app.get("/chats/:id/edit",async (req, res)=> {
    let {id} = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs",{ chat });
});

// UPDATE ROUTE
app.put("/chats/:id",async(req, res) => {
    let {id} = req.params;
    let {msg:newMsg} = req.body;
    console.log(newMsg);
    let updatedChat = await chat.findByIdAndUpdate(
        id,
        { msg: newMsg },
        {runValidators : true, new: true}
    );

    console.log(updatedChat);
    res.redirect("/chats");
});

//DESTROY ROUTE
app.delete("/chats/:id", async (req, res)=>{
    let{ id } = req.params;
    let DeletedChat = await Chat.findByIdAndDelete(id);
    console.log(DeletedChat);
    res.redirect("/chats");
});

app.get("/",(req, res)=>
{
    res.send("Root Is Working");
});


app.listen(8080, () => {
    console.log("Server is Listeing on Port 8080")
});