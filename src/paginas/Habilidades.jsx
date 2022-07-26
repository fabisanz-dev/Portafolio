import SkillBar from "react-skillbars";
import { Card } from "flowbite-react";
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useEffect, useState } from "react";
import usePortafolio from "../hooks/usePortafolio";

const Habilidades = () => {
  const { skills } = usePortafolio();
  const [technologies, setTechnologies] = useState([]);
  const [enviroment, setEnviroment] = useState([]);

  useEffect(() => {
    if (skills) {
      setTechnologies(skills.technologies);
      setEnviroment(skills.enviroment);
    }
  }, [skills]);

  const colors = {
    bar: "#c8dede",
    level: "red",
    title: {
      text: "#fffff",
      background: "#5c9c9c",
    },
  };
  const percentage = 66;

  return (
    <>
      <div className="flex flex-col w-auto">
        <h5 className="text-2xl font-bold tracking-tight text-blue-pastel-300 text-center uppercase">
          Habilidades Desarrollo Web
        </h5>
        <div className="flex justify-center items-center gap-4 p-4">
          {skills?.enviroment &&
            skills.enviroment.map((env, i) => (
              <CircularProgressbarWithChildren
                value={env.level}
                className="md:w-44"
                key={i}
                styles={buildStyles({
                  pathColor: `#5c9c9c`,
                  pathTransitionDuration: 0.5,
                })}
              >
                {/* Put any JSX content in here that you'd like. It'll be vertically and horizonally centered. */}
                <span className="mt-1 md:text-2xl text-lg text-blue-pastel-300 font-mono">{env.type}</span>
                <div className="mt-1 md:text-2xl text-lg text-center text-blue-pastel-300">
                  <strong>{`${env.level}%`}</strong>
                </div>
              </CircularProgressbarWithChildren>
            ))}
        </div>

        <div className="lg:flex lg:justify-center">
          <span className="lg:w-10/12 font-mono">
            {skills?.technologies && (
              <SkillBar skills={skills.technologies} colors={colors} />
            )}
          </span>
        </div>
      </div>
    </>
  );
};

export default Habilidades;
