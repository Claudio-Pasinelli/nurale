interface Props {
  size: number;
  color: string;
  maxHeight: number;
}

function InserimentoVeloce({ size = 24, color = '#041E42', maxHeight }: Props) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      style={{
        width: `${size}rem`,
        height: `${size}rem`,
        maxHeight: maxHeight && `${maxHeight}rem`,
      }}
    >
      <path
        stroke={color}
        strokeWidth='2'
        d='M9 6a3 3 0 106 0 3 3 0 00-6 0h0zm-4.562 7.902a3 3 0 103 5.195 3 3 0 00-3-5.196h0zm15.124 0a2.999 2.999 0 11-2.998 5.194 2.999 2.999 0 012.998-5.194h0z'
      ></path>
      <path
        fill={color}
        fillRule='evenodd'
        d='M9.07 6.643a3 3 0 01.42-2.286 9 9 0 00-6.23 10.79 3 3 0 011.77-1.506 6.998 6.998 0 014.04-6.998zm5.86 0a7 7 0 014.04 6.998 3 3 0 011.77 1.507 9.002 9.002 0 00-6.23-10.79 3.002 3.002 0 01.42 2.285zm3.3 12.852a3.005 3.005 0 01-2.19-.779 7 7 0 01-8.08 0 3.004 3.004 0 01-2.19.78 9 9 0 0012.46 0z'
        clipRule='evenodd'
      ></path>
    </svg>
  );
}

export default InserimentoVeloce;
