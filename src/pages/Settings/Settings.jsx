import { useState } from "react";
import BackButton from "../../components/BackButton.jsx/BackButton";
import SectionHeading from "../../components/SectionHeading/SectionHeading";
import CommonButton from "../../components/CommonButton/CommonButton";
import "./Settings.css";
import AddCategory from "./AddCategory";

const Settings = () => {
  const [isPopUpActive, setIsPopUpActive] = useState(false);

  const categories = [
    "Arts and Craft",
    "Nature",
    "Family",
    "Sport",
    "Friends",
    "Meditation",
  ];

  const [categoryList, setCategoryList] = useState(categories);
  return (
    <section className="h-full flex flex-col">
      {/* top part */}
      <div className="flex items-center justify-between pt-2">
        <SectionHeading>Settings</SectionHeading>
        <BackButton />
      </div>

      {/* main content */}
      <div className="pt-8 flex-grow">
        {/* header */}
        <h3 className="text-[20px] font-semibold text-headingColor leading-6 pb-6 ">
          Existing Task Category
        </h3>

        {/* task wrapper */}

        <div className="px-[10px] py-[14px] rounded-lg border border-solid border-[#E1E1E1] flex flex-col gap-[10px] h-[375px] max-h-[375px] overflow-y-auto task--wrapper">
          {categoryList.map((singleCategory, index) => (
            <div
              key={index}
              className="flex items-center justify-between px-[10px] py-3"
            >
              <p className="text-[18px] leading-4 text-[#667085] ">
                {singleCategory}
              </p>

              {/* delete button */}
              <div
                onClick={() =>
                  setCategoryList(
                    categoryList.filter((name) => name !== singleCategory)
                  )
                }
                className="w-6 h-6 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="w-full h-full"
                >
                  <path
                    d="M21 5.97998C17.67 5.64998 14.32 5.47998 10.98 5.47998C9 5.47998 7.02 5.57998 5.04 5.77998L3 5.97998"
                    stroke="#FF4C24"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8.5 4.97L8.72 3.66C8.88 2.71 9 2 10.69 2H13.31C15 2 15.13 2.75 15.28 3.67L15.5 4.97"
                    stroke="#FF4C24"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M18.8484 9.14014L18.1984 19.2101C18.0884 20.7801 17.9984 22.0001 15.2084 22.0001H8.78844C5.99844 22.0001 5.90844 20.7801 5.79844 19.2101L5.14844 9.14014"
                    stroke="#FF4C24"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10.3281 16.5H13.6581"
                    stroke="#FF4C24"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9.5 12.5H14.5"
                    stroke="#FF4C24"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* add category area */}

      <div onClick={() => setIsPopUpActive(true)} className="w-[270px] ml-auto">
        <CommonButton text={"Add New Category"} />
      </div>

      {/* add category */}
      <AddCategory isActive={isPopUpActive} setIsActive={setIsPopUpActive} />
    </section>
  );
};

export default Settings;
