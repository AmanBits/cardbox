import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Stack from "react-bootstrap/Stack";
import style from "../assets/css/mycard.module.css";
import singleviewer from "../assets/images/mycard/singleviewer.png";
import multipleviewer from "../assets/images/mycard/multipleviewer.png";
import expired from "../assets/images/mycard/expired.png";
import limit from "../assets/images/mycard/limit.jpg";
import locked from "../assets/images/mycard/locked.png";
import downloadable from "../assets/images/mycard/downloadable.jpg";

function MyCard({ obj }) {
  const apiUrl = import.meta.env.VITE_API_URL;
  const baseApiUrl = import.meta.env.VITE_API_BASE_URL;
  
  return (
    <Card style={{ width: "18rem", border: "1px solid #ddd" }}>
      <Card.Img
        variant="top"
        src={`${baseApiUrl}/uploads/${obj.image}`}
        style={{ objectFit: "cover", height: "180px" }}
      />
      <audio controls style={{ width: "100%" }}>
        <source
          src={`${apiUrl}/card/audio/${obj.song}`}
          type="audio/mpeg"
        />
      </audio>

      <Card.Body>
        <div>
          <Card.Subtitle>From : Mohammad Aman</Card.Subtitle>
        </div>
        <p className="mb-2 p-0">
          Created At :
          <span className="d-inline-block fs-6 text-dark mx-2">
            {new Date(obj.createdAt).toLocaleDateString()}
          </span>
          <span className="d-inline-block fs-7 text-muted">
            {new Date(obj.createdAt).toLocaleTimeString()}
          </span>
        </p>

        <div style={{ overflow: "hidden", marginBottom: "1rem" }}>
          <Stack direction="horizontal" gap={1} style={{ flexWrap: "wrap" }}>
            <Badge bg="primary">
              <img
                src={singleviewer}
                width="11px"
                heigth="26px"
                className="mx-1 rounded"
              />
              Multiple
            </Badge>
            {obj.viewslimit != 0 ? (
              <Badge bg="dark" title={obj.viewslimit}>
                <img
                  src={limit}
                  width="13px"
                  heigth="27px"
                  className="mx-1 rounded"
                />
                Limit
              </Badge>
            ) : null}

            {obj.expiry != "0000-00-00 00:00:00" ? (
              <Badge bg="warning" title={obj.expiry}>
                <img
                  src={expired}
                  width="13px"
                  heigth="27px"
                  className="mx-1 rounded"
                />
                Expiry
              </Badge>
            ) : null}

            {/* <Badge bg="danger" text="dark">
              <img
                src={locked}
                width="11px"
                heigth="26px"
                className="mx-1 rounded"
              />
              Locked
            </Badge>
            <Badge bg="info">
              <img
                src={downloadable}
                width="13px"
                heigth="27px"
                className="mx-1 rounded"
              />
              Downloadable
            </Badge> */}
          </Stack>
        </div>

        <hr />
        <Card.Title>Title : {obj.title}</Card.Title>
        <Card.Text>{obj.paragraph}</Card.Text>
        {/* <Button variant="primary">Share</Button> */}
      </Card.Body>
    </Card>
  );
}

export default MyCard;
