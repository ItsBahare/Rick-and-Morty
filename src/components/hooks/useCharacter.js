import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function useCharacters(search) {
  const [allCharacter, setAllCharacter] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    async function fetchData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character?name=${search}`,
          { signal },
        );
        setAllCharacter(data.results.slice(0, 6));
      } catch (err) {
        if (!axios.isCancel()) {
          setAllCharacter([]);
          toast.error(err.response.data.error);
        }
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
    return () => {
      controller.abort();
    };
  }, [search]);

  return { isLoading, allCharacter };
}
