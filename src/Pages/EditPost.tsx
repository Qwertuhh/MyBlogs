import { useEffect, useState } from "react";
import { Container, PostForm } from "../components";
import Database from "../appwrite/postArticles";
import { useNavigate, useParams } from "react-router-dom";
import { Data } from "../types/globalTypes";

function EditPost() {
  const [post, setPosts] = useState<Data>();
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      Database.getPost(slug).then((post) => {
        if (post) {
          setPosts(post as unknown as Data);
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);
  return post && (
    <div className="py-8">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) ;
}

export default EditPost;
