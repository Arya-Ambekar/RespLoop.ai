// import { io } from "socket.io-client";
// import { BASE_URL } from "./constants/constants";

// export function connectWS() {
//   return io(`${BASE_URL}`);
// }

import { io } from "socket.io-client";
// import dotenv from "dotenv";
import { BASE_URL } from "./constants/constants";
// dotenv.config();

class SocketClient {
  socket: any;

  connect() {
    this.socket = io(`${BASE_URL}`, {
      transports: ["websocket"],
    });
    return new Promise<void>((resolve, reject) => {
      this.socket.on("connect", () => resolve());
      this.socket.on("connect_error", (error: any) => reject(error));
    });
  }

  disconnect() {
    return new Promise<void>((resolve) => {
      this.socket.disconnect(() => {
        this.socket = null;
        resolve();
      });
    });
  }

  emit(event: any, data: any) {
    return new Promise<void>((resolve, reject) => {
      if (!this.socket) return reject("No socket connection.");

      return this.socket.emit(event, data, (response: any) => {
        // Response is the optional callback that you can use with socket.io in every request. See 1 above.
        if (response.error) {
          console.error(response.error);
          return reject(response.error);
        }

        return resolve();
      });
    });
  }

  on(event: any, fun: any) {
    // No promise is needed here, but we're expecting one in the middleware.
    return new Promise<void>((resolve, reject) => {
      if (!this.socket) return reject("No socket connection.");

      this.socket.on(event, fun);
      resolve();
    });
  }
}

export default SocketClient;
