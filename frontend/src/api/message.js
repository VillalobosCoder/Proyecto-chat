import axios from "./axios";

export const sendMsg = (currentUser, currentChat) =>
  axios.post("/addmsg", {
    from: currentUser._id,
    to: currentChat._id
  });

  export const getAllMessages = (currentUser, currentChat, msg) => {
    try {
      axios.post("/getmsg", {
        from: currentUser._id,
        to: currentChat._id,
        message: msg
    })
    } catch (error) {
      console(error, "valimoverga")
    }

  }
