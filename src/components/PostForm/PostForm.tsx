import React, { useCallback } from "react";
import { Control, useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import Database from "../../appwrite/postArticles";
import Images from "../../appwrite/imagesBucket";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AuthState, Data } from "../../types/globalTypes";



export default function PostForm({ post }: {post?: Data}) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        $id: post?.$id || "",
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || true, //!FIX False
        image: "",
        featuredImage: post?.featuredImage || "",
        userId: post?.userId || "",
        date: post?.date || "",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state: { auth: AuthState }) => state.auth.userData);

  
  const submit = async (data: Data) => {
    if (post) {
      const file = data.featuredImage![0]
        ? await Images.uploadImage(data.featuredImage![0] as unknown as File)
        : null;

      if (file) {
        Images.deleteImage(post.featuredImage);
      }

      const dbPost = await Database.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : '',
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = await Images.uploadImage(data.featuredImage![0] as unknown as File);

      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        const dbPost = await Database.createPost({
          ...data,
          slug: data.title, // or some other value that makes sense for your application
          image: data.featuredImage,
          userId: userData.$id,
        });;

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  const slugTransform = useCallback((value: string) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title!), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content :"
          name="content"
          control={control as unknown as Control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={Images.getImage(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}
