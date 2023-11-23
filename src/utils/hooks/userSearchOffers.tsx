import { useEffect, useMemo, useState } from "react";
import { getServices } from "./services";

function useSearchOffers() {
  const [search, setSearch] = useState("");
  const [allSubjects, setAllSubjects] = useState([]);
  const [filteredSubjects, setFilteredSubjects] = useState(allSubjects);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getServices("offer-category/all")
      .then(({data}: any) => {
        setAllSubjects(data);
      })
      .catch((error) => {
        if (__DEV__) {
          console.log("Error:", error);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useMemo(() => {
    if (allSubjects.length > 0) {
      setLoading(true);
      const delayDebounceFn = setTimeout(() => {
        const result = allSubjects.filter((subject) => {
          return subject.offers.some((offer) =>
            offer.title
              .toLowerCase()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .includes(
                search.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
              )
          );
        });

        setFilteredSubjects(result);
        setLoading(false);
      }, 1000);

      return () => clearTimeout(delayDebounceFn);
    }
  }, [search, allSubjects]);

  return { search, setSearch, filteredSubjects, loading };
}

export default useSearchOffers;