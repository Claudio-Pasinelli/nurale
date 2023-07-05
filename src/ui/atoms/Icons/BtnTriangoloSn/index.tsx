interface Props {
  size: number;
  color: string;
  maxHeight: number;
}

function BtnTriangoloSn({ size = 24, color = '#041E42', maxHeight }: Props) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 15 15'
      style={{
        width: `${size}rem`,
        height: `${size}rem`,
        maxHeight: maxHeight && `${maxHeight}rem`,
      }}
    >
      <path
        fill='#FFF'
        d='M.5 8.366a1 1 0 010-1.732L11.75.139a1 1 0 011.5.866v12.99a1 1 0 01-1.5.866L.5 8.366z'
      ></path>
    </svg>
  );
}

export default BtnTriangoloSn;
