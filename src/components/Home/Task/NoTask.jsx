import NoTaskImg from "../../../assets/images/noTask.png";

export default function NoTask() {
  return (
    <div className="flex flex-col items-center justify-center">
      <img
        className="w-[423px] h-[336px] object-cover"
        src={NoTaskImg}
        alt=""
      />
      <p className="text-2xl font-semibold text-headingColor mt-[28px]">
        No Task is Available yet, Please Add your New Task
      </p>
    </div>
  );
}
