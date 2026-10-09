# Knowledge Connections — End Screen Crash Fix

Nguyên nhân chính:
`related` chỉ được dùng khi Storyteller chuyển sang màn hình kết thúc, nhưng patch trước chưa khai báo biến này.
Vì vậy đang nghe vẫn bình thường; vừa kết thúc thì React gặp `ReferenceError` và UI trắng.

Fix:
- thêm `const related = relatedKnowledge(dest?.id);`
- làm `dest.sources` an toàn bằng `(dest.sources || [])`

Áp dụng SAU `knowledge-connections-patch`.
Sau đó:
- dev: `npm run dev`
- production preview: `npm run build` rồi `npm run preview`
