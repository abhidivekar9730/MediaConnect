import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Comments({ postId }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  const loadComments = async () => {
    const res = await api.get(`/comments/${postId}`);
    setComments(res.data);
  };

  const addComment = async () => {
    if (!text) return;
    await api.post(`/comments/${postId}`, { text });
    setText("");
    loadComments();
  };

  useEffect(() => {
    loadComments();
  }, []);

  return (
    <div className="mt-3">
      {comments.map((c, i) => (
        <p key={i} className="text-sm text-gray-600">
          {c.text}
        </p>
      ))}

      <div className="flex mt-2 gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="border px-2 py-1 flex-1 rounded"
          placeholder="Add comment..."
        />
        <button onClick={addComment}>Post</button>
      </div>
    </div>
  );
}
