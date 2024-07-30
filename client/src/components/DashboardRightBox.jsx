import { useEffect, useState } from "react";

import axios from "axios";
import CardLink from "./CardLink";

const DashboardRightBox = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://43.204.36.107:3000/api/card/history",
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

       
        setHistory(response.data.data);
      } catch (error) {
        console.log("Some error in history load: " + error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="col-2">
      <p className="text-center">My cards</p>
      {loading ? `Loading... ${progress}%` : <CardLink history={history} />}
    </div>
  );
};

export default DashboardRightBox;
