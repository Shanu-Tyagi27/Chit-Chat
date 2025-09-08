const mongoose = require("mongoose");
const Chat = require("./models/chat");

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


let allChats = [
    {
  from: "Amit",
  to: "Rohan",
  msg: "Did you complete the assignment?",
  created_at: new Date(),
},
{
  from: "Priya",
  to: "Neha",
  msg: "Yes, I will share them by evening.",
  created_at: new Date(),
},
{
  from: "Ravi",
  to: "Suman",
  msg: "Can we meet at the library tomorrow?",
  created_at: new Date(),
},
{
  from: "Karan",
  to: "Meena",
  msg: "Happy Birthday! 🎉",
  created_at: new Date(),
},
{
  from: "Anita",
  to: "Rahul",
  msg: "Don’t forget about the project meeting.",
  created_at: new Date(),
},
]

Chat.insertMany(allChats);

// Chat.findByIdAndDelete('68b998d0cfb8c4087200306f');


