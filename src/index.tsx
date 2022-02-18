import React from "react";
import ReactDOM from "react-dom";
import { createServer, Model } from "miragejs";

import { App } from "./App";

createServer({
  models: {
    transaction: Model,
  },
  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: "Freela de React",
          type: "deposit",
          category: "Dev",
          amount: 8000,
          createdAt: "2021-01-25T12:00:00.000Z",
        },
        {
          id: 2,
          title: "Aluguel",
          type: "withdraw",
          category: "Casa",
          amount: 1500,
          createdAt: "2021-01-28T12:00:00.000Z",
        },
      ],
    });
  },
  routes() {
    this.namespace = "api";

    this.get("/transactions", () => {
      return this.schema.all("transaction");
    });

    this.post("/transactions", (schema, request) => {
      const data = JSON.parse(request.requestBody);

      return schema.create("transaction", data);
    });
  },
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
