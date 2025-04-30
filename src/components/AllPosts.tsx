import PostItem from "./Post";
import { Post } from "@/lib/models";

const AllPosts: React.FC<{posts: Post[]}> = (props) => {
  const posts = props.posts;
  return (
    <>
      {posts?.map((post, index) => (
        <PostItem key={index} post={post}  />
      ))}
    </>
  );
}

export default AllPosts;