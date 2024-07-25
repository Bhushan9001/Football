import { Link } from "react-router-dom";

function Button({
  children,
  type,
  to,
  onClick,
  classNames = "",
  animationName = "",
  animationDuration = "400",
  animationOffset = "120",
  animationDelay = "0",
  animationAnchorPlacement = "",
}) {
  const style = {
    padding: "20px 30px",
    background: type === "primary" ? "#e61b3d" : "#001b36",
    textTransform: "uppercase",
    fontWeight: 700,
  };

  if (to) {
    return (
      <Link
        to={to}
        data-aos={animationName}
        data-aos-duration={animationDuration}
        data-aos-offset={animationOffset}
        data-aos-anchor-placement={animationAnchorPlacement}
        data-aos-delay={animationDelay}
        className={`${classNames} inline-block`}
        style={style}
        onClick={onClick}
      >
        {children}
      </Link>
    );
  }
  return (
    <button
      data-aos={animationName}
      data-aos-duration={animationDuration}
      data-aos-offset={animationOffset}
      data-aos-anchor-placement={animationAnchorPlacement}
      data-aos-delay={animationDelay}
      className={classNames}
      style={style}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;

// primary: "#e61b3d", // Red
// secondary: "#001b36", // Dark Blue
// accent: "#21dfff", // Sky Blue
