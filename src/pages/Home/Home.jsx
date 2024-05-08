import CategorySelect from "../../components/Select/CategorySelect";
import StatusSelect from "../../components/Select/StatusSelect";
import CommonButton from "../../components/CommonButton/CommonButton";
import AddSvg from "../../assets/images/addicon.svg";
import TaskList from "../../components/Home/Task/TaskList";
import SectionHeading from "../../components/SectionHeading/SectionHeading";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section>
      <div className="flex items-center justify-between  flex-col gap-2 lg:flex-row">
        <SectionHeading>All Task List</SectionHeading>

        {/* selections area */}
        <div className="flex w-full  items-start gap-[16px] flex-col lg:w-fit lg:flex-row">
          <div className=" w-full  lg:w-[305px]">
            <CategorySelect />
          </div>
          <div className="w-full lg:w-[220px]">
            <StatusSelect />
          </div>
          <Link to={"/add-task"} className="w-full sm:w-[231px] inline-block">
            <CommonButton icon={AddSvg} text="Add New Task" />
          </Link>
        </div>
      </div>

      {/* tasks  */}
      <div className="tasklist--wrapper overflow-y-auto max-h-[55vh] mt-8 lg:mt-14 pr-2 pb-16 lg:pb-4 ">
        <TaskList />
      </div>
    </section>
  );
};

export default Home;
