import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MyCard from "./MyCard";

const Preview = () => {
  const { link } = useParams();
  const [obj, setObj] = useState({});
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [expired, setExpired] = useState(false);
  const [notFound, setNotFound] = useState(false);

  // Ensure expirydate is in ISO format
  const expirydate = new Date().toISOString();

  useEffect(() => {
    const fetchObj = async () => {
      setLoading(true);
      setExpired(false);
      setNotFound(false);

      try {
        const response = await axios.post(
          `http://localhost:3000/api/card/preview`,
          { linkdata: link, expirydate: expirydate },
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

        // Check the custom status code from the response
        if (response.data.mystatus === 222) {
          setNotFound(true);
        } else if (response.data.mystatus === 223) {
          setExpired(true);
        } else {
          setObj(response.data.data[0]);
        }
      } catch (error) {
        console.error("Object fetch error:", error);
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
        <div>Loading... {progress}%</div>
      ) : expired ? (
        <h4 className="text-center">Link Expired</h4>
      ) : notFound ? (
        <h4 className="text-center">Card Not Found</h4>
      ) : (
        <div className="col d-flex justify-content-center align-items-center mt-5">
          <MyCard obj={obj} />
        </div>
      )}
    </div>
  );
};

export default Preview;
