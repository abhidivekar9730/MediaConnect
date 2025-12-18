import { useEffect, useState } from "react";
import api from "../api/axios";
import PostCard from "../components/PostCard";

export default function Home() {
  const [posts, setPosts] = useState([]);

  const loadPosts = async () => {
    const res = await api.get("/posts");
    setPosts(res.data);
  };

  const likePost = async (id) => {
    await api.post(`/posts/like/${id}`);
    loadPosts();
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <div className="max-w-xl mx-auto mt-6">
      {posts.map((post) => (
        <PostCard key={post._id} post={post} onLike={likePost} />
      ))}
    </div>
  );
}
