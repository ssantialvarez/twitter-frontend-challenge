import { io, Socket } from 'socket.io-client'; 

interface ServerToClientEvents {
    chatMessage: (message: string, idSender: string, serverOffset: number) => void;
    chatHistory: (messages: { content: string; senderId: string; createdAt: string }[]) => void;  
}
  
interface ClientToServerEvents {
    bringRoom: (receiverId?: string, senderId?: string) => void;
    leaveRoom: (receiverId?: string, senderId?: string) => void;
    joinRoom: (receiverId?: string, senderId?: string) => void; 
    chatMessage: (message: string, receiverId: string, senderId: string) => void; 
}

const URL = 'http://localhost:8080';

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(URL!, {
    withCredentials: true,      
    autoConnect: true,          
    reconnection: true,         
    reconnectionAttempts: 5,    
    reconnectionDelay: 2000,    
    transports: ['websocket'],  
});
