import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPortfolios, postPortfolios, deletePortfolios, detailPortfolio, updatePortfolio } from "../redux/async/restSlice";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import DOMPurify from 'dompurify'

const Portfolio = () => {
  const dispatch = useDispatch();
  const { portfolios, portfolio } = useSelector((state) => state.rest);

  const [form, setForm] = useState({
    title: "",
    content: "",
    banner: null,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [currentPortfolioId, setCurrentPortfolioId] = useState(null);

  useEffect(() => {
    dispatch(getPortfolios());
  }, [dispatch]);

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
    if (form.banner) {
      formData.append("banner", form.banner);
    }

    if (isEditing) {
      dispatch(updatePortfolio({ id: currentPortfolioId, ...formData }));
      setIsEditing(false);
      setCurrentPortfolioId(null);
    } else {
      dispatch(postPortfolios(formData));
    }

    setForm({ title: "", content: "", banner: null });
  };

  const handleEdit = (id) => {
    dispatch(detailPortfolio(id));
    setForm({
      title: portfolio.title || "",
      content: portfolio.content || "",
      banner: null,
    });
    setCurrentPortfolioId(portfolio.id);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    dispatch(deletePortfolios(id));
  };

  return (
    <div>
      <h1 className="text-4xl font-bold">Portfolio</h1>
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
          <button type="submit" className="bg-black text-white py-2 px-4 rounded">
            {isEditing ? "Update" : "Submit"}
          </button>
          </div>
        </form>
      </div>
      {portfolios.map((portfolio, index) => (
        <div key={portfolio.id} className="flex justify-between items-center gap-4 border-y-2 border-black py-4">
            <h2 className="text-2xl font-bold">{index + 1}</h2>
          <div
            className={`group relative h-80 w-64 overflow-hidden`}
          >
            <img
              src={portfolio.banner}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 translate-y-16 left-0 w-full bg-black/50 flex justify-center items-center py-3 group-hover:translate-y-0 transition duration-200">
              <h1 className="text-white text-2xl font-bold">
                {portfolio.title}
              </h1>
            </div>
          </div>
          <div>
            <button onClick={() => handleDelete(portfolio.id)} className="text-red">Delete</button>
            <button onClick={() => handleEdit(portfolio.id)} className="text-dark-yellow mx-4">Edit</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Portfolio;
