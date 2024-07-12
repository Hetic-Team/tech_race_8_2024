import React, { useState, useEffect } from "react";
import ReactNipple from "react-nipple";
import DebugView from "react-nipple/lib/DebugView";
//import { moveRobot } from "../utils/ROS/ROSFunctions";

function Joystick() {
  // state
  const [data, setData] = useState();

  const [state, setState] = useState({
    axes: [0, 0, 0, 0, 0, 0],
    buttons: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  });

  useEffect(() => {
   // moveRobot({ axes: state.axes, buttons: state.buttons });
   console.log(state.axes);


  }, [state]);

  // functions
  const handleJoystickStart = (evt, data) => {
    setData(data);
  };

  const handleJoystickEnd = (evt, data) => {

    setData(data);
    
    setState({
      axes: [0, 0, 0, 0, 0, 0]
    });

  };

  const handleJoystickMove = (evt, data) => {
    setData(data);
  };

  const handleJoystickDir = (evt, data) => {
    setData(data);
/*


zone: document.getElementById('zone_joystick'),
        threshold: 0.1,
        position: { left: 50 + '%' },
        mode: 'static',
        size: 150,
        color: '#000000',

        

    manager.on('move', function (event, nipple) {*/
 // let max_linear = 5.0; // m/s
  //let max_angular = 2.0; // rad/s
  let max_distance = 75.0; // pixels;
  console.log("Senas ", data.distance);
  let y_direction = Math.sin(data.angle.radian);// *  data.distance/max_distance;
  let x_direction = -Math.cos(data.angle.radian);//  * data.distance/max_distance;
  let x_inverte = Math.cos(data.angle.radian);
  
  if(y_direction <= 0.2 || y_direction <= -0.2){
      y_direction = 0;
  }


//});
    
   // let linear_speed = Math.sin(data.angle.radian) * ;

    let x = data.direction.x === "right" ? 1 : -1;
    let y = data.direction.y === "up" ? 1 : -1;

   // let max_distance = 150 / 2;
     if(data.distance === 0){
      x = 0.0;
      y = 0.0;
    }

    setState({
      axes: [x, y, 0, 0, 0, 0],
      buttons: [0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0],
    });
     console.log("Direction x: "+ x_direction +"  y: "+ y_direction );
     console.log("Exos x: "+ x +"  y: "+ y )
          console.log("invertido x: ", x_inverte)
    // console.log(" valor diustancia  "+ data.angle.radian);
    //console.log(" valor linear_speed  "+ linear_speed);
    //console.log(" valor angular_speed  "+  angular_speed);
  };

  const handleJoystickPlain = (evt, data) => {
    setData(data);
  };

  const handleJoystickShown = (evt, data) => {
    setData(data);
  };

  const handleJoystickHidden = (evt, data) => {
    setData(data);
  };

  const handleJoystickPressure = (evt, data) => {
    setData(data);
  };

  return (
    <div>
      <div className="joystick-wrapper mt-5">
        <ReactNipple
          className="joystick is-relative"
          options={{
            mode: "static",
            color: "hsl(219, 84%, 56%)",
            position: { top: "50%", left: "50%" },
            size: 150,
            treshold: 0.1,
          }}
          style={{
            width: 250,
            height: 250,
          }}
          onStart={handleJoystickStart}
          onEnd={handleJoystickEnd}
          onMove={handleJoystickMove}
          onDir={handleJoystickDir}
          onPlain={handleJoystickPlain}
          onShown={handleJoystickShown}
          onHidden={handleJoystickHidden}
          onPressure={handleJoystickPressure}
        />
        <DebugView data={data} />
      </div>
    </div>
  );
}

export default Joystick;