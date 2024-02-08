const OpenAI = require("openai");
require("dotenv").config();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const { Chats } = require("../db/models/index.js");

const getChatsByUser = async (req, res) => {
  try {
    const allChatsByUser = await Chats.findAll({
      where: { userId: req.params.userid },
    });
    res.send(allChatsByUser);
  } catch (error) {
    res.status(404).send(error);
  }
};

const addMessage = async (req, res) => {
  try {
    await Chats.create({
      isMessageFromUser: true,
      message: req.body.message,
      userId: req.body.userId,
    });
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: req.body.message }],
      model: "gpt-3.5-turbo",
    });
    await Chats.create({
      isMessageFromUser: false,
      message: completion.choices[0].message.content,
      userId: req.body.userId,
    });
    res.status(201).send(completion.choices[0].message.content);
  } catch (error) {
    res.status(404).send(error);
  }
};

const deleteMessage = async (req, res) => {
  try {
    const messageToDelete = await Chats.findOne({
      where: {
        id: req.body.id,
        userId: req.body.userId,
      },
    });
    if (messageToDelete) {
      await messageToDelete.destroy();
      res.sendStatus(200);
    } else if (!messageToDelete) {
      res.status(409).send("The message doesn't belong to the user chat or doesn't exist.");
    }
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
};

module.exports = {
  getChatsByUser,
  addMessage,
  deleteMessage,
};