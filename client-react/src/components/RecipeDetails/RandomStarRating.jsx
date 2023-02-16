import { useState ,useContext, useRef, useEffect } from "react"
import { Rating, Box } from "@mui/material"


export default function RandomStarRating() {
  const [starRating, setStarRating] = useState(Math.floor(Math.random() * 5) + 1);

  const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    }, [value]);

    return ref.current;
  };

  const previousRating = usePrevious(starRating);

  return (
    <Box sx={{ "& > legend": { mt: 2 } }}>
      <Rating name="read-only" value={previousRating || 0} readOnly />
    </Box>
  );
}