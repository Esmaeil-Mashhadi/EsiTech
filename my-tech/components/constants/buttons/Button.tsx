import { MouseEventHandler, useState  } from 'react';
import styles from './Button.module.css'
import buttonFunction from '../functions/ButtonFunction';
import { dynamicStyles } from '@/utils/dynamicStyles/HoverButtonStyle';

interface buttonPropType {
  text:string 
  styleClass?:string , 
  handler:MouseEventHandler
}
const Button = ({text, styleClass, handler }:buttonPropType) => {

  const [enter, setEnter] = useState(false);
  const [leave, setLeave] = useState(false);

  const {enterHandler , leaveHandler} = buttonFunction

  const { hoverStyle } = dynamicStyles();
  const style:Record<string , string> = hoverStyle(enter, leave );
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