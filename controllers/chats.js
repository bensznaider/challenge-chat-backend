const OpenAI = require("openai");
require("dotenv").config();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const { Chats, Messages } = require("../db/models/index.js");

const getChatsByUser = async (req, res) => {
  try {
    let chats = [];
    const allChatsByUser = await Chats.findAll({
      where: { userId: req.params.userid },
    });
    await Promise.all(allChatsByUser.map(async (chat) => {
      const allMessages = await Messages.findAll({where: { chatId: chat.dataValues.id }})
      let messages = []
      allMessages.map((message)=>{messages.push(message.dataValues)})
      chats.push({ name: chat.dataValues.name, id:chat.dataValues.id, messages: messages});
    }));
    res.send(chats);
  } catch (error) {
    res.status(404).send(error);
  }
};

const createChat = async (req, res) => {
  try {
    const possibleChat = await Chats.findOne({
      where: { name: req.body.name, userId: req.body.userId },
    });
    if (possibleChat) {
      return res
        .status(409)
        .send(
          `A chat with that name already exists, please choose another one.`
        );
    }
    await Chats.create(req.body);
    res.sendStatus(200);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

const addMessage = async (req, res) => {
  try {
    let messages = [];
    const completeChat = await Messages.findAll({
      where: { userId: req.body.userId, chatId: req.body.chatId },
    });
    completeChat.map((message) => {
      let messageForAPI = {};
      message.dataValues.isMessageFromUser
        ? (messageForAPI.role = "user")
        : (messageForAPI.role = "assistant");
      messageForAPI.content = message.dataValues.message;
      messages.push(messageForAPI);
    });
    messages.push({ role: "user", content: req.body.message });
    await Messages.create({
      isMessageFromUser: req.body.isMessageFromUser,
      message: req.body.message,
      userId: req.body.userId,
      chatId: req.body.chatId,
    });
    const completion = await openai.chat.completions.create({
      messages: messages,
      model: "gpt-4o-mini",
    });
    await Messages.create({
      isMessageFromUser: false,
      message: completion.choices[0].message.content,
      userId: req.body.userId,
      chatId: req.body.chatId,
    });
    res.status(201).send(completion.choices[0].message.content);
  } catch (error) {
    res.status(404).send(error);
  }
};

const deleteChat = async (req, res) => {
  try {
    const chatToDelete = await Chats.findOne({
      where: {
        id: req.body.id,
        userId: req.body.userId,
      },
    });
    if (chatToDelete) {
      await chatToDelete.destroy();
      res.sendStatus(200);
    } else if (!chatToDelete) {
      res
        .status(409)
        .send("The chat doesn't belong to the user or doesn't exist.");
    }
  } catch (error) {
    res.status(404).send(error);
  }
};

module.exports = {
  getChatsByUser,
  createChat,
  addMessage,
  deleteChat,
};
