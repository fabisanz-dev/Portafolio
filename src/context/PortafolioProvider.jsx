import { useState, useEffect, createContext } from "react";

const PortafolioContext = createContext();
const PortafolioProvider = ({children}) => {
	let [isOpenModalProyectos, setIsOpenModalProyectos] = useState(false); //para mostrar modal proyectos
	let [detailsModalProyectos, setDetailsModalProyectos] = useState(false); //para mostrar imagenes paginadas/carousel
	let [isOpenModalContacto, setIsOpenModalContacto] = useState(false);//mostrar modal contacto
	const [proyectoItem, setProyectoItem] = useState({}); //proyecto especifico al abrir modal
	const [proyectos, setProyectos] = useState([]);
	const [skills, setSkills] = useState([]);
	const [profile, setProfile] = useState([]);

	console.log('isOpenModalProyectos', isOpenModalProyectos)

	const handleModalProyectos = (details=false, _proyectoItem={}) => {
		setIsOpenModalProyectos(!isOpenModalProyectos)
		setDetailsModalProyectos(details)
		_proyectoItem && setProyectoItem(_proyectoItem)

	}

	const handleModalContacto = (ModalContacto) => {
		setIsOpenModalContacto(!isOpenModalContacto)
	}

	useEffect(()=>{
		const getData = () => {
			fetch('data.json', {
				headers : { 
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				   }
			})
			.then(res=>res.json())
			.then(data=>{
				setTimeout(() => {
					setProyectos(data[0].projects)
					//console.log(data[0].profile)
					setSkills(data[0].skills[0]),
					setProfile(data[0].profile)
					
				}, 1000); 
				
			})
		}
		getData();
	}, [])

	return(
		<PortafolioContext.Provider
			value={{
				isOpenModalProyectos,
				handleModalProyectos,
				isOpenModalContacto,
				handleModalContacto, 
				proyectos,
				detailsModalProyectos,
				proyectoItem,
				skills,
				profile
			}}
		>
			{children}
		</PortafolioContext.Provider>
	)
}

export {PortafolioProvider}
export default PortafolioContext