import { useEffect, useState } from "react";

const useSpots = () => {
  const [spots, setSpots] = useState(null);
  const urlLocal = "http://localhost:5500";
  const urlProd = "https://your-wave-api.herokuapp.com/";

  const fetchSpots = async () => {
    try {
      const response = await global.fetch(urlProd);
      const json = await response.json();
      setSpots(json);
      console.log(json, "SPOTS JSON");
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  useEffect(() => {
    fetchSpots();
  }, []);

  return { spots: spots };
};

export default useSpots;
