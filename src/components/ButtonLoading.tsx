import { useEffect } from "react";

interface ButtonLoading {
  isLoading: boolean;
  setLoading: () => void;
  handleClick: () => void;
  style?: string;
  textContent?: string;
  boxModel?: string;
}

const ButtonLoading: React.FC<ButtonLoading> = ({
  isLoading = false,
  setLoading,
  handleClick,
  style = "",
  textContent = "Add to card",
  boxModel,
}) => {
  useEffect(() => {
    const timeId = setTimeout(setLoading, 1300);
    return () => clearTimeout(timeId);
  }, [isLoading]);

  return (
    <div className={`relative ${boxModel}`}>
      <button
        className={`px-3 py-2 bg-[#3b82f6] rounded-md text-white hover:bg-blue-700 ${
          isLoading && "pointer-events-none"
        } ${style}`}
        onClick={handleClick}
      >
        <i className="fa-solid fa-cart-shopping mr-2"></i>
        {textContent}
      </button>
      <div
        className={`absolute z-10 top-0 left-0 h-full bg-[#ffffff87]  ${
          isLoading ? "w-full transition-all duration-[1.3s]" : "w-0"
        }`}
      ></div>
    </div>
  );
};

export default ButtonLoading;
