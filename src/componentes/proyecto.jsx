import usePortafolio from "../hooks/usePortafolio";
import { Card } from "flowbite-react";
import { truncateString } from "../helper/truncateText";
import { useState } from "react";
import { ExternalLinkIcon, LinkIcon } from "@heroicons/react/solid";
import placeHolderImg from "../placeholder_image.png";

const Proyecto = ({ proyecto }) => {
  const { name, description, image, details, tags } = proyecto;
  const { handleModalProyectos, proyectos } = usePortafolio();
  const [imageStatus, setImageStatus] = useState("cargando");

  return (
    <>
      <Card>
        <span className="md:flex md:gap-4">
            <img
              className="md:w-1/2 w-full h-96 cursor-pointer border border-blue-pastel-100"
              src={image}
              alt="image-proyectos"
              onClick={() => handleModalProyectos(details, proyecto)}
             
            />

          <span className="flex flex-col flex-1">
            <h5 className="text-2xl font-bold tracking-tight text-blue-pastel-300 dark:text-white mt-2 md:mt-0 flex justify-between">
              {name}{" "}
              {proyecto.link !== undefined ? (
                <a
                  href="https://helpful-genie-76ba1c.netlify.app/"
                  target="_blank"
                >
                  <LinkIcon className="h-8 w-8 text-blue-pastel-300 rounded-full border border-blue-pastel-100 shadow p-1" />
                </a>
              ) : (
                ""
              )}
            </h5>
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

            <div className="flex flex-wrap md:mt-auto text-xs text-slate-600 border-t border-blue-pastel-100">
              {tags?.map((tag, i) => (
                <p key={i} className="p-1">
                  <span className="font-bold text-sm">#</span>
                  {tag}
                </p>
              ))}
            </div>
          </span>
        </span>
      </Card>
    </>
  );
};

export default Proyecto;
