import React, { useState } from "react";
import style from "../assets/css/createbox.module.css";
import axios from "axios";

const CreateBox = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    paragraph: "",
    image: null,
    song: null,
  });
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    const { name, type, files, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData instance
    const data = new FormData();
    data.append("name", formData.name);
    data.append("title", formData.title);
    data.append("paragraph", formData.paragraph);
    if (formData.image) data.append("image", formData.image);
    if (formData.song) data.append("song", formData.song);

    setLoading(true);
    try {
      const response = await axios.post(
        "http://43.204.36.107:3000/api/card/create",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            if (progressEvent.lengthComputable) {
              const percent = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setProgress(percent);
            }
          },
        }
      );

      // Handle success
      if (response.status === 201) {
        console.log("Uploaded successfully");
        // Reset form
        setFormData({
          name: "",
          title: "",
          paragraph: "",
          image: null,
          song: null,
        });
        onClose(); // Close modal or reset state
      } else {
        console.log("Card not created!");
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
    } finally {
      setLoading(false);
      setProgress(0); // Reset progress after upload
    }
  };

  return (
    <div className={`${style.formBox} ${isOpen ? style.open : style.close}`}>
      <button
        className={`${style.closeBtn} btn btn-outline-danger`}
        onClick={onClose}
      >
        Close
      </button>
      <form onSubmit={handleSubmit}>
        <div className={style.formGroup} style={{ marginTop: "30px" }}>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
          />
        </div>
        <div className={style.formGroup}>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
          />
        </div>
        <div className={style.formGroup}>
          <input
            type="text"
            id="paragraph"
            name="paragraph"
            value={formData.paragraph}
            onChange={handleChange}
            placeholder="Paragraph"
          />
        </div>
        <div className={style.formGroup}>
          <input
            style={{ padding: "8px" }}
            type="file"
            id="image"
            name="image"
            onChange={handleChange}
            placeholder="Image"
            accept="image/png, image/gif, image/jpeg"
          />
        </div>

        <div className={style.formGroup}>
          <input
            style={{ padding: "8px" }}
            type="file"
            id="song"
            name="song"
            onChange={handleChange}
            placeholder="Song"
            accept="audio/mp3"
          />
        </div>
        <button className="btn btn-outline-success" type="submit">
          Submit
        </button>
      </form>
      {loading && <div>Uploading... {progress}%</div>}
    </div>
  );
};

export default CreateBox;
