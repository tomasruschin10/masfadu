import { useEffect, useMemo, useState } from "react";
import { getServices } from "./services";

function useSearchSubject() {
  const [search, setSearch] = useState("");
  const [allSubjects, setAllSubjects] = useState([]);
  const [filteredSubjects, setFilteredSubjects] = useState(allSubjects);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getServices("subject/all")
      .then(({ data }: any) => {
        setAllSubjects(data);
      })
      .catch((error) => {
        if (__DEV__) {
          console.log(
            "🚀 ~ file: On2Screen.tsx ~ line 21 ~ getServices ~ error",
            error
          );
        }
        setLoading(false);
      });
  }, []);

  useMemo(() => {
    if (allSubjects.length > 0) {
      setLoading(true);
      const delayDebounceFn = setTimeout(() => {
        const result = allSubjects.filter(
          (subj) =>
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
        setFilteredSubjects(result);
        setLoading(false);
      }, 1000);
      return () => clearTimeout(delayDebounceFn);
    }
  }, [search, allSubjects]);

  return {
    search,
    setSearch,
    filteredSubjects,
    setFilteredSubjects,
    allSubjects,
    loading,
  };
}

export default useSearchSubject;
