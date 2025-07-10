import { useEffect, useState } from "react";

const PICSART_API_KEY = import.meta.env.VITE_PICSART_API_KEY;

const useFetch = ({ keyword }) => {
  const [gifUrl, setGifUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchGifs = async () => {
    if (!keyword) return;
    
    setLoading(true);
    setError(null);
    
    try {
      console.log('Fetching GIF for keyword:', keyword);
      console.log('API Key exists:', !!PICSART_API_KEY);
      
      const response = await fetch('https://api.picsart.io/tools/1.0/genai/gif', {
        method: 'POST',
        headers: {
          'X-Picsart-API-Key': PICSART_API_KEY,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          prompt: `${keyword} animated gif`,
          style: 'realistic',
          format: 'gif',
          width: 400,
          height: 400
        })
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        throw new Error(`API Error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('API Response:', data);

      // Check different possible response structures
      if (data.url) {
        setGifUrl(data.url);
      } else if (data.data && data.data.url) {
        setGifUrl(data.data.url);
      } else if (data.result && data.result.url) {
        setGifUrl(data.result.url);
      } else if (data.image_url) {
        setGifUrl(data.image_url);
      } else {
        console.error('Unexpected API response structure:', data);
        throw new Error('No URL found in API response');
      }
      
    } catch (error) {
      console.error('Error fetching GIF:', error);
      setError(error.message);
      
      // Set fallback GIF based on keyword
      const fallbackGifs = {
        'bitcoin': 'https://media.giphy.com/media/8wjAySDmwZKdb6gZgi/giphy.gif',
        'ethereum': 'https://media.giphy.com/media/85UGT15wJfghYtuM5E/giphy.gif',
        'crypto': 'https://media.giphy.com/media/trN9ht5RlE3Dcwavg2/giphy.gif',
        'money': 'https://media.giphy.com/media/67ThRZlYBvibtdF9JH/giphy.gif',
        'success': 'https://media.giphy.com/media/26u4cqiYI30juCOGY/giphy.gif',
        'test': 'https://media.giphy.com/media/3o7TKTDn976rzVgky4/giphy.gif'
      };
      
      const fallbackUrl = fallbackGifs[keyword.toLowerCase()] || 
                          "https://metro.co.uk/wp-content/uploads/2015/05/pokemon_crying.gif?quality=90&strip=all&zoom=1&resize=500%2C284";
      
      setGifUrl(fallbackUrl);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (keyword && PICSART_API_KEY) {
      fetchGifs();
    } else if (keyword && !PICSART_API_KEY) {
      console.warn('PicsArt API key not found, using fallback');
      const fallbackGifs = {
        'bitcoin': 'https://media.giphy.com/media/8wjAySDmwZKdb6gZgi/giphy.gif',
        'ethereum': 'https://media.giphy.com/media/85UGT15wJfghYtuM5E/giphy.gif',
        'crypto': 'https://media.giphy.com/media/trN9ht5RlE3Dcwavg2/giphy.gif',
        'money': 'https://media.giphy.com/media/67ThRZlYBvibtdF9JH/giphy.gif',
        'success': 'https://media.giphy.com/media/26u4cqiYI30juCOGY/giphy.gif',
        'test': 'https://media.giphy.com/media/3o7TKTDn976rzVgky4/giphy.gif'
      };
      
      const fallbackUrl = fallbackGifs[keyword.toLowerCase()] || 
                          "https://metro.co.uk/wp-content/uploads/2015/05/pokemon_crying.gif?quality=90&strip=all&zoom=1&resize=500%2C284";
      
      setGifUrl(fallbackUrl);
    }
  }, [keyword, PICSART_API_KEY]);

  return { gifUrl, loading, error };
};

export default useFetch;