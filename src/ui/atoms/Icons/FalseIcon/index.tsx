interface Props {
  size: number;
  color: string;
  maxHeight: number;
}

function FalseIcon({ size = 24, color = '#041E42', maxHeight }: Props) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 25 25'
      style={{
        width: `${size}rem`,
        height: `${size}rem`,
        maxHeight: maxHeight && `${maxHeight}rem`,
      }}
    >
      <path
        stroke='#041E42'
        strokeLinecap='square'
        strokeLinejoin='round'
        strokeWidth='2'
        d='M20 12H4'
      ></path>
    </svg>
  );
}

export default FalseIcon;
