
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
  const [isSort, setIsSort] = useState({type:2, list:[]});

  //랜덤순
  const sortHandler = () => {
    if(posts.length > 0) {
      let arr = [...posts];
      let sort = arr;
      let type = isSort.type;
      if(isSort.type === 1) { type = 2; sort = arr.sort((a,b) => (Object.keys(b.likes).length - Object.keys(a.likes).length)) }
      if(isSort.type === 2) { type = 1; sort = arr.sort(() => Math.random() - 0.5); }
      setIsSort({type:type, list:sort});
    }
  }

  useEffect(()=>{
    sortHandler()
  },[])

  return (
    <WidgetWrapper>
      <FlexBetween mb="1.25rem" >
        <Typography color="#333" variant="h4" fontWeight="600" >
          Popular Feed
        </Typography>
        <Button onClick={(e) => sortHandler()}>{isSort.type === 1 ? '하트 많은순' : '기본순'}</Button>
      </FlexBetween>
    
      {isSort.list.map((item, i)=> (i < 3 ?
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