import { useState } from "react";
import { Link } from "react-router";
import type { Route } from "./+types/home";
import blueImage from "../../assets/blue.jpg";
import redImage from "../../assets/red.jpg";
import yskBackground from "../../assets/ysk-background.jpg";
import ryuuBackground from "../../assets/ryuu-background.jpg";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Yin-Yang" },
    { name: "description", content: "Balance in all things" },
  ];
}

export default function Home() {
  const [selectedColor, setSelectedColor] = useState<"blue" | "red">(() => {
    // Check localStorage for saved color
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("selectedGroup");
      return (saved === "red" || saved === "blue") ? saved : "blue";
    }
    return "blue";
  });

  const handleYinClick = () => {
    setSelectedColor("red");
    localStorage.setItem("selectedGroup", "red");
  };

  const handleYangClick = () => {
    setSelectedColor("blue");
    localStorage.setItem("selectedGroup", "blue");
  };

  return (
    <div 
      className={`page-container bg-${selectedColor}`}
      style={{
        backgroundImage: selectedColor === "blue" 
          ? `url(${yskBackground})` 
          : `url(${ryuuBackground})`
      }}
    >
      <div className="yin-yang-container">
        <h1 className="yin-yang-title">
          {selectedColor === "blue" ? "Yashika" : "Ryuu"}
        </h1>
        <div className="circle">
          <div className="left-half-click" onClick={handleYangClick}></div>
          <div className="right-half-click" onClick={handleYinClick}></div>

          <div className="yin-wrapper">
            <div className="yin"></div>
          </div>
          <div className="feher-wrapper">
            <div className="feher"></div>
          </div>
          <div className="yang-wrapper">
            <div className="yang"></div>
          </div>
          <div className="dots-wrapper">
            <div
              className="p-blue"
              style={{ backgroundImage: `url(${redImage})` }}
            ></div>
            <div
              className="p-red"
              style={{ backgroundImage: `url(${blueImage})` }}
            ></div>
          </div>
        </div>
        
        <Link 
          to={`/landing/${selectedColor === "blue" ? "yashika" : "ryuu"}`}
          className="landing-button"
        >
          Enter
        </Link>
      </div>
    </div>
  );
}
