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
          "http://localhost:3000/api/card/preview",
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
        console.log(response.data.data[0].image);
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
    <div>
      {loading ? `Loading... ${progress}%` : (
        <div>
          <img 
  id="uploadedImage" 
  src={`http://localhost:3000/uploads/${obj.image}`} 
  alt="Uploaded Image" 
/>

        </div>
      )}
    </div>
  );
};

export default Preview;
