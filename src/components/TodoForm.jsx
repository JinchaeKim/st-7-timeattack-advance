import { todoApi } from "../api/todos";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function TodoForm() {
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const queryClient = useQueryClient();

  // TODO: 필수: useMutation 으로 리팩터링 하세요.
  // TODO: 선택: useMutation 으로 리팩터링 후, useTodoMutation 커스텀훅으로 정리해 보세요.
  const handleAddTodo = async (e) => {
    e.preventDefault();
    setTitle("");
    setContents("");

    const newTodoObj = {
      id: Date.now().toString(),
      title,
      contents,
      isCompleted: false,
      createdAt: Date.now(),
    };
    await todoApi.post("/todos", newTodoObj);

    mutation.mutate(newTodoObj);
  };

  const mutation = useMutation({
    mutationFn: handleAddTodo,
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
    },
  });

  return (
    <form onSubmit={handleAddTodo}>
      <label htmlFor="title">제목:</label>
      <input
        type="text"
        id="title"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <label htmlFor="contents">내용:</label>
      <input
        id="contents"
        name="contents"
        value={contents}
        onChange={(e) => setContents(e.target.value)}
        required
      />
      <button type="submit">추가하기</button>
    </form>
  );
}
