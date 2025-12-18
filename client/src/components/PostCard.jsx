import Comments from "./Comments";

export default function PostCard({ post, onLike }) {
  return (
    <div className="bg-white rounded-2xl border shadow-sm mb-8 overflow-hidden">

      {/* USER HEADER */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-white flex items-center justify-center font-bold text-lg">
            {post.createdBy?.username?.[0]?.toUpperCase()}
          </div>

          <div>
            <p className="font-semibold text-gray-800">
              {post.createdBy?.username}
            </p>
            <p className="text-xs text-gray-500">
              {post.createdBy?.email}
            </p>
          </div>
        </div>

        <button className="text-gray-400 hover:text-gray-600 text-xl">
          ⋮
        </button>
      </div>

      {/* POST IMAGE */}
      <img
        src={post.media[0]}
        className="w-full max-h-[520px] object-cover bg-gray-100"
        alt="post"
      />

      {/* ACTION BAR */}
      <div className="flex items-center gap-4 px-4 py-3">
        <button
          onClick={() => onLike(post._id)}
          className="text-lg hover:scale-110 transition"
        >
          ❤️
        </button>
        <span className="text-sm text-gray-600">
          {post.likeCount} likes
        </span>
      </div>

      {/* CAPTION */}
      <div className="px-4 pb-2">
        <p className="text-gray-800">
          <span className="font-semibold mr-1">
            {post.createdBy?.username}
          </span>
          {post.caption}
        </p>
      </div>

      {/* COMMENTS */}
      <div className="px-4 pb-4">
        <Comments postId={post._id} />
      </div>
    </div>
  );
}
