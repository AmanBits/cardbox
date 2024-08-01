import { useState } from "react";
import CreateBox from "./CreateBox";

const DashboardLeftBox = () => {
  const [isOpen, setOpen] = useState(false);

  const createCard = () => {
    setOpen(true);
  };
  const closeBox = () => {
    setOpen(false);
  };
  return (
    <div className="col-2 mx-auto">
      <button className="btn btn-outline-info mt-3" onClick={createCard}>
        New Card
      </button>
      <CreateBox isOpen={isOpen}  onClose={closeBox} />
    </div>
  );
};

export default DashboardLeftBox;
