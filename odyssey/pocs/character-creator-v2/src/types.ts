export const Pose = {
  Idle: "idle",
  JumpShot: "jump_shot",
} as const;

export type Pose = (typeof Pose)[keyof typeof Pose];
