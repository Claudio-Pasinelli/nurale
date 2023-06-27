import { ReactNode } from 'react'

interface Props {
  show: boolean
  children: ReactNode
}

const Modal = ({ show, children }: Props) => {
  return (
    <div
      style={{
        display: show ? 'flex' : 'none',
        height: '100%',
        width: '100%',
        background: 'white',
        border: '1px solid #857dac',
        borderRadius: '10px',
        padding: '3rem',
      }}
    >
      {/* <div className="h-4/5 w-3/4 mt-16 mr-auto ml-auto relative transform overflow-auto rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all"> */}
      <div style={{width: '100%'}}>
        {children}
      </div>
    </div>
  )
}

export default Modal
