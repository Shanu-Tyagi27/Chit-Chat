const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat");
const methodOverride = require("method-override");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true })); // ye jo post form se data aayega req.body usko parse krne ke liye
app.use(methodOverride("_method"));

main()
  .then((res) => {
    console.log("connection established");
  })
  .catch((err) => {
    console.log(err);
  });
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp"); //whatsapp DB ka name hai
}

app.get("/", (req, res) => {
  res.send("Root is Working ");
});

app.listen(8080, () => {
  console.log("Server listening at port 8080");
});

//Index Route to show all chats

app.get("/chats", async (req, res) => {
  let chats = await Chat.find(); //isse sara data aa jayega
  // console.log(chats);
  res.render("index", { chats });
});

//NEW ROUTE TO ADD NEW CHAT AND RENDER A FORM
app.get("/chats/new", (req, res) => {
  res.render("new");
});

//CREATE ROUTE UPPR VALE KE LIYE POST REQ
app.post("/chats", (req, res) => {
  let { from, msg, to } = req.body;
  let newChat = new Chat({
    from: from,
    msg: msg,
    to: to,
    created_at: new Date(),
  });
  newChat
    .save()
    .then((res) => {
      console.log("chat was saved");
    })
    .catch((err) => {
      console.log(err);
    });
  res.redirect("/chats");
});

//EDIT MESSAGE VALE KA ROUTE

app.get("/chats/:id/edit", async (req, res) => {
  let { id } = req.params;
  let chat = await Chat.findById(id);
  res.render("edit", { chat });
});
//EDIT MESSAGE VALE KA PUT ROUTE

app.put("/chats/:id", async (req, res) => {
  let { id } = req.params;
  let { msg: newMsg } = req.body;
  let updatedChat = await Chat.findByIdAndUpdate(
    id,
    { msg: newMsg },
    { new: true }
  );
  console.log(updatedChat);
  res.redirect("/chats");
});

//CREATING DESTROY ROUTE

app.delete("/chats/:id",async(req,res)=>{
  let {id}= req.params;
  let deltedChat = await Chat.findByIdAndDelete(id);
  console.log(deltedChat);
  res.redirect("/chats");

})