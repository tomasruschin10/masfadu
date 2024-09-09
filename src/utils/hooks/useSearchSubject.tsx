import { useEffect, useMemo, useState } from "react";
import { getServices } from "./services";
import { store } from "../../redux/store";

function useSearchSubject() {
  const [search, setSearch] = useState("");
  const [allLevels, setAllLevels] = useState([]); 
  const [filteredLevels, setFilteredLevels] = useState([]); 
  const state: any = store.getState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const {
      userdata: { career_id },
    } = state.user;

    setLoading(true);
    getServices(`subject-category/all/${career_id}`)
      .then(({ data }: any) => {
        setAllLevels(data.data); 
        setLoading(false);
      })
      .catch((error) => {
        if (__DEV__) {
          console.log(error);
        }
        setLoading(false);
      });
  }, []);

  useMemo(() => {
    if (allLevels.length > 0) {
      setLoading(true);
      const delayDebounceFn = setTimeout(() => {
        const filtered = allLevels.map((level) => {
          const filteredSubjects = level.subject.filter((subj) =>
            subj.name
              .toLowerCase()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .includes(
                search
                  .toLowerCase()
                  .normalize("NFD")
                  .replace(/[\u0300-\u036f]/g, "")
              )
          );
          return {
            ...level,
            subject: filteredSubjects,
          };
        });

        setFilteredLevels(filtered); 
        setLoading(false);
      }, 1000);
      return () => clearTimeout(delayDebounceFn);
    }
  }, [search, allLevels]);

  return {
    search,
    setSearch,
    filteredLevels, 
    allLevels,
    loading,
  };
}

export default useSearchSubject;
