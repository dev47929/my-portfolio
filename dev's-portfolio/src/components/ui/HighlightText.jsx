import React, { useState } from "react";

export default function HighlightText({
  children,
  highlightColor = "#00ff88",
  textColor = "#ffffff",
  activeTextColor = "#0a0a0a",
  direction = "left",
  duration = 0.35,
  padding = "0.1em 0.3em",
  as: Tag = "span",
  className = "",
  alwaysOn = false,
  rounded = "2px",
}) {
  const [hovered, setHovered] = useState(false);
  const active = hovered || alwaysOn;

  const bgPosition = direction === "right" ? "right center" : "left center";

  return (
    <Tag
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative inline-block cursor-default transition-colors ${className}`}
      style={{
        color: active ? activeTextColor : textColor,
        backgroundImage: `linear-gradient(${highlightColor}, ${highlightColor})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: bgPosition,
        backgroundSize: active ? "100% 100%" : "0% 100%",
        padding,
        borderRadius: rounded,
        transition: `background-size ${duration}s cubic-bezier(0.4, 0, 0.2, 1),
                     color ${duration}s cubic-bezier(0.4, 0, 0.2, 1)`,
        boxShadow: active
          ? `0 0 24px -6px ${highlightColor}55`
          : "0 0 0 transparent",
      }}
    >
      {children}
    </Tag>
  );
}
