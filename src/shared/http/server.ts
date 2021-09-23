import app from "./app";
import mongoose from "mongoose";

const connectionUri = process.env.MONGOOSE_URL_CONNECTION || "";

mongoose
  .connect(connectionUri)
  .then(() => {
    const listenPort = process.env.APP_SERVER_PORT || 3000;
    const appName = process.env.APP_NAME || "";

    app.listen(listenPort, () => {
      console.log(`[${appName}] Server is running on port ${listenPort}!`);
    });
  })
  .catch(error => console.log(error));
