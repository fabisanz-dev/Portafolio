import { useState, useEffect, createContext, useRef } from "react";
import { useLocation } from "react-router-dom";

const PortafolioContext = createContext();
const PortafolioProvider = ({children}) => {
	let [isOpenModalProyectos, setIsOpenModalProyectos] = useState(false); //para mostrar modal proyectos
	let [detailsModalProyectos, setDetailsModalProyectos] = useState(false); //para mostrar imagenes paginadas/carousel
	let [isOpenModalContacto, setIsOpenModalContacto] = useState(false);//mostrar modal contacto
	const [proyectoItem, setProyectoItem] = useState({}); //proyecto especifico al abrir modal
	const [proyectos, setProyectos] = useState([]);
	const [skills, setSkills] = useState([]);
	const [profile, setProfile] = useState([]);

	const [tags, setTags] = useState([])

	const [page, setPage] = useState(1);
	const location = useLocation();
	const prev = useRef({ tags, page });


	const handleModalProyectos = (details=false, _proyectoItem={}) => {
		setIsOpenModalProyectos(!isOpenModalProyectos)
		setDetailsModalProyectos(details)
		_proyectoItem && setProyectoItem(_proyectoItem)

	}

	const handleModalContacto = (ModalContacto) => {
		setIsOpenModalContacto(!isOpenModalContacto)
	}


	
	useEffect(()=>{
		const getData = async() => {
			const result = await fetch('data.json', {
				headers : { 
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				   }
			})
			
			const data = await result.json()

			setTimeout(() => {
				setProyectos(data[0].projects)
				setSkills(data[0].skills[0]),
				setProfile(data[0].profile)
				setPage(1)
			}, 1000); 

		}
		
		
		if(tags.length > 0){
			//return
			//setProyectos([])
			fetch('data.json', {
				headers : { 
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				   }
			})
			.then(res=>res.json())
			.then(data=>{
				setTimeout(() => {
					
					let newData = []
					for(let _proyecto in data[0].projects) {
						//console.log(data[0].projects)
						//setear proyectos con tags filtrados
						// if(data[0].projects[_proyecto].tags.includes(tag)){
						// 	newData.push(data[0].projects[_proyecto])
						// }

						if(data[0].projects[_proyecto].tags.some(_tag=> tags.includes(_tag))){
							newData.push(data[0].projects[_proyecto])
						}
					}
					//console.log(newData)
					setProyectos(newData)
					setPage(1)
				}, 1000); 
				
			})
			
		}else{
			getData();
		}

	}, [tags])
	//console.log(previousValues.current,   tag, 'null')
	
	/**
	 * setear el tag seleccionado a la coleccion, si no vaciar
	 * comprobar que ya se haya usado ese tag
	 * comprobar si el tag es para eliminar de la coleccion de tags y filtrarlo
	 * @param {*} _tag ej: 'reactJs'
	 * @param {*} {remove=false, value=""} ej: [true, value='angular']
	 * @returns ['NodeJs', 'TaildwindCss', 'reacJs']
	 */
	const filterTags = async(_tag="", {remove=false, value=""}) => {
		if(_tag){
			if(tags.includes(_tag)){
				return
			}
			setTags(current=>[...current, _tag]);
			return
		}
		

		if(remove){
			const tagsCopy = [...tags]
			const tagsCopyFilter = tags.filter(t => t !== value)

			setTags(tagsCopyFilter)
			return
		}

		setTags([]);
	}
	
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
				profile,
				filterTags,
				tags,
				page,
				setPage,
			}}
		>
			{children}
		</PortafolioContext.Provider>
	)
}

export {PortafolioProvider}
export default PortafolioContext