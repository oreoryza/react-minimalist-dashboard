import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBlogs, postBlogs, deleteBlogs, detailBlog, publishBlog } from "../redux/async/restSlice";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const Blog = () => {
  const dispatch = useDispatch();
  const { blogs, blog } = useSelector((state) => state.rest);
  const [isEdit, setIsEdit] = useState(false);

  const [form, setForm] = useState({
    title: "",
    content: "",
    banner: null,
    meta_title: "",
    meta_desc: "",
  });

  useEffect(() => {
    dispatch(getBlogs());
  }, [dispatch]);

  // Update form state when blog changes
  useEffect(() => {
    if (isEdit && blog) {
      setForm({
        title: blog.title || "",
        content: blog.content || "",
        banner: null,
        meta_title: blog.meta_title || "",
        meta_desc: blog.meta_desc || "",
      });
    }
  }, [blog]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "banner") {
      setForm({ ...form, banner: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setForm({ ...form, content: data });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("content", form.content);
    formData.append("banner", form.banner);
    formData.append("meta_title", form.meta_title);
    formData.append("meta_desc", form.meta_desc);

    dispatch(postBlogs(formData));
    setForm({ title: "", content: "", banner: null });
    dispatch(getBlogs());
    setIsEdit(false);
  };

  const handleEdit = (blogId) => {
    setIsEdit(true);
    dispatch(detailBlog(blogId));
  };

  return (
    <div>
      <h1 className="text-4xl font-bold">Blog</h1>
      <div className="my-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full">
          <div className="flex flex-wrap gap-2 w-full">
            <div className="flex flex-col flex-grow">
              <label htmlFor="banner">Banner</label>
              <input
                className="border-2 border-black py-3 px-2 h-16 rounded file:right-0 file:text-white file:bg-black file:border-none file:rounded-lg file:px-2 file:py-1 file:mr-2 file:cursor-pointer"
                type="file"
                id="banner"
                name="banner"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col flex-grow">
              <label htmlFor="title">Title</label>
              <input
                className="border-2 border-black py-3 px-2 h-16 rounded"
                type="text"
                id="title"
                name="title"
                value={form.title}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col flex-grow">
              <label htmlFor="meta_title">Meta Title</label>
              <input
                className="border-2 border-black py-3 px-2 h-16 rounded"
                type="text"
                id="meta_title"
                name="meta_title"
                value={form.meta_title}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col flex-grow">
              <label htmlFor="meta_desc">Meta Description</label>
              <input
                className="border-2 border-black py-3 px-2 h-16 rounded"
                type="text"
                id="meta_desc"
                name="meta_desc"
                value={form.meta_desc}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col flex-grow">
              <label htmlFor="content">Content</label>
              <div>
                <CKEditor
                  editor={ClassicEditor}
                  data={form.content}
                  config={{
                    licenseKey: "GPL",
                  }}
                  onChange={handleEditorChange}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-black text-white py-2 px-4 rounded"
            >
              Submit
            </button>{" "}
          </div>
        </form>
      </div>
      <table className="w-full">
        <thead>
          <tr className="border-b-2 border-black">
            <th>No</th>
            <th>Title</th>
            <th>Published</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blogItem, index) => (
            <tr
              key={blogItem.id}
              className="border-y border-black hover:bg-black/[.1]"
            >
                <td>{index+1}</td>
              <td className="py-4">{blogItem.title}</td>
              <td className="text-center">
                <input type="checkbox" checked={blogItem.published} disabled />
              </td>
              <td className="text-center">
              <button onClick={() => dispatch(publishBlog(blogItem.id))} className="text-green">Publish</button>
                <button onClick={() => dispatch(deleteBlogs(blogItem.id))} className="text-red mx-3">Delete</button>
                <button onClick={() => handleEdit(blogItem.id)} className="text-dark-yellow">Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Blog;
