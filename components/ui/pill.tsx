import React, { useEffect } from "react";
import { useSpring, animated, easings } from "react-spring";

interface PillProps {
  title: string;
  onPillClick: (e: any) => void;
  selected: boolean;
  setRef: (el: HTMLDivElement | null) => void;
  left: number;
}

const Pill: React.FC<PillProps> = ({ title, onPillClick, selected, setRef, left }) => {
  const [styles, api] = useSpring(() => ({
    left: left,
    borderColor: selected ? "rgba(10,102,194,1)" : "rgba(114,114,114,0.8)",
    color: selected ? "rgba(10,102,194,1)" : "rgba(114,114,114,1)"
  }));
  useEffect(() => {
    api.start({
      left: left,
      config: { easing: easings.easeOutElastic, duration: 300 }
    });
  }, [left, api]);

  useEffect(() => {
    api.start({
      borderColor: selected ? "rgba(10,102,194,1)" : "rgba(114,114,114,0.8)",
      color: selected ? "rgba(10,102,194,1)" : "rgba(114,114,114,1)",
      config: { easing: easings.easeOutCubic }
    });
  }, [selected, api]);

  return (
    <animated.div
      ref={setRef}
      onClick={onPillClick}
      style={{ ...styles }}
      className="
      rounded-3xl border-t-2 border-r-2 border-b-2 border-l-2
      text-sm select-none cursor-pointer
      absolute  
      bg-[#232323] 
       w-fit 
      p-1 px-2  
      "
    >
      {title}
    </animated.div>
  );
};

export default Pill;