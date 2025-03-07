import { useQuery } from "@tanstack/react-query";
import { todoApi } from "../api/todos";
import { useNavigate } from "react-router-dom";

export default function TodoList() {
  const navigate = useNavigate();

  const fetchData = async () => {
    const response = await todoApi.get("/todos");
    return response.data;
  };

  const {
    data: todos = [],
    isPending: isLoading,
    isError: error,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchData,
  });

  if (isLoading) {
    return <div style={{ fontSize: 36 }}>로딩중...</div>;
  }

  if (error) {
    console.error(error);
    return (
      <div style={{ fontSize: 24 }}>에러가 발생했습니다: {error.message}</div>
    );
  }

  return (
    <ul style={{ listStyle: "none", width: 250 }}>
      {todos.map((todo) => (
        <li
          key={todo.id}
          style={{
            border: "1px solid black",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <h3>{todo.title}</h3>
          <button onClick={() => navigate(`/detail/${todo.id}`)}>
            내용보기
          </button>
        </li>
      ))}
    </ul>
  );
}
