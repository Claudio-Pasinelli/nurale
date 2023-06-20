interface Props
{
    size: number;
    color: string;
    maxHeight: number;
}

function DropdownIconSu({size = 24, color = '#041E42', maxHeight}: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 13 11"
      style={
        {
            width: `${size}rem`,
            height: `${size}rem`,
            maxHeight: maxHeight && `${maxHeight}rem`,
        }
      }
    >
      <path
        stroke="#041E42"
        d="M6.933 10.25a.5.5 0 01-.866 0L1.304 2a.5.5 0 01.433-.75h9.526a.5.5 0 01.433.75l-4.763 8.25z"
      ></path>
    </svg>
  );
}

export default DropdownIconSu;
