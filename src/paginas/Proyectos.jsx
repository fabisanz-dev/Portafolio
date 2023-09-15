import ModalProyectos from '../componentes/ModalProyectos'
import usePortafolio from '../hooks/usePortafolio'
import Proyecto from '../componentes/proyecto'
import { Pagination } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { BackspaceIcon } from '@heroicons/react/solid'
import { useTranslation } from 'react-i18next'

const Proyectos = () => {
  const {
    handleModalProyectos,
    proyectos,
    page,
    setPage,
    filterTags,
    tags,
    cargando
  } = usePortafolio()
  //paginations
  const ITEMS_PER_PAGE = 2
  //const [page, setPage] = useState(1); cambiado a provider por filtrado: tag
  const [pageCount, setPageCount] = useState(1)

  const limit = page * ITEMS_PER_PAGE
  const from = limit - ITEMS_PER_PAGE
  const [items, setItems] = useState([])
  //translation
  const { t } = useTranslation()

  useEffect(() => {
    const changePage = () => {
      if (proyectos.length > 0) {
        setItems(proyectos.slice(from, limit))
        setPageCount(Math.ceil(proyectos.length / ITEMS_PER_PAGE))
      }
    }

    changePage()
  }, [proyectos, page])

  //paginacion pa
  function handlePrevious() {
    setPage(p => {
      if (p === 1) return p
      return p - 1
    })
  }

  function handleNext() {
    setPage(p => {
      if (p === pageCount) return p
      return p + 1
    })
  }

  const handleTitleTag = ({ remove = false, val = '' }) => {
    if (remove) {
      filterTags('', { remove, value: val })
      return
    }

    filterTags('', { remove, value: '' })
  }

  return (
    <>
      {tags.length > 0 && (
        <div className='flex sm:justify-between flex-col p-1 items-center'>
          <h3 className='text-lg font-bold flex'>
            {t('tags_filter')} #Tags
            <span>
              <a href='#' onClick={handleTitleTag} className=''>
                <BackspaceIcon className='h-6 w-6 text-red-700 hover:text-red-800' />
              </a>
            </span>
          </h3>

          <div className='flex gap-1 flex-wrap text-xs text-blue-pastel-300 hover:text-blue-pastel-200 font-bold justify-center mt-1'>
            {/* <p className="text-lg">
            Proyectos realizados con<span className="font-bold font-mono text-blue-pastel-300 text-sm"> #{tag.length}.&nbsp;</span>
          </p> */}
            {tags.map((t, index) => (
              <p
                key={index}
                onClick={() => handleTitleTag({ remove: true, val: t })}
                className='cursor-pointer border rounded-lg p-1'
              >
                {t}
              </p>
            ))}
          </div>
        </div>
      )}

      {proyectos.length > 0 && !cargando ? (
        <div className='flex flex-col gap-4 items-start h-full'>
          {items.map((proyecto, i) => (
            <Proyecto key={proyecto.id} proyecto={proyecto} />
          ))}
          <hr className='border border-blue-pastel-100 w-full' />
          {/*** Paginacion ***/}
          <div className='flex m-auto h-full'>
            <div className='flex flex-col items-center justify-center mt-auto'>
              <span className='text-sm text-gray-700'>
                {t('pagination.0')}{' '}
                <span className='font-semibold text-gray-900 '>{page}</span>{' '}
                {t('pagination.1')}{' '}
                <span className='font-semibold text-gray-900'>{pageCount}</span>{' '}
                -{t('pagination.2')}:{' '}
                <span className='font-semibold text-gray-900'>
                  {proyectos.length}
                </span>{' '}
                {t('pagination.3')}
              </span>
              <div className='inline-flex mt-2 xs:mt-0'>
                <button
                  className={`py-2 px-4 text-sm font-medium text-white rounded-l border-blue-pastel-300 bg-blue-pastel-300 hover:bg-blue-pastel-200 
                ${page === 1 && 'opacity-25'}`}
                  onClick={handlePrevious}
                  disabled={page === 1}
                >
                  <span className='text-xl font-bold'>{'<'}</span>
                </button>

                {/**Selector */}
                <select
                  value={page}
                  onChange={event => {
                    setPage(Number(event.target.value))
                  }}
                  className='ml-1 text-sm font-medium p-1 text-white 
                  rounded border-0 border-l border-blue-pastel-300 bg-blue-pastel-300 hover:bg-blue-pastel-200'
                >
                  {Array(pageCount)
                    .fill(null)
                    .map((_, index) => {
                      return <option key={index}>{index + 1}</option>
                    })}
                </select>

                <button
                  className={`ml-1 py-2 px-4 text-sm font-medium text-white 
           rounded-r border-0 border-l border-blue-pastel-300 bg-blue-pastel-300 hover:bg-blue-pastel-200 
           ${page === pageCount && 'opacity-25'}`}
                  disabled={page === pageCount}
                  onClick={handleNext}
                >
                  <span className='text-xl font-bold'>{'>'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div role='status' className='flex justify-center min-h-screen mt-1'>
          <svg
            aria-hidden='true'
            className='mr-2 w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-blue-pastel-300'
            viewBox='0 0 100 101'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
              fill='currentColor'
            />
            <path
              d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
              fill='currentFill'
            />
          </svg>
          <span className='sr-only'>Loading...</span>
        </div>
      )}

      <ModalProyectos />
    </>
  )
}

export default Proyectos
