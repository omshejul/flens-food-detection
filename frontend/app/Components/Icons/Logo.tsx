import React from "react";
interface Props {
  size?: string;
  fill?: string;
  className?: string;
}
const Logo: React.FC<Props> = (props) => {
  return (
    <>
      <svg
        className={`self-center relative ${props.className || ""} ${
          props.fill || "fill-[#495cef]"
        }`}
        width={props.size || "24"}
        height={props.size || "24"}
        viewBox="0 0 6.35 6.35"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <path
            d="M4.598.579h1.204c.192 2.577-1.118 2.577-1.118 2.577s1.31 0 1.118 2.61H4.598v-.543c-.494.461-1.024.692-1.592.692-.718 0-1.31-.26-1.78-.777C.763 4.608.53 3.948.53 3.156c0-.777.233-1.425.698-1.944A2.249 2.249 0 012.974.435c.603 0 1.145.248 1.624.746zM1.754 3.156c0 .497.133.902.4 1.215.273.316.617.474 1.033.474.444 0 .802-.153 1.075-.458.784-.767-1.256-1.23-1.256-1.23s2.05-.234 1.256-1.178c-.273-.309-.628-.463-1.065-.463-.412 0-.756.156-1.033.469-.273.316-.41.706-.41 1.171z"
            fontFamily="Futura"
            aria-label="a"
            fontSize="16.933"
            textAnchor="middle"
            strokeWidth="1.553"
            strokeLinecap="round"
            paintOrder="markers stroke fill"
          />
        </g>
      </svg>
    </>
  );
};

export default Logo;
