import ModalProyectos from "../componentes/ModalProyectos";
import usePortafolio from "../hooks/usePortafolio";
import Proyecto from "../componentes/proyecto";
import { Pagination } from "flowbite-react";
import { useEffect, useState } from "react";

const Proyectos = () => {
  const { handleModalProyectos, proyectos } = usePortafolio();
  //paginations
  const ITEMS_PER_PAGE = 2;
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);

  const limit = page * ITEMS_PER_PAGE;
  const from = limit - ITEMS_PER_PAGE;
  const [items, setItems] = useState([]);

  useEffect(() => {
    const changePage = () => {
      if (proyectos.length > 0) {
        setItems(proyectos.slice(from, limit));
        setPageCount(Math.ceil(proyectos.length / ITEMS_PER_PAGE));
      }
    };
    changePage();
  }, [proyectos, page]);

  //paginacion pa
  function handlePrevious() {
    setPage((p) => {
      if (p === 1) return p;
      return p - 1;
    });
  }

  function handleNext() {
    setPage((p) => {
      if (p === pageCount) return p;
      return p + 1;
    });
  }

  return (
    <>
      {proyectos.length > 0 ? (
        <div className="flex flex-col gap-4 items-start">
          {items.map((proyecto, i) => (
            <Proyecto key={proyecto.id} proyecto={proyecto} />
          ))}
          <hr className="border border-blue-pastel-100 w-full"/>
          {/*** Paginacion ***/}
          <div className="flex flex-col items-center justify-center m-auto">
            <span className="text-sm text-gray-700">
              Pagina{" "}
              <span className="font-semibold text-gray-900 ">{page}</span> de{" "}
              <span className="font-semibold text-gray-900">{pageCount}</span> -
              Total:{" "}
              <span className="font-semibold text-gray-900">
                {proyectos.length}
              </span>{" "}
              Proyectos
            </span>
            <div className="inline-flex mt-2 xs:mt-0">
              <button
                className={`py-2 px-4 text-sm font-medium text-white rounded-l border-blue-pastel-300 bg-blue-pastel-300 hover:bg-blue-pastel-200 
                ${
               page === 1 && "opacity-25"
             }`}
                onClick={handlePrevious}
                disabled={page === 1}
              >
                <span className="text-xl font-bold">{"<"}</span>
              </button>

              {/**Selector */}
              <select
                value={page}
                onChange={(event) => {
                  setPage(Number(event.target.value));
                }}
                className="ml-1 text-sm font-medium p-1 text-white 
                  rounded border-0 border-l border-blue-pastel-300 bg-blue-pastel-300 hover:bg-blue-pastel-200"
              >
                {Array(pageCount)
                  .fill(null)
                  .map((_, index) => {
                    return <option key={index}>{index + 1}</option>;
                  })}
              </select>


              <button
                className={`ml-1 py-2 px-4 text-sm font-medium text-white 
           rounded-r border-0 border-l border-blue-pastel-300 bg-blue-pastel-300 hover:bg-blue-pastel-200 
           ${
            page === pageCount && "opacity-25"
          }`}
                disabled={page === pageCount}
                onClick={handleNext}
              >
                <span className="text-xl font-bold">{">"}</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        "Cargando datos..."
      )}

      <ModalProyectos />
    </>
  );
};

export default Proyectos;
