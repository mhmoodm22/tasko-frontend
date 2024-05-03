export default function AuthButton({children}) {
  return (
    <button type="submit" className="p-[15px] block w-full rounded-[8px] bg-primaryColor text-headingColor text-[18px] font-semibold capitalize">
       {children}
    </button>
  )
}
 