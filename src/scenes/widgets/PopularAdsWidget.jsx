
import OneAdWidget from "./OneAdWidget";
import WidgetWrapper from "components/WidgetWrapper";
import { Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";


const PopularAdsWidget = () => {
  // const [randomList, setRandomList] = useState([]);

  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  const posts = useSelector((state) => state.posts);

  const ref = useRef([]);

  useEffect(()=>{
    if (ref.current.length == 0){
      // while (true) {
      //   let first = Math.floor(Math.random() * posts.length);
      //   if (ref.current.includes(first)){
      //     continue
      //   }
      //   ref.current.push(first);
      //   if(ref.current.length == 3){
      //     break
      //   }
      // }

      for (let i = 0; i<posts.length; i++){
        let first = Math.floor(Math.random() * 3);
        if (ref.current.includes(first)){
          continue
        }
        ref.current.push(first);
        if(ref.current.length >= 3){
          break
        }
      }
    }
  
  },[ref])

  return (
    <WidgetWrapper>
      <Typography mb="1.25rem" color="#333" variant="h4" fontWeight="600" >
        Most popular Feed
      </Typography>
      {
        ref.current.map((item)=>
          (<OneAdWidget 
            key={item} 
            post={posts[item]}
            
          />)
          
        )
      }
    </WidgetWrapper>
   
  );
};

export default PopularAdsWidget;