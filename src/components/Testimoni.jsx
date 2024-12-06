import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTestimonis,
  postTestimonis,
  deleteTestimonis,
} from "../redux/async/restSlice";

const Testimoni = () => {
  const dispatch = useDispatch();
  const { testimonis } = useSelector((state) => state.rest);

  const [form, setForm] = useState({
    name: "",
    title: "",
    message: "",
    foto_profile: null,
  });

  useEffect(() => {
    dispatch(getTestimonis());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "foto_profile") {
      setForm({ ...form, foto_profile: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("title", form.title);
    formData.append("message", form.message);

    if (form.foto_profile) {
      formData.append("foto_profile", form.foto_profile);
    }
    dispatch(postTestimonis(formData));
    setForm({ name: "", title: "", message: "", foto_profile: null });
  };

  return (
    <div>
      <h1 className="text-4xl font-bold">Testimoni</h1>
      <div className="my-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full">
          <div className="flex flex-wrap gap-2 w-full">
            <div className="flex flex-col flex-grow">
              <label htmlFor="foto_profile">Photo</label>
              <input
                className="border-2 border-black py-3 px-2 h-16 rounded file:right-0 file:text-white file:bg-black file:border-none file:rounded-lg file:px-2 file:py-1 file:mr-2 file:cursor-pointer"
                type="file"
                id="foto_profile"
                name="foto_profile"
                onChange={handleChange} // Menangani perubahan input file
              />
            </div>
            <div className="flex flex-col flex-grow">
              <label htmlFor="name">Name</label>
              <input
                className="border-2 border-black py-3 px-2 h-16 rounded"
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange} // Menangani perubahan input text
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
                onChange={handleChange} // Menangani perubahan input text
              />
            </div>
            <div className="flex flex-col flex-grow">
              <label htmlFor="message">Message</label>
              <textarea
                style={{ resize: "none" }}
                className="border-2 border-black p-2 max-h-16 rounded"
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange} // Menangani perubahan textarea
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-black text-white py-2 px-4 rounded"
            >
              Submit
            </button>{" "}
            {/* Tombol submit */}
          </div>
        </form>
      </div>
      {testimonis.map((testimoni) => (
        <div
          className="flex justify-between items-center border-y border-black py-2"
          key={testimoni.id}
        >
            <div className="flex gap-2 items-center">
          <div className="w-24 h-24 rounded-full overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src={testimoni.foto_profile}
              alt=""
            />
          </div>
          <div>
            <p>{testimoni.message}</p>
            <p>{testimoni.name}</p>
            <p>{testimoni.title}</p>
          </div>
            </div>
          <div className="flex gap-2">
            <button
              className="text-red"
              onClick={() => dispatch(deleteTestimonis(testimoni.id))}
            >
              Delete
            </button>
            <button
              className="text-dark-yellow"
              onClick={() => dispatch(deleteTestimonis(testimoni.id))}
            >
              Edit
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Testimoni;
