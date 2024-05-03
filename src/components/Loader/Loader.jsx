import { Triangle } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="w-full h-full items-center justify-center flex">
      <Triangle
        visible={true}
        height="180"
        width="180"
        color="#60E5AE"
        ariaLabel="triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default Loader;
