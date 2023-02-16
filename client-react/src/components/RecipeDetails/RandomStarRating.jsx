import { useState ,useContext, useRef, useEffect } from "react"
import { Rating, Box } from "@mui/material"


export default function RandomStarRating() {
  const [starRating, setStarRating] = useState(Math.floor(Math.random() * 5) + 1);
  
  

  

  const previousRating = usePrevious(starRating);

  console.log("previous rating check", previousRating)
  return (
    <Box sx={{ "& > legend": { mt: 2 } }}>
      <Rating name="read-only" value={previousRating || 0 } readOnly />
    </Box>
  );
}

function usePrevious(value) {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref = useRef();
  // Store current value in ref
  useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes
  // Return previous value (happens before update in useEffect above)
  return ref.current;
}