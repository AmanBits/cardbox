import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Preview = () => {
  const { link } = useParams();
  const [obj, setObj] = useState({});
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fetchObj = async () => {
      try {
        setLoading(true);
        const response = await axios.post(
          "http://43.204.36.107:3000/api/card/preview",
          { linkdata: link },
          {
            onDownloadProgress: (progressEvent) => {
              if (progressEvent.lengthComputable) {
                const percent = Math.round(
                  (progressEvent.loaded * 100) / progressEvent.total
                );
                setProgress(percent);
              }
            },
          }
        );
        // console.log(response.data.data[0]);
        setObj(response.data.data[0]);
      } catch (error) {
        console.error("Object fetch error " + error);
      } finally {
        setLoading(false);
      }
    };

    if (link) {
      fetchObj();
    }
  }, [link]);

  return (
    <div className="container">
      {loading ? (
        `Loading... ${progress}%`
      ) : (
        <div className="col mx-auto w-50 ">
          <div className="row mx-1">
            <div className="col-10">
              <div className="row">
                <h5 className="m-0">{obj.name}</h5>
              </div>
              <div className="row">
                <h6 className="m-0">{obj.title}</h6>
              </div>
              <div className="row">
                <p className="m-0">{obj.paragraph}</p>
              </div>
            </div>
            <div className="col-2">...</div>
          </div>
          <div className="row ">
            <img
              id="uploadedImage"
              src={`http://43.204.36.107:3000/uploads/${obj.image}`}
              alt="Uploaded Image"
            />
          </div>
          <div className="row">
            <audio controls>
              <source
                src={
                  obj.song ? `http://43.204.36.107:3000/uploads/${obj.song}` : ""
                }
                type="audio/mpeg"
              />
              Your browser does not support the audio element.
            </audio>
          </div>
        </div>
      )}
    </div>
  );
};

export default Preview;
