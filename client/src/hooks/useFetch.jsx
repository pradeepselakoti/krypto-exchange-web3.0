import { useEffect, useState } from "react";

const APIKEY = import.meta.env.VITE_GIPHY_API;

const useFetch = ({ keyword }) => {
  const [gifUrl, setGifUrl] = useState("");

  const fetchGifs = async () => {
    try {
      if (!keyword || keyword.trim() === "") {
        setGifUrl("");
        return;
      }

      // Clean the keyword for the API call
      const cleanKeyword = keyword.split(" ").join("").toLowerCase();
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&q=${cleanKeyword}&limit=1&rating=g`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const { data } = await response.json();
      
      // Check if data exists and has images
      if (data && data.length > 0 && data[0]?.images?.downsized_medium?.url) {
        setGifUrl(data[0].images.downsized_medium.url);
      } else {
        // Fallback if no GIF found
        setGifUrl("https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHVpbzFwaDZ0cWsxaGdsOTJkdGR5OTBwbXgxeWRsMzFqMGttNTNkYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oEjI6SIIHBdRxXI40/giphy.gif");
      }
    } catch (error) {
      console.error("Error fetching GIF:", error);
      // Fallback GIF URL
      setGifUrl("https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHVpbzFwaDZ0cWsxaGdsOTJkdGR5OTBwbXgxeWRsMzFqMGttNTNkYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oEjI6SIIHBdRxXI40/giphy.gif");
    }
  };

  useEffect(() => {
    if (keyword) {
      fetchGifs();
    } else {
      setGifUrl("");
    }
  }, [keyword]);

  return gifUrl;
};

export default useFetch;