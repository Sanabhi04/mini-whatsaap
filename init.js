const mongoose = require("mongoose");
const Chat = require("./models/chat"); // ✅ Capital C

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
  console.log("Connection Successful");

  let allchats = [
    {
      from: "Rohan",
      to: "Abhi",
      msg: "Send me your Resume",
      created_at: new Date()
    },
    {
      from: "Rohit",
      to: "Abhi",
      msg: "Send me your Resume",
      created_at: new Date()
    },
    {
      from: "Ajay",
      to: "Abhi",
      msg: "Send me your Resume",
      created_at: new Date()
    },
    {
      from: "Vinay",
      to: "Abhi",
      msg: "Send me your Resume",
      created_at: new Date()
    }
  ];

  await Chat.insertMany(allchats);
  console.log("Chats inserted successfully");

  mongoose.connection.close();
}

main().catch(err => console.log(err));
