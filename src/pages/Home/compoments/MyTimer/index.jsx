import React, { useEffect ,useState} from "react";


export default function MyTimer(){

    //获取实时时间
    const [time, setTime] = useState(new Date());

       // 渲染实时时间
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

    return(
             <span>{time.toLocaleString()}</span>
    )
}