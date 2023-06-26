import { useState, useEffect, createContext, useRef } from 'react'
import { useLocation } from 'react-router-dom'

const PortafolioContext = createContext()
const PortafolioProvider = ({ children }) => {
  let [isOpenModalProyectos, setIsOpenModalProyectos] = useState(false) //para mostrar modal proyectos
  let [detailsModalProyectos, setDetailsModalProyectos] = useState(false) //para mostrar imagenes paginadas/carousel
  let [isOpenModalContacto, setIsOpenModalContacto] = useState(false) //mostrar modal contacto
  const [proyectoItem, setProyectoItem] = useState({}) //proyecto especifico al abrir modal
  const [proyectos, setProyectos] = useState([])
  const [profile, setProfile] = useState([])

  const [tags, setTags] = useState([])

  const [page, setPage] = useState(1)
  const location = useLocation()
  const prev = useRef({ tags, page })
  const [cargando, setCargando] = useState(false)
  const [lang, setLang] = useState('es')

  const handleModalProyectos = (details = false, _proyectoItem = {}) => {
    setIsOpenModalProyectos(!isOpenModalProyectos)
    setDetailsModalProyectos(details)
    _proyectoItem && setProyectoItem(_proyectoItem)
  }

  const handleModalContacto = ModalContacto => {
    setIsOpenModalContacto(!isOpenModalContacto)
  }
  let result
  useEffect(() => {
    const getData = async () => {
      if (lang === 'en') {
        result = await fetch('data_en.json', {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          }
        })
      } else {
        result = await fetch('data.json', {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          }
        })
      }

      setCargando(true)
      const data = await result.json()

      setTimeout(() => {
        setProyectos(data[0].projects)
        setProfile(data[0].profile)
        setPage(1)
        setCargando(false)
      }, 1000)
    }

    if (tags.length > 0) {
      //return
      setCargando(true)
      fetch('data.json', {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          setTimeout(() => {
            let newData = []
            for (let _proyecto in data[0].projects) {
              if (
                data[0].projects[_proyecto].tags.some(_tag =>
                  tags.includes(_tag)
                )
              ) {
                newData.push(data[0].projects[_proyecto])
              }
            }
            setProyectos(newData)
            setPage(1)
            setCargando(false)
          }, 1000)
        })
    } else {
      getData()
    }
  }, [tags, lang])
  /**
   * setear el tag seleccionado a la coleccion, si no vaciar
   * comprobar que ya se haya usado ese tag
   * comprobar si el tag es para eliminar de la coleccion de tags y filtrarlo
   * @param {*} _tag ej: 'reactJs'
   * @param {*} {remove=false, value=""} ej: [true, value='angular']
   * @returns ['NodeJs', 'TaildwindCss', 'reacJs']
   */
  const filterTags = async (_tag = '', { remove = false, value = '' }) => {
    if (_tag) {
      if (tags.includes(_tag)) {
        return
      }
      setTags(current => [...current, _tag])
      return
    }

    if (remove) {
      const tagsCopy = [...tags]
      const tagsCopyFilter = tags.filter(t => t !== value)

      setTags(tagsCopyFilter)
      return
    }

    setTags([])
  }

  return (
    <PortafolioContext.Provider
      value={{
        isOpenModalProyectos,
        handleModalProyectos,
        isOpenModalContacto,
        handleModalContacto,
        proyectos,
        detailsModalProyectos,
        proyectoItem,
        profile,
        filterTags,
        tags,
        page,
        setPage,
        cargando,
        setLang
      }}
    >
      {children}
    </PortafolioContext.Provider>
  )
}

export { PortafolioProvider }
export default PortafolioContext
