import styled, { keyframes } from "styled-components";

const wheelAnimation = keyframes`
  to {
    opacity: 0;
    top: 40px;
  }
`;

const StyledField = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const StyledMouse = styled.div`
  width: 30px;
  height: 50px;
  border: 1px solid #21dfff;
  border-radius: 30px;
  position: relative;

  &::before {
    content: "";
    width: 7px;
    height: 7px;
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #21dfff;
    border-radius: 50%;
    opacity: 1;
    animation: ${wheelAnimation} 2s infinite;
    -webkit-animation: ${wheelAnimation} 2s infinite;
  }
`;

function ScrollDownAnimationIcon() {
  return (
    <StyledField>
      <StyledMouse />
    </StyledField>
  );
}

export default ScrollDownAnimationIcon;
