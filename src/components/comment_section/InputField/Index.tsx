"use client"

import dynamic from 'next/dynamic';
import './InputField.scss'
import { useContext, useEffect, useState } from 'react'
import { CommentsContext } from '@/context/comments'
import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import RegularInput from './RegularInput'
const AdvancedInput = dynamic(() => import('@/components/comment_section/InputField/AdvancedInput'), { ssr: false });


interface InputFieldProps {
  formStyle?: object
  comment_id?: string
  fillerText?: string
  parentId?: string
  mode?: string
  customImg?: string
  inputStyle?: object
  cancelBtnStyle?: object
  submitBtnStyle?: object
  imgStyle?: object
  imgDiv?: object
}

const InputField = ({
  formStyle,
  comment_id,
  fillerText,
  parentId,
  mode,
  customImg,
  inputStyle,
  cancelBtnStyle,
  submitBtnStyle,
  imgStyle,
  imgDiv
}: InputFieldProps) => {
  const [text, setText] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (fillerText) {
      setText(fillerText)
    }
  }, [fillerText])

  const globalStore: any = useContext(CommentsContext)

  const editMode = async (advText?: string) => {
    const textToSend = advText ? advText : text

    return (
      globalStore.onEditAction &&
      (await globalStore.onEditAction({
        user_id: globalStore.currentUserData.currentUserId,
        comment_id: comment_id,
        avatarUrl: globalStore.currentUserData.currentUserImg,
        userProfile: globalStore.currentUserData.currentUserProfile
          ? globalStore.currentUserData.currentUserProfile
          : null,
        fullName: globalStore.currentUserData.currentUserFullName,
        text: textToSend,
        parentOfEditedCommentId: parentId,
        afterEdit: async () => {
          await globalStore.onEdit(textToSend, comment_id, parentId)
          setText('')
          setIsLoading(false)
        }
      }))
    )
  }

  const replyMode = async (replyUuid: string, advText?: string) => {
    const textToSend = advText ? advText : text

    return (
      globalStore.onReplyAction &&
      (await globalStore.onReplyAction({
        user_id: globalStore.currentUserData.currentUserId,
        repliedToCommentId: comment_id,
        avatarUrl: globalStore.currentUserData.currentUserImg,
        userProfile: globalStore.currentUserData.currentUserProfile
          ? globalStore.currentUserData.currentUserProfile
          : null,
        fullName: globalStore.currentUserData.currentUserFullName,
        text: textToSend,
        parentOfRepliedCommentId: parentId,
        comment_id: replyUuid,
        afterReply: async (newComment?) => {
          await globalStore.onReply(textToSend, comment_id, parentId, replyUuid, newComment?.created_at || new Date())
          setText('')
          setIsLoading(false)
        }
      }))
    )
  }
  const submitMode = async (createUuid: string, advText?: string) => {
    const textToSend = advText ? advText : text

    return (
      globalStore.onSubmitAction &&
      (await globalStore.onSubmitAction({
        user_id: globalStore.currentUserData.currentUserId,
        comment_id: createUuid,
        avatarUrl: globalStore.currentUserData.currentUserImg,
        userProfile: globalStore.currentUserData.currentUserProfile
          ? globalStore.currentUserData.currentUserProfile
          : null,
        fullName: globalStore.currentUserData.currentUserFullName,
        text: textToSend,
        replies: [],
        afterSubmit: async (newComment?) => {
          await globalStore.onSubmit(textToSend, createUuid, newComment?.created_at || new Date())
          setText('')
          setIsLoading(false)
        }
      }))
    )
  }

  const handleSubmit = async (event: any, advText?: string) => {
    event.preventDefault()
    const createUuid = uuidv4()
    const replyUuid = uuidv4()
    setIsLoading(true)
    mode === 'editMode'
      ? editMode(advText)
      : mode === 'replyMode'
        ? replyMode(replyUuid, advText)
        : submitMode(createUuid, advText)
  }

  return (
    <div
      style={
        mode != 'replyMode' ? {
          border: '1px solid #E0E0E0',
          padding: '16px'
        } : {}
      }
    >
      {globalStore.advancedInput ? (
        <AdvancedInput
          handleSubmit={handleSubmit}
          text={mode === 'editMode' ? text : ''}
          formStyle={formStyle}
          mode={mode}
          cancelBtnStyle={cancelBtnStyle}
          submitBtnStyle={submitBtnStyle}
          comment_id={comment_id}
          imgDiv={imgDiv}
          imgStyle={imgStyle}
          loading={isLoading}
          customImg={customImg}
        />
      ) : (
        <RegularInput
          formStyle={formStyle}
          imgDiv={imgDiv}
          imgStyle={imgStyle}
          customImg={customImg}
          mode={mode}
          inputStyle={inputStyle}
          cancelBtnStyle={cancelBtnStyle}
          comment_id={comment_id}
          submitBtnStyle={submitBtnStyle}
          handleSubmit={handleSubmit}
          text={text}
          loading={isLoading}
          setText={setText}
        />
      )}
    </div>
  )
}
export default InputField
