
import { useNavigate } from "react-router-dom";

export default function BackButton() {
  const navigate = useNavigate();
  return (
    <button
      className=" py-2.5 lg:py-3 px-[36px] lg:px-[53px] font-semibold rounded-[8px] bg-primaryColor text-headingColor text-sm lg:text-base"
      onClick={() => navigate(-1)}
    >
      Back
    </button>
  );
}
