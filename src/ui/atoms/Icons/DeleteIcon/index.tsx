interface Props {
  size: number;
  color: string;
  maxHeight: number;
}

function DeleteIcon({ size = 24, color = '#041E42', maxHeight }: Props) {
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
        stroke='#EF426F'
        strokeLinecap='round'
        strokeWidth='2'
        d='M10 15v-3m4 3v-3M3 7h18v0c-.932 0-1.398 0-1.765.152a2 2 0 00-1.083 1.083C18 8.602 18 9.068 18 10v6c0 1.886 0 2.828-.586 3.414C16.828 20 15.886 20 14 20h-4c-1.886 0-2.828 0-3.414-.586C6 18.828 6 17.886 6 16v-6c0-.932 0-1.398-.152-1.765a2 2 0 00-1.083-1.083C4.398 7 3.932 7 3 7v0zm7.068-3.63c.114-.106.365-.2.715-.267A6.68 6.68 0 0112 3c.44 0 .868.036 1.217.103.35.067.6.161.715.268'
      ></path>
    </svg>
  );
}

export default DeleteIcon;
