import styled from 'styled-components';
interface Props {
  current: string;
}
const Li = styled.div<Props>`
  margin-right: 2rem;
  padding: '0px';
  background-color: 'gray';
  border: '0px';
  border-color: rgba(123, 97, 255, 0.05);
  width: 100%;
  height: fit-content;
  list-style: none;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  border-radius: 0.5rem;
  cursor: pointer;
  &:hover {
    background-color: rgba(123, 97, 255, 0.05);
  }
  color: ${({ current }) => (current === 'current' ? '#EF426F' : 'black')};
`;
export default Li;
