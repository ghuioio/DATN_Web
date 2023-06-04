import { createContext } from 'react'
import {io} from 'socket.io-client'

export const getSocketHeaders = () => ({
  authorization: `Bearer ${localStorage.getItem('access_token')}`
})

export const socket = io('ws://localhost:5000')
export const WebsocketContext = createContext(socket)
export const WebsocketProvider = WebsocketContext.Provider