import styled from 'styled-components'
interface Props {
    column?: string
    width?: number
    height?: number
    border?: string
    padding?: number
    leftMargin?: number
    alignItems?: 'flex-start' | 'end' | 'center'
    bgcolor?: string
    heightType?: string
    widthType?: string
}
const Flex = styled.div<Props>`
display: flex;
flex-direction: ${({ column }) => column || 'row'};
align-items ${({ alignItems }) => alignItems || ''};
width: ${({ width, widthType = 'vw' }) => `${width}${widthType}` || '100%'};
height: ${({ height, heightType = 'vh' }) =>
    `${height}${heightType}` || '50%'};
border: ${({ border }) => border || ''};
padding: ${({ padding }) => `${padding}rem` || '10px'};
margin-left:${({ leftMargin }) => `${leftMargin}px` || '10px'};
background:${({ bgcolor }) => bgcolor || '#242424'}
`

export default Flex