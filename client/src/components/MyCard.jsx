import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import style from "../assets/css/mycard.module.css"
function MyCard({ obj }) {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img
        variant="top"
        src={`http://localhost:3000/uploads/${obj.image}`}
      />
      <audio controls>
        <source
          src={`http://localhost:3000/api/card/audio/${obj.song}`}
          type="audio/mpeg"
        />
      </audio>

      <Card.Body>
        <div className=""><span className="">From :</span><span className="mx-2">Mohammad Aman</span></div>
        <p className={style.custom_small}>CreatedAt : 20/30/12</p>
        <p className={style.custom_small}>Tags : Multiple, Expire, Downloadable, Times view</p>
        <Card.Title>{obj.title}</Card.Title>
        <Card.Text>{obj.paragraph}</Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}

export default MyCard;
