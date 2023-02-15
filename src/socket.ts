import { Server } from "socket.io";


export class socketService {

    init(server: any) {


        let scores = [45, 66, 100, 3, 55];
        const io = new Server(server, {
            cors: {
                origin: "*",
                methods: ["GET", "POST"],
            },
        });


        io.on('connection', (socket: any) => {
            socket.on("1", (data: any) => {
                console.log(data);
            });

            socket.on("2", (data: any) => {
                console.log(data);
            });

            let i = 0;

            setInterval(() => {
                if (i < scores.length) {
                    socket.emit('score', scores[i]);
                    i++;
                }
            }, 5000)
        });


    }
}




// server.on('connection', (socket: any) => {
        //     console.log('RCU Socket client connected');
        //     socket.on('data', (data: Buffer) => {
        //         socket.ip = socket.remoteAddress.substring(socket.remoteAddress.lastIndexOf(':') + 1, socket.remoteAddress.length)
        //         socket.port = socket.remotePort;
        //         this.rcuCommandParser.processRxCommand(socket, data)
        //     });
        //     socket.on('end', async () => {
        //         console.log('RCU Socket client disconnected');
        //         const room_id: number = await this.rcuConnectionService.RcuDisconnected(socket);
        //         if (room_id) this.rcuCommandParser.removeSocket(room_id)
        //     });
        //     socket.on("close", () => {
        //         console.log("client connection closed.");
        //     });
        // });
