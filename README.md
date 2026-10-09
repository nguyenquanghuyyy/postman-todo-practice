# postman-todo-practice
Sản phẩm gồm một API todo mini chạy trên máy bạn và một collection Postman có 8 request kèm test tự động. API chạy cục bộ nên không phụ thuộc internet hay website bên ngoài.

Cần có:
postman
node.js

Bước 1: chạy api
mở terminal và chạy node server.js

Bước 2: Import file Todo-API-Practice.postman_collection.json

Bước 3: Chạy collection

8 request
Các request
- 1	GET /todos	GET cơ bản, kiểm tra status và cấu trúc dữ liệu
- 2	GET /todos?completed=true	Query parameter
- 3	POST /todos	Body JSON, status 201, lưu biến newId
- 4	GET /todos/{{newId}}	Dùng biến trong URL
- 5	PATCH /todos/{{newId}}	Cập nhật một phần
- 6	POST /todos (thiếu title)	Negative test, kỳ vọng 400
- 7	DELETE /todos/{{newId}}	Xóa dữ liệu
- 8	GET /todos/{{newId}}	Xác nhận đã xóa, kỳ vọng 404
