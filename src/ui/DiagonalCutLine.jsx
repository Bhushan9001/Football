import styled from "styled-components";

function DiagonalCutLine({ color, classNames = "", direction = "left" }) {
  const StyledElement = styled.span`
    display: inline-block;

    background: ${(props) => props.color};

    &::before {
      content: "";
      display: inline-block;
      position: absolute;
      background: inherit;
      width: 100%;
      height: 100%;
      transform: ${(props) =>
        props.direction === "left" ? "skewX(-45deg)" : "skewX(-135deg)"};
      right: ${(props) => (props.direction === "left" ? "-100px" : "20px")};
    }
  `;

  return (
    <StyledElement className={classNames} color={color} direction={direction} />
  );
}

export default DiagonalCutLine;
