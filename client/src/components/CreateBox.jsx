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
    viewers: "single", // Default value
    viewslimit: "",
    expiry: "",
    locked: "0", // Default value
    downloadable: "0" // Default value
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
    const data = new FormData();
    data.append("name", formData.name);
    data.append("title", formData.title);
    data.append("paragraph", formData.paragraph);
    if (formData.image) data.append("image", formData.image);
    if (formData.song) data.append("song", formData.song);
    data.append("viewers", formData.viewers);
    data.append("viewslimit", formData.viewslimit);
    data.append("expiry", formData.expiry);
    data.append("locked", formData.locked);
    data.append("downloadable", formData.downloadable);

    setLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:3000/api/card/create`,
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

      if (response.status === 201) {
        console.log("Uploaded successfully");
        setFormData({
          name: "",
          title: "",
          paragraph: "",
          image: null,
          song: null,
          viewers: "single",
          viewslimit: "",
          expiry: "",
          locked: "0",
          downloadable: "0"
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
            accept="audio/mp3"
          />
        </div>

        <label htmlFor="viewers">Viewers</label>
        <div className={style.formGroup}>
          <select
            name="viewers"
            id="viewers"
            value={formData.viewers}
            onChange={handleChange}
          >
            <option value="single">Single</option>
            <option value="multiple">Multiple</option>
          </select>
        </div>

        <label htmlFor="viewslimit">Views Limit</label>
        <div className={style.formGroup}>
          <input
            style={{ padding: "8px" }}
            type="number"
            id="viewslimit"
            name="viewslimit"
            value={formData.viewslimit}
            onChange={handleChange}
            placeholder="Views Limit"
          />
        </div>

        <label htmlFor="expiry">Expiry</label>
        <div className={style.formGroup}>
          <input
            style={{ padding: "8px" }}
            type="datetime-local"
            id="expiry"
            name="expiry"
            value={formData.expiry}
            onChange={handleChange}
            placeholder="Expiry"
          />
        </div>

        <label htmlFor="locked">Locked</label>
        <div className={style.formGroup}>
          <select
            name="locked"
            id="locked"
            value={formData.locked}
            onChange={handleChange}
          >
            <option value="1">Yes</option>
            <option value="0">No</option>
          </select>
        </div>

        <label htmlFor="downloadable">Downloadable</label>
        <div className={style.formGroup}>
          <select
            name="downloadable"
            id="downloadable"
            value={formData.downloadable}
            onChange={handleChange}
          >
            <option value="1">Yes</option>
            <option value="0">No</option>
          </select>
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
