import NoTaskImg from "../../../assets/images/noTask.png";

export default function NoTask() {
  return (
    <div className="flex flex-col items-center justify-center">
      <img
        className=" w-full h-[250px] lg:w-[423px] lg:h-[336px] object-cover"
        src={NoTaskImg}
        alt=""
      />
      <p className=" text-xl lg:text-2xl font-semibold text-headingColor mt-[28px] text-center lg:text-start">
        No Task is Available yet, Please Add your New Task
      </p>
    </div>
  );
}
