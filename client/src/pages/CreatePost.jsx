import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function CreatePost() {
  const [caption, setCaption] = useState("");
  const [media, setMedia] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!media) return alert("Please add image URL");

    try {
      setLoading(true);
      await api.post("/posts", {
        caption,
        media: [media], // backend expects array
      });
      navigate("/");
    } catch (err) {
      alert("Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-start pt-10">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow p-6">

        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Create Post
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* IMAGE URL */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Image URL
            </label>
            <input
              type="text"
              value={media}
              onChange={(e) => setMedia(e.target.value)}
              placeholder="https://image-url.com/photo.jpg"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* PREVIEW */}
          {media && (
            <img
              src={media}
              alt="preview"
              className="w-full rounded-xl max-h-64 object-cover"
            />
          )}

          {/* CAPTION */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Caption
            </label>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Write something..."
              className="w-full px-4 py-2 border rounded-lg resize-none focus:ring-2 focus:ring-indigo-500"
              rows={3}
            />
          </div>

          {/* BUTTON */}
          <button
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full font-semibold hover:opacity-90 transition"
          >
            {loading ? "Posting..." : "Post"}
          </button>
        </form>
      </div>
    </div>
  );
}
