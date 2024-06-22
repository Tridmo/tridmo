import { createContext, useState, useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import io, { Socket } from "socket.io-client";
import { selectMyProfile } from "../data/me";
import { chatBaseUrl } from "../utils/axios";

const SocketContext = createContext({});

export const useSocketContext = (): any => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const authUser = useSelector(selectMyProfile);

  useEffect(() => {
    const cleanup = () => {
      if (socket) {
        socket.close();
      }
    };

    if (authUser) {
      const socket = io(chatBaseUrl, {
        query: {
          userId: authUser.user_id,
        },
      });

      setSocket(socket);

      // socket.on() is used to listen to the events. can be used both on client and server side
      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      return cleanup;
    } else {
      cleanup();
    }
  }, [authUser]);

  return <SocketContext.Provider value={{ socket, onlineUsers }}>{children}</SocketContext.Provider>;
};