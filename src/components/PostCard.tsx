import Images from "../appwrite/imagesBucket";
import { Link } from "react-router-dom";

function PostCard({
  $id,
  title,
  image,
  date,
}: {
  $id: string;
  title: string;
  image: string;
  date: string;
}) {
  return (
    <Link to={`/posts/${$id}`} className="flex gap-4">
      <img
        src={Images.getImage(image)}
        alt={title}
        className="w-48 h-48 object-cover"
      />
      <div>
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-gray-500">{date}</p>
      </div>
    </Link>
  );
}

export default PostCard;
