import { Dialog, Transition } from "@headlessui/react";
import { Button, Carousel, Tooltip, Toast } from "flowbite-react";
import { Fragment, useEffect, useState } from "react";
import usePortafolio from "../hooks/usePortafolio";
import {
  XCircleIcon,
  InformationCircleIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
} from "@heroicons/react/solid";

export default function ModalProyectos() {
  const {
    isOpenModalProyectos,
    handleModalProyectos,
    detailsModalProyectos,
    proyectoItem,
  } = usePortafolio();

  const [textInfo, setTextInfo] = useState("");
  const [btnInfo, setBtnInfo] = useState(false);

  // mostrar ocultar boton de info con su mensaje
  const handleInfo = (textInfo='') => {
    setBtnInfo(!btnInfo);
    textInfo && setTextInfo(textInfo);
  };

  //paginations
  const ITEMS_PER_PAGE = 1;
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);

  const limit = page * ITEMS_PER_PAGE;
  const from = limit - ITEMS_PER_PAGE;
  const [items, setItems] = useState([]);

  useEffect(() => {
    const changePage = () => {
      if (proyectoItem.details_image?.length > 0) {
        setItems(proyectoItem.details_image.slice(from, limit));
        setPageCount(
          Math.ceil(proyectoItem.details_image.length / ITEMS_PER_PAGE)
        );
      }
      if (!isOpenModalProyectos) {
        setPage(1);
      }
    };
    changePage();
  }, [proyectoItem, page]);

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

  const handleCloseModalIcon = () => {
    handleModalProyectos();
  };

  return (
    <>
      <Transition appear show={isOpenModalProyectos} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={handleModalProyectos}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="md:w-2/3 w-full h-fit md:h-auto transform overflow-hidden rounded-2xl bg-slate-50 p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-blue-pastel-300 uppercase"
                  >
                    <span className="flex justify-between">
                      <h3>Detalles del proyecto</h3>
                      <button onClick={() => handleCloseModalIcon()}>
                        <XCircleIcon className="h-7 w-7 text-red-700" />
                      </button>
                    </span>
                  </Dialog.Title>
                  <div className="mt-2">
                    <div className="w-full h-fit  flex flex-col">
                      {detailsModalProyectos ? (
                        <>
                          {items.map((detail, i) => (
                            <div
                              className="border md:h-96 h-fit w-auto flex justify-center"
                              key={i}
                            >
                              <div className="flex justify-center">
                                <img
                                  src={detail.image}
                                  alt={detail.title}
                                  className="w-full h-auto"
                                />
                              </div>

                              <button
                                onClick={() => handleInfo(detail.description)}
                                className="rounded-2xl border-sky-600 border bg-slate-200 absolute bottom-8 z-10"
                              >
                                {!btnInfo ? (
                                  <InformationCircleIcon className="h-7 w-7 text-sky-600" />
                                ) : (
                                  <span className="p-2">
                                    {detail.description}
                                  </span>
                                )}
                              </button>
                            </div>
                          ))}

                          {/*** Paginacion ***/}
                          <div className="flex justify-center items-center">
                            <span className="text-sm text-blue-pastel-300 font-semibold mr-auto text-center">
                              <p>
                                {page}
                                {"/"}
                                {pageCount}
                              </p>
                            </span>
                            <div className="mt-2 xs:mt-0 flex gap-1 z-0">
                              <button
                                className={`p-2 rounded-full bg-blue-pastel-300 border-blue-pastel-100
                                hover:bg-blue-pastel-200 
                                 ${
                                  (page === 1 || btnInfo) && "opacity-25"
                                }`}
                                onClick={handlePrevious}
                                disabled={page === 1 || btnInfo}
                              >
                                <span className="text-xl font-bold">
                                  {
                                    <ArrowLeftIcon className="h-5 w-5 text-slate-100" />
                                  }
                                </span>
                              </button>

                              <button
                                className={`p-2 rounded-full
                                bg-blue-pastel-300 border-blue-pastel-100
                                hover:bg-blue-pastel-200 ${
                                  (page === pageCount || btnInfo) &&
                                  "opacity-25"
                                }`}
                                disabled={page == pageCount || btnInfo}
                                onClick={handleNext}
                              >
                                <span className="text-xl font-bold">
                                  {
                                    <ArrowRightIcon className="h-5 w-5 text-slate-100" />
                                  }
                                </span>
                              </button>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="border h-auto aspect-w-16 aspect-h-9 w-auto">
                          <img
                            src={proyectoItem.image}
                            alt={proyectoItem.name}
                            className="grow"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
