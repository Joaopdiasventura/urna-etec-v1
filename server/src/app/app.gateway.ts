import {
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer,
	MessageBody,
} from "@nestjs/websockets";
import { Socket, Server } from "socket.io";

@WebSocketGateway()
export class AppGateway {
	@WebSocketServer()
	server: Server;

	@SubscribeMessage("voteUpdate")
	handleVote(@MessageBody() payload: any): void {
		this.server.emit("voteUpdate", payload);
	}
}
