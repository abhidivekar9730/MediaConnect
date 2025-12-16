
import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");

  const load = async () => {
    const res = await api.get("/posts");
    setPosts(res.data);
  };

  const create = async () => {
    await api.post("/posts", { title });
    setTitle("");
    load();
  };

  const remove = async (id) => {
    await api.delete(`/posts/${id}`);
    load();
  };

  useEffect(() => { load(); }, []);

  return (
    <div>
      <h2>Posts</h2>
      <input value={title} onChange={e=>setTitle(e.target.value)} />
      <button onClick={create}>Add</button>

      {posts.map(p => (
        <div key={p._id}>
          {p.title}
          <button onClick={()=>remove(p._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
