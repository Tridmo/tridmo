"use client";

import { Box, Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getChatUnread, selectSelectedConversation, setSelectedConversation } from '../../../data/chat';
import { WyMessenger } from '@weavy/uikit-react';
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

  return (
    <Box sx={{ background: "#fafafa" }} className="products" >
      <Box className='products__container' sx={{ maxWidth: "1200px", width: "100%", padding: { xs: "0 18px", lg: 0 }, margin: "0 auto !important", alignItems: "center", }}>
        <Grid container
          sx={{
            m: '32px 0 32px 0',
            width: '100%',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center'
          }}
        >
          <Grid item xs={12} id='wy-messenger-container'
            onClick={handleChatUnread}
          >
            <WyMessenger
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
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}