import { useEffect, useState } from "react";
import api from "../api/axios";
import PostCard from "../components/PostCard";

export default function Profile() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    api.get("/users").then((res) => setUser(res.data));
    api.get("/users/posts").then((res) => setPosts(res.data));
  }, []);

  return (
    <div className="max-w-xl mx-auto mt-6">
      {user && (
        <div className="mb-6 p-4 bg-white rounded-xl shadow">
          <h2 className="text-xl font-bold">{user.username}</h2>
          <p className="text-gray-500">{user.email}</p>
          <div className="flex gap-4 mt-2 text-sm">
            <span>{user.followerCount} followers</span>
            <span>{user.followingCount} following</span>
          </div>
        </div>
      )}

      <h3 className="text-lg font-semibold mb-3">My Posts</h3>

      {posts.length === 0 && (
        <p className="text-gray-500 text-center">No posts yet</p>
      )}

      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
}
