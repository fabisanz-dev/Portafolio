import usePortafolio from '../hooks/usePortafolio'
import { Card } from 'flowbite-react'
import { truncateString } from '../helper/truncateText'
import { useEffect, useState } from 'react'
import { ExternalLinkIcon, LinkIcon } from '@heroicons/react/solid'
import placeHolderImg from '../placeholder_image.png'
import parse from 'html-react-parser'
import { useTranslation } from 'react-i18next'

const Proyecto = ({ proyecto }) => {
  const { name, description, image, details, tags } = proyecto
  const {
    handleModalProyectos,
    filterTags,
    tags: collectionTags
  } = usePortafolio()
  const [imageStatus, setImageStatus] = useState('cargando')
  const { t } = useTranslation()

  const handleImgLoaded = () => {
    setImageStatus('loaded')
  }

  const handleTag = e => {
    filterTags(e.target.innerText, { remove: false, value: '' })
  }

  return (
    <>
      <Card>
        <span className='md:flex md:gap-4'>
          <img
            className='md:w-1/2 w-full h-auto cursor-pointer border border-blue-pastel-100'
            src={imageStatus === 'loaded' ? image : placeHolderImg}
            alt='image-proyectos'
            onClick={() => handleModalProyectos(details, proyecto)}
            onLoad={handleImgLoaded}
          />

          <div className='flex flex-col flex-1'>
            <span className='flex justify-between items-center mt-1 sm:mt-0'>
              <h5
                className='text-2xl font-bold tracking-tight text-blue-pastel-300 hover:text-blue-pastel-200 mt-2 md:mt-0 flex justify-between cursor-pointer'
                onClick={() => handleModalProyectos(details, proyecto)}
              >
                {name}
              </h5>
              {proyecto.link !== undefined ? (
                <a href={proyecto.link} target='_blank'>
                  <ExternalLinkIcon className='h-8 w-8 text-blue-pastel-300 hover:text-blue-pastel-200 rounded-full border border-blue-pastel-100 shadow p-1' />
                </a>
              ) : (
                ''
              )}
            </span>

            <p className='font-normal  text-slate-600 mt-3 font-mono text-sm whitespace-pre-wrap'>
              {parse(truncateString(description, 320))}{' '}
              {details && (
                <>
                  <br />
                  <a
                    href='#'
                    onClick={() => handleModalProyectos(details, proyecto)}
                    className='font-bold text-blue-pastel-300'
                  >
                    {t('see_more')}{' '}
                  </a>
                </>
              )}
            </p>
            <br />

            <div className='flex flex-wrap md:mt-auto text-xs text-slate-600  border-t border-blue-pastel-100'>
              {tags?.map((tag, i) => (
                <p
                  key={i}
                  className='p-1 hover:text-blue-pastel-300 cursor-pointer'
                >
                  <span
                    className={`${
                      collectionTags.includes(tag)
                        ? 'text-blue-pastel-300 cursor-default'
                        : ''
                    } font-bold text-sm`}
                  >
                    #
                  </span>
                  <a
                    href='#'
                    onClick={handleTag}
                    className={`${
                      collectionTags.includes(tag)
                        ? 'text-blue-pastel-300 cursor-default'
                        : ''
                    }`}
                  >
                    {tag}
                  </a>
                </p>
              ))}
            </div>
          </div>
        </span>
      </Card>
    </>
  )
}

export default Proyecto
