// Todo API mini - khong can cai thu vien, chi can Node.js
const http = require("http");

let todos = [
  { id: 1, title: "Hoc Postman", completed: false },
  { id: 2, title: "Viet test tu dong", completed: false },
  { id: 3, title: "Chay Collection Runner", completed: true },
];
let nextId = 4;

function send(res, status, data) {
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  res.end(data === undefined ? "" : JSON.stringify(data));
}

function readBody(req) {
  return new Promise((resolve) => {
    let raw = "";
    req.on("data", (c) => (raw += c));
    req.on("end", () => {
      try { resolve(raw ? JSON.parse(raw) : {}); } catch { resolve(null); }
    });
  });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, "http://localhost");
  const parts = url.pathname.split("/").filter(Boolean);

  if (parts[0] !== "todos") return send(res, 404, { error: "Not found" });

  const id = parts[1] !== undefined ? Number(parts[1]) : null;
  const item = id !== null ? todos.find((t) => t.id === id) : null;

  // GET /todos  (ho tro ?completed=true|false)
  if (req.method === "GET" && id === null) {
    const c = url.searchParams.get("completed");
    const list = c === null ? todos : todos.filter((t) => String(t.completed) === c);
    return send(res, 200, list);
  }

  // GET /todos/:id
  if (req.method === "GET") {
    return item ? send(res, 200, item) : send(res, 404, { error: "Todo not found" });
  }

  // POST /todos
  if (req.method === "POST" && id === null) {
    const body = await readBody(req);
    if (!body || typeof body.title !== "string" || body.title.trim() === "") {
      return send(res, 400, { error: "title is required" });
    }
    const todo = { id: nextId++, title: body.title.trim(), completed: Boolean(body.completed) };
    todos.push(todo);
    return send(res, 201, todo);
  }

  // PUT / PATCH /todos/:id
  if ((req.method === "PUT" || req.method === "PATCH") && id !== null) {
    if (!item) return send(res, 404, { error: "Todo not found" });
    const body = await readBody(req);
    if (!body) return send(res, 400, { error: "Invalid JSON" });
    if (body.title !== undefined) item.title = String(body.title);
    if (body.completed !== undefined) item.completed = Boolean(body.completed);
    return send(res, 200, item);
  }

  // DELETE /todos/:id
  if (req.method === "DELETE" && id !== null) {
    if (!item) return send(res, 404, { error: "Todo not found" });
    todos = todos.filter((t) => t.id !== id);
    return send(res, 200, { message: "Deleted" });
  }

  send(res, 405, { error: "Method not allowed" });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log("Todo API dang chay tai http://localhost:" + PORT + "/todos"));
