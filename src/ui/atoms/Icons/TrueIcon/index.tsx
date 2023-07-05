interface Props {
  size: number;
  color: string;
  maxHeight: number;
}

function TrueIcon({ size = 24, color = '#041E42', maxHeight }: Props) {
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
      <path stroke='#041E42' strokeWidth='3' d='M6.667 18.667l5.333 4L24 8'></path>
    </svg>
  );
}

export default TrueIcon;
