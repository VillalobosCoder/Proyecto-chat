import Messages from "../models/message_model.js";

export const addMessage = async (req, res) => {
  try {
    const { from, to, message } = req.body;
    const data = await Messages.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });

    if (data) {
      return res.json({
        msg: "Mensaje enviado",
      });
    }

    return res.json({
      msg: "Error al enviar el mensaje",
    });
  } catch (error) {
    console.log(error);
  }
};



export const getAllMessages = async (req, res) => {
    try {
        const { from, to } = req.body;
        const messages = await Messages.find({
            users: { $all: [from, to] },
        }).sort({ updateAt: 1 });

        const projectMessages = messages.map((message) => {
            return {
                fromSelf: message.sender.toString() === from,
                message: message.message.text,
            }
        });
        res.json(projectMessages);
    } catch (error) {
        console.log(error);
    }
}
