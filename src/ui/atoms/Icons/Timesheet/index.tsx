interface Props
{
    size: number;
    color: string;
    maxHeight: number;
}

function Timesheet({size = 24, color = '#041E42', maxHeight}: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      style={
        {
            width: `${size}rem`,
            height: `${size}rem`,
            maxHeight: maxHeight && `${maxHeight}rem`,
        }
      }
    >
      <circle cx="12" cy="12" r="9" stroke="#041E42" strokeWidth="2"></circle>
      <path
        stroke="#041E42"
        strokeLinecap="round"
        strokeWidth="2"
        d="M16.5 12h-4.25a.25.25 0 01-.25-.25V8.5"
      ></path>
    </svg>
  );
}

export default Timesheet;
