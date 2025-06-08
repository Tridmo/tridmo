import { useEffect } from "react";

import { useSocketContext } from "../context/socket";

// import notificationSound from "../assets/sounds/notification.mp3";
import { useDispatch, useSelector } from "react-redux";
import { selectSelectedConversation } from "../data/chat";
import { selectAllChatConversations, setChatConversations } from "../data/get_chat_conversations";
import { selectChatMessages, setChatMessages } from "../data/get_chat_messages";
import { chatApi } from "../utils/axios";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const dispatch = useDispatch()
  const messages = useSelector(selectChatMessages)
  const conversations = useSelector(selectAllChatConversations)
  const selectedConversation = useSelector(selectSelectedConversation)

  useEffect(() => {
    socket?.on("newMessage", (msg) => {
      msg.shouldShake = true;
      // const sound = new Audio(notificationSound);
      // sound.play();
      dispatch(setChatMessages([...(messages ? messages : []), msg]))
      let arr = [...(conversations ? conversations : [])]
      const conversation = arr.find(e => e.id == msg?.conversation_id)

      chatApi.put(`/messages/mark/${conversation?.id}`)
        .then(res => {
          if (!!res?.data?.success) {
            arr.splice(arr[arr.indexOf(conversation)], 1)
            arr = [{
              ...conversation,
              unread_count: conversation?.id == selectedConversation?.id ? 0 : Number(conversation?.unread_count) + 1,
            }, ...arr]
            dispatch(setChatConversations(arr))
          }
        })
        .catch(err => {
          console.log(err);
        })
    });

    return () => socket?.off("newMessage");
  }, [socket, setChatMessages, messages]);
};
export default useListenMessages;