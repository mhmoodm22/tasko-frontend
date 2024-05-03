import { useState, useEffect, useRef } from "react";

export default function CategorySelect() {
  const categoryDatas = [
    { id: "arts", title: "Arts and Craft" },
    { id: "nature", title: "Nature" },
    { id: "family", title: "Family" },
    { id: "sport", title: "Sport" },
    { id: "friends", title: "Friends" },
    { id: "meditation", title: "Meditation" },
  ];

  const [categoryData, setCategoryData] = useState(categoryDatas);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [isShow, setIsShow] = useState(false);
  const triggerRef = useRef(null);

  const handleSelect = (data) => {
    setSelectedStatus(data);
    setIsShow(false);
  };

  useEffect(() => {
    document.addEventListener("click", (event) => {
      let trigger = triggerRef.current;
      let dropdown = document.querySelector(".select--dropdown");
      if (trigger && dropdown) {
        if (
          !trigger.contains(event.target) &&
          !dropdown.contains(event.target)
        ) {
          setIsShow(false);
        }
      }
    });
  }, []);

  return (
    <div className="relative cursor-pointer">
      <div
        ref={triggerRef}
        className={`flex w-[305px] items-center justify-between py-[12px] px-[16px] border-[1px] border-[#e1e1e1] rounded-[8px] text-paraLight font-medium`}
        onClick={() => setIsShow(!isShow)}
      >
        {selectedStatus === "" ? "Select Task Category" : selectedStatus.title}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="10"
          viewBox="0 0 18 10"
          fill="none"
        >
          <path
            d="M9.01191 9.93353C9.21247 9.93178 9.40452 9.8522 9.54752 9.71156L17.1233 2.1358C17.2613 1.99292 17.3376 1.80156 17.3359 1.60292C17.3342 1.40429 17.2545 1.21428 17.114 1.07382C16.9736 0.93336 16.7836 0.853686 16.5849 0.85196C16.3863 0.850234 16.1949 0.926594 16.0521 1.06459L9.01191 8.10474L1.97176 1.06459C1.90188 0.992236 1.81828 0.934522 1.72586 0.894818C1.63343 0.855114 1.53402 0.834216 1.43343 0.833342C1.33284 0.832467 1.23308 0.851635 1.13998 0.889727C1.04688 0.927818 0.96229 0.984071 0.891159 1.0552C0.820029 1.12633 0.763775 1.21092 0.725684 1.30402C0.687592 1.39712 0.668424 1.49688 0.669299 1.59747C0.670173 1.69806 0.691072 1.79747 0.730776 1.8899C0.77048 1.98233 0.828193 2.06592 0.900549 2.1358L8.47631 9.71156C8.61931 9.8522 8.81135 9.93178 9.01191 9.93353Z"
            fill="#667085"
          />
        </svg>
      </div>
      <ul
        className={`select--dropdown absolute ${
          isShow ? "show" : ""
        } top-[56px] right-0 w-[220px] h-[260px] overflow-auto bg-white py-[6px] px-[14px] shadow-[25px_23px_68px_0px_rgba(10,48,61,0.06)] rounded-[8px]`}
      >
        {categoryData.map((data) => (
          <li
            key={data.id}
            className="form-group option"
            onClick={() => handleSelect(data)}
          >
            <input type="radio" id={data.id} name="category--radio" />
            <label htmlFor={data.id}>{data.title}</label>
          </li>
        ))}
      </ul>
    </div>
  );
}
