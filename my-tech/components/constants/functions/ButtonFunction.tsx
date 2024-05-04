class ButtonClass { 

 enterHandler = (setEnter:Function)=>{
    setEnter(true)
 }
 leaveHandler = (setEnter:Function , setLeave:Function)=>{
    setEnter(false)
    setLeave(true)
    setTimeout(() => {
            setEnter(false)
            setLeave(false)
    }, 300);
 }
}


const buttonFunction = new ButtonClass()

export default buttonFunction