
import OneAdWidget from "./OneAdWidget";
import WidgetWrapper from "components/WidgetWrapper";
import { Typography, Button } from "@mui/material";
import { useEffect, useRef,useState } from "react";
import { useSelector } from "react-redux";
import FlexBetween from "components/FlexBetween";
import React from "react";


const PopularAdsWidget = () => {
  // const [randomList, setRandomList] = useState([]);
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  const posts = useSelector((state) => state.posts);
  // const ref = useRef([]);
  const [ref, setRef] = useState({type:1, list:[]});

  //랜덤순
  const initialLength = () => {
    if(posts.length > 0) {
      let arr = [...posts];
      const sort = arr.sort(() => Math.random() - 0.5);
      setRef({type:1, list:sort});
    }
  }

  //하트많은순
  const heartLength =  () => {
    if (posts.length > 0) {
      let arr = [...posts];
      let sort = arr.sort((a,b) => (Object.keys(b.likes).length - Object.keys(a.likes).length))
      //setRef(sort);
      setRef({type:2, list:sort});
      console.log(sort)  
    }
  }

  useEffect(()=>{
    initialLength()
  },[])
  const sortRef = useRef(false);
  const handleClick = () => {
    sortRef.current = !sortRef.current;
    if(sortRef.current) { //하트많은순\
      heartLength();
    }
    if(!sortRef.current) {//랜덤
      initialLength();
    }
  }


  return (
    <WidgetWrapper>
      <FlexBetween mb="1.25rem" >
        <Typography color="#333" variant="h4" fontWeight="600" >
          Popular Feed
        </Typography>
        <Button onClick={(e) => handleClick()}>{ref.type === 1 ? '하트 많은순' : '기본순'}</Button>
      </FlexBetween>
    
      {ref.list.map((item, i)=> (i < 3 ?
            <OneAdWidget 
              key={i} 
              post={item}
            />
      : null
      ))
      }
    </WidgetWrapper>
   
  );
};

export default React.memo(PopularAdsWidget);