import { useEffect } from "react";

interface ButtonLoadingInterface {
  isLoading: boolean;
  setLoading: () => void;
  handleClick: () => void;
  styleProp?: string;
  textContent?: string;
  boxModel?: string;
  disabledProps?: boolean;
}

const ButtonLoading: React.FC<ButtonLoadingInterface> = ({
  isLoading = false,
  setLoading,
  handleClick,
  styleProp = "",
  textContent = "Add to card",
  boxModel,
  disabledProps = false,
}) => {
  useEffect(() => {
    const timeId = setTimeout(setLoading, 1300);
    return () => clearTimeout(timeId);
    // eslint-disable-next-line
  }, [isLoading]);

  return (
    <div className={`relative ${boxModel}`}>
      <button
        className={`px-3 py-2 bg-[#3b82f6] rounded-md text-white hover:bg-blue-700 ${
          isLoading && "pointer-events-none"
        } ${styleProp} ${
          disabledProps && "pointer-events-none cursor-not-allowed bg-blue-300"
        }`}
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
