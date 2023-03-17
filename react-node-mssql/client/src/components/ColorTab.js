import { MdOutlineClose } from 'react-icons/md';

const ColorTab = ({ setIsOpen, isOpen }) => {
  return (
    <div className="flex justify-start items-center bg-gray-200 text-black w-[200px] border-none">
      <div className="" onClick={() => setIsOpen(!isOpen)}>
        <MdOutlineClose />
      </div>
    </div>
  );
};

export default ColorTab;
