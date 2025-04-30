import { Post } from "../lib/models";

const PostItem: React.FC<{ post: Post }> = (props) => {
  const post = props.post;
  return (
    <div className=" justify-center bg-amber-900 rounded w-96 flex flex-col p-2 m-2 shadow-lg">
      <div className="w-full flex flex-row pb-2">
        <h2 className="text-xl font-bold text-white justify-start">
          {post.title}
        </h2>
        <p className="text-sm text-gray-400 ml-auto">By {post.author}</p>
      </div>
      <p className="text-sm text-gray-200 justify-start">{post.content}</p>
    </div>
  );
};
export default PostItem;
