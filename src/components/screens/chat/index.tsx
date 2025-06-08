"use client";

import { Box, Grid } from '@mui/material';
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {
  getChatUnread,
  selectSelectedConversation,
  setSelectedConversation,
} from "../../../data/chat";
import { selectMyProfile } from '../../../data/me';

export default function Chat() {

  const dispatch = useDispatch<any>()
  const selectedConversation = useSelector(selectSelectedConversation)
  const selected = selectedConversation;
  const profile = useSelector(selectMyProfile)

  useEffect(() => {
    if (selected == selectedConversation) {
      setSelectedConversation(null)
    }
  }, [selected])

  function handleChatUnread(e) {
    const x = setTimeout(() => {
      dispatch(getChatUnread());
      clearTimeout(x)
    }, 500)
  }

  useEffect(() => {
    const messenger = document.querySelector('#messenger');
    const messegesWrapper = messenger?.shadowRoot?.querySelector('.wy-messenger-layout');
    const messegesBox = messegesWrapper?.querySelector('.wy-messenger-conversation');
    if (messegesBox && messenger?.shadowRoot) {
      const style = document.createElement('style');
      style.textContent = `
      .custom-style {
        min-height: 100% !important;
      }
    `;
      messenger.shadowRoot.appendChild(style);
      messegesBox.classList.add('custom-style');
    }
  }, [document.readyState])

  return (
    <Box sx={{ background: "#fafafa" }} className="products">
      <Box
        className="products__container"
        sx={{
          maxWidth: "1200px",
          width: "100%",
          padding: { xs: "0 18px", lg: 0 },
          margin: "0 auto !important",
          alignItems: "center",
        }}
      >
        <Grid
          container
          sx={{
            m: "32px 0 32px 0",
            width: "100%",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          <Grid
            item
            xs={12}
            id="wy-messenger-container"
            onClick={handleChatUnread}
          >
            {/* <WyMessenger
              id='messenger'
              uid={`${profile?.username}-messenger`}
              notifications='button-list'
              notificationsBadge='count'
              name='Чат'
              style={{ height: '80dvh' }}
              noMeetings
              noPolls
              noComments
              noWebDAV
              noConfluence
              conversationId={selected || null}
            /> */}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}