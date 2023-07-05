interface Props {
  size: number;
  color: string;
  maxHeight: number;
}

function XCloseIcon({ size = 24, color = '#041E42', maxHeight }: Props) {
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
        d='M18 6L6 18M6 6l12 12'
      ></path>
    </svg>
  );
}

export default XCloseIcon;
