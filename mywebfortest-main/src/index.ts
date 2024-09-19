import { Configuration, getConfig } from "@/config";
import * as routers from "@/routers/index";
import cors from "cors";
import express, { Application } from "express";
import path from "path";

class Server {
  config: Configuration;
  app: Application;
  
  constructor() {
    this.config = getConfig(); // Load configuration
    this.app = express(); // Initialize Express app

    this.register(); // Register middlewares and routes
  }

  register() {
    // Setup CORS to allow requests from specific origins
    this.app.use(cors({ origin: this.config.allowedOrigins }));

    // Middleware to parse JSON and URL-encoded data
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    // Register routes for authentication, books, cart, and categories
    this.app.use("/auth", new routers.Authentication().router);
    this.app.use("/books", new routers.Book().router);
    this.app.use("/cart", new routers.Cart().router);
    this.app.use("/categories", new routers.Category().router);

    // Serve static files from the 'uploadDir' directory
    this.app.use("/images", express.static(path.join(__dirname, "..", this.config.uploadDir)));
  }

  start() {
    // Start the server and listen on the configured port
    this.app.listen(this.config.port, () => {
      console.log(`The server is listening on port ${this.config.port} ...`);
    });
  }
}

// Create and start the server
const server = new Server();
server.start();
