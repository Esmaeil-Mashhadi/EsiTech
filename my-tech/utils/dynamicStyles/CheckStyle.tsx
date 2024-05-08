
type DynamicStylesType = {
    check: {
      '--bgColor': string;
      '--transform': string;
    };
    cross: {
      '--bgColor': string;
      '--transform': string;
    };
    svgCheckStyle: {
      opacity: number;
      scale: number;
      transition: string;
    };
    svgCrossStyle: {
      opacity: number;
      scale: number;
      transition: string;
    };
    choice?: 'check' | 'cross';
  };
const checkStyle = (choice:"check"|'cross')=>{
    const svgCrossStyle = {
    'opacity': choice =='check'?0 : 1,
    'scale': choice =='check'?0 : 1,
    'transition':'.5s ease'
}

const svgCheckStyle ={
    'opacity': choice =='check'?1 : 0,
    'scale': choice =='check'?1: 0,
    'transition':'.5s ease'
}


const cross={
    '--bgColor':"pink",
    '--transform':"0%",
}
const check={
    '--bgColor':"chartreuse",
    '--transform':"100%",
}

return {check , cross , svgCheckStyle , svgCrossStyle}
}

export type {
    DynamicStylesType
}
export {
checkStyle 
}