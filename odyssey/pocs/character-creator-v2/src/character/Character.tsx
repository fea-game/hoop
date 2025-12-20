import type { Pose } from "../types";
import Arm from "./front/arm.svg?react";

export function Character({ color }: { pose: Pose; color: string }) {
  return (
    <div className="w-full h-full">
      <Arm
        style={{
          color,
          height: "128px",
          transform: "scaleX(-1)",
          transformOrigin: "center",
          // Ensure the transform is applied relative to the element's box
          transformBox: "fill-box",
        }}
      />
      <Arm style={{ color, height: "128px" }} />
    </div>
  );
}
