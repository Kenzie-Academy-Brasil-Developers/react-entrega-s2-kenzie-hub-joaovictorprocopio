import styled from "styled-components";

const ModalRegisterTechnology = styled.div`
  display: ${(props) => props.display};
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2000;
  width: 100vw;
  height: 100vh;
  background-color: rgba(9, 9, 9, 0.5);
`;
export default ModalRegisterTechnology;
