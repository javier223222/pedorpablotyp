
/**
 * Event listener for new WebSocket connections.
 * Handles authentication and different types of messages.
 *
 * @param {WebSocket} ws - The WebSocket connection object.
 */
import server from "./src/server";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import WebSocket from "ws";
import { getToekndata } from "./src/middlewares";
import TodoController from "./src/controllers/TodoController";
dotenv.config();
const PORT = process.env.PORT || 3000;

const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  
  // Authenticate the user
  ws.on("message", async(message) => {
    try {
      console.log(message.toString());
      const token =JSON.parse(message.toString()).token
      
      const decoded=jwt.verify(token, process.env.JWT_SECRET as string)
      const {id}=await getToekndata(token)
      
      // Perform any additional authentication checks here
      
      // Handle different types of messages
      ws.on("message", async(message) => {
        const data = JSON.parse(message.toString());
        if (data.type == "updateTodo") {
          console.log("kk")
 
          
          const todoController:TodoController=new TodoController()
          const {title,content,idtodo,page,limit}=data
          const result=await todoController.update({
            idtodo:Number(idtodo),
            tittle:title,
            content:content,
            userId: Number(id)
          })
          const allTodos=await todoController.get(Number(id),Number(page),Number(limit))
          
          ws.send(JSON.stringify({ type: "updateTodoResult", allTodos }));

          
        } else if (data.type === "DeleteTodo") {
          // Get all todos for the user
          // Implement your logic here
          const todoController:TodoController=new TodoController()
          const {idtodo,page,limit}=data
          const result=await todoController.delete(Number(idtodo))
          const allTodos=await todoController.get(Number(id),Number(page),Number(limit))
          ws.send(JSON.stringify({ type: "DeleteTodoResult", allTodos }));
        }else if (data.type === "ChangeDone") {
          // Get all todos for the user
          // Implement your logic here
          const todoController:TodoController=new TodoController()
          const {idtodo,isdone,page,limit}=data
          const result=await todoController.changedone(Number(idtodo),isdone)
          const allTodos=await todoController.get(Number(id),Number(page),Number(limit))
          ws.send(JSON.stringify({ type: "ChangeDoneResult", allTodos }));

        }
      });
    } catch (error:any) {
      console.log(error);

      // Handle authentication error
      ws.send(JSON.stringify({ error: "Authentication failed" }));
      ws.close();
    }
  });
});

console.log(`WebSocket server is running on ws://localhost:${PORT}`);
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});