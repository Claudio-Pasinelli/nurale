interface Props
{
    size: number;
    color: string;
    maxHeight: number;
}

function BtnTriangoloDx({size = 24, color = '#041E42', maxHeight}: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 15 15"
      style={
        {
            width: `${size}rem`,
            height: `${size}rem`,
            maxHeight: maxHeight && `${maxHeight}rem`,
        }
      }
    >
      <path
        fill="#FFF"
        d="M13.5 6.634a1 1 0 010 1.732L2.25 14.861a1 1 0 01-1.5-.866V1.005a1 1 0 011.5-.866L13.5 6.634z"
      ></path>
    </svg>
  );
}

export default BtnTriangoloDx;
