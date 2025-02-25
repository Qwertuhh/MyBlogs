import { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import  Database from "../appwrite/postArticles";
import { Data } from "../types/globalTypes";

function AllPosts() {
  const [posts, setPosts] = useState<Data[]>([]);
  useEffect(() => {}, []);
  Database.getPosts([]).then((posts) => {
    if (posts) {
      setPosts(posts.documents as unknown as Data[]);
    }
  });
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
