import usePortafolio from "../hooks/usePortafolio";
import { Card } from "flowbite-react";
import { truncateString } from "../helper/truncateText";
import { useEffect, useState } from "react";
import { ExternalLinkIcon, LinkIcon } from "@heroicons/react/solid";
import placeHolderImg from "../placeholder_image.png";

const Proyecto = ({ proyecto }) => {
  const { name, description, image, details, tags } = proyecto;
  const { handleModalProyectos, filterTags, tags: collectionTags } = usePortafolio();
  const [imageStatus, setImageStatus] = useState("cargando");

  const handleImgLoaded = () => {
    setImageStatus('loaded')
  }

  const handleTag = (e) => {
    filterTags(e.target.innerText, {remove: false, value:""})
  }

  return (
    <>
      <Card>
        <span className="md:flex md:gap-4">

            <img
                className="md:w-1/2 w-full h-auto cursor-pointer border border-blue-pastel-100"
                src={imageStatus === 'loaded' ? image : placeHolderImg }
                alt="image-proyectos"
                onClick={() => handleModalProyectos(details, proyecto)}
                onLoad={handleImgLoaded}
              />

          <div className="flex flex-col flex-1">
            <span className="flex justify-between items-center mt-1 sm:mt-0">
              <h5 className="text-2xl font-bold tracking-tight text-blue-pastel-300 hover:text-blue-pastel-200 dark:text-white mt-2 md:mt-0 flex justify-between cursor-pointer"
                  onClick={() => handleModalProyectos(details, proyecto)}>
                {name}
              </h5>
              {proyecto.link !== undefined ? (
                  <a
                    href="https://helpful-genie-76ba1c.netlify.app/"
                    target="_blank"
                  >
                    <ExternalLinkIcon className="h-8 w-8 text-blue-pastel-300 hover:text-blue-pastel-200 rounded-full border border-blue-pastel-100 shadow p-1" />
                  </a>
                ) : (
                  ""
                )}
            </span>
           
            <p className="font-normal  text-slate-600 dark:text-gray-400 mt-3 font-mono text-sm whitespace-pre-wrap">
              {truncateString(description, 320)}{" "}
              {details && (
                <a
                  href="#"
                  onClick={() => handleModalProyectos(details, proyecto)}
                  className="font-bold text-slate-600"
                >
                  Ver más{" "}
                </a>
              )}
            </p>
            <br />

            <div className="flex flex-wrap md:mt-auto text-xs text-slate-600  border-t border-blue-pastel-100">
              {tags?.map((tag, i) => (
                <p key={i} className="p-1 hover:text-blue-pastel-300 cursor-pointer">
                  <span className={`${collectionTags.includes(tag) ? 'text-blue-pastel-300 cursor-default' : ''} font-bold text-sm`}>#</span>
                  <a href="#" onClick={handleTag} className={`${collectionTags.includes(tag) ? 'text-blue-pastel-300 cursor-default' : ''}`}>{tag}</a> 
                </p>
              ))}
            </div>
          </div>
        </span>
      </Card>
    </>
  );
};

export default Proyecto;
