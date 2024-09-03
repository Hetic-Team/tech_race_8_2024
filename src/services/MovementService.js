// CarCommands.js

export const getStopPayload = () => {
  const command = {
    cmd: 1,
    data: [0,0,0,0],
  };
  return command;
};
// @ts-ignore
export const getForwardsPayload = (speed) => {
  const command = {
    cmd: 1,
    data: [speed, speed, speed, speed],
  };
  return command;
};

// @ts-ignore
export const getBackwardsPayload = (speed) => {
  const command = {
    cmd: 1,
    data: [-speed, -speed, -speed, -speed],
  };
  return command;
};

// @ts-ignore
export const getLeftPayload = (speed) => {
  const command = {
    cmd: 1,
    data: [0, 0, speed, speed],
  };
  return command;
};

// @ts-ignore
export const getRightPayload = (speed) => {
  const command = {
    cmd: 1,
    data: [speed, speed, 0, 0],
  };
  return command;

};
// @ts-ignore
export const getUpRightPayload = (speed) => {
  const command = {
    cmd: 1,
    data: [speed, speed, speed/2, speed/2],
  };
  return command;

};
// @ts-ignore
export const getDownRightPayload = (speed) => {
  const command = {
    cmd: 1,
    data: [-speed, speed, 0, 0],
  };
  return command;

};
// @ts-ignore
export const getUpLeftPayload = (speed) => {
  const command = {
    cmd: 1,
    data: [0,0,speed,speed],
  };
  return command;

};
// @ts-ignore
export const getDownLeftPayload = (speed) => {
  const command = {
    cmd: 1,
    data: [0, 0, -speed, -speed],
  };
  return command;

};
export const getCameraOnPayload = () => {
  const command = {
 "cmd": 9,
          "data": 1
  }
  return command;
}
/**
 * Get the payload for the camera movement command
 * @param {Number} x 
 * @param {Number} y 
 * @returns 
 */
export const mapJoystickToCameraAngles = (x, y) => {
  // Ensure x and y are within the range -1 to 1
  x = Math.max(-1, Math.min(1, x));
  y = Math.max(-1, Math.min(1, y));

  // Calculate the vertical angle based on y-axis
  const verticalAngle = 20 + ((y + 1) * 140 / 2);

  // Calculate the horizontal angle based on x-axis
  const horizontalAngle = 20 + ((x + 1) * 140 / 2);

  return [verticalAngle, horizontalAngle];
}
