interface Props {
  size: number;
  color: string;
  maxHeight: number;
}

function DropdownIconGiu({ size = 24, color = '#041E42', maxHeight }: Props) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 13 11'
      style={{
        width: `${size}rem`,
        height: `${size}rem`,
        maxHeight: maxHeight && `${maxHeight}rem`,
      }}
    >
      <path
        stroke='#041E42'
        d='M6.933.75L11.696 9a.5.5 0 01-.433.75H1.737A.5.5 0 011.304 9L6.067.75a.5.5 0 01.866 0z'
      ></path>
    </svg>
  );
}

export default DropdownIconGiu;
