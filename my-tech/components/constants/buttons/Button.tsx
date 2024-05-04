import { MouseEventHandler, useState } from 'react';
import styles from './Button.module.css'
import { dynamicStyles } from '../../../utils/dynamicStyles/HoverStyle';
import buttonFunction from '../functions/ButtonFunction';

interface buttonPropType {
  text:string 
  styleClass?:string , 
  handler: MouseEventHandler
}
const Button = ({text, styleClass, handler }:buttonPropType) => {

  const [enter, setEnter] = useState(false);
  const [leave, setLeave] = useState(false);

  const  enterHandler  =   buttonFunction.enterHandler;
  const leaveHandler = buttonFunction.leaveHandler

  console.log(enterHandler);

  const { hoverStyle } = dynamicStyles();
  const style = hoverStyle(enter, leave , text);
  return (
    <button
      style={style}
      onMouseEnter={()=>enterHandler(setEnter)}
      onMouseLeave={()=>leaveHandler(setEnter,setLeave)}
      className={styleClass}
      onClick={handler}
    >
      {text}
    </button>
  );
};


export const SubmitButton = ({ text, handler }:buttonPropType) => {
  return (
    <Button
      text={text}
      styleClass={styles.submitButton}
      handler={handler}      
    />
  );
};

export const CancelButton = ({ text, handler }:buttonPropType) => {
  return (
    <Button
      text={text}
      styleClass={styles.cancelButton}
      handler={handler}
    />
  );
};