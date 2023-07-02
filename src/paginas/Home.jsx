import { Card, Tooltip } from 'flowbite-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCake,
  faEnvelope,
  faMailBulk,
  faMailForward,
  faMailReply
} from '@fortawesome/free-solid-svg-icons'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import ModalContacto from '../componentes/ModalContacto'
import usePortafolio from '../hooks/usePortafolio'
import { useState } from 'react'
import imgPresentacion from '../presentacion_image.png'

const Home = () => {
  const { handleModalContacto, profile } = usePortafolio()
  const [sourceImg, setSourceImg] = useState(false)

  return (
    <>
      <div className='md:mt-10 md:w-auto h-3/4'>
        <Card>
          <h5 className='text-4xl font-bold tracking-tight text-blue-pastel-300 uppercase text-center'>
            {profile.name?.substring(0, 12)}{' '}
            <span className='text-slate-600'>
              {profile.name?.substring(13)}
            </span>
          </h5>
          <p className='font-normal font-mono text-slate-600 whitespace-pre-wrap text-base text-mono text-center'>
            {profile.about}
          </p>
          <div className='flex justify-center'>
            <a
              href='https://storyset.com/work'
              target='_blank'
              className='w-1/2 h-3/4'
            >
              <Tooltip content='Storyset - www.freepik.es' placement='bottom'>
                <img src={imgPresentacion} alt='img-presentacion' />
              </Tooltip>
            </a>
          </div>

          <div className='border-t-2 mt-1'>
            <div className='flex gap-2 mt-2 justify-between'>
              <span>
                <a href={profile.github} target='_blank'>
                  <FontAwesomeIcon icon={faGithub} size='xl' />
                </a>{' '}
                <a href={profile.linkedin} target='_blank'>
                  <FontAwesomeIcon
                    icon={faLinkedin}
                    size='xl'
                    className='text-sky-600'
                  />
                </a>
              </span>
              <span className='uppercase text-xs py-1 font-mono'>
                <p>&copy; 2023 FJS</p>
              </span>
              <span
                className=' cursor-pointer'
                onClick={() => handleModalContacto()}
              >
                <FontAwesomeIcon
                  icon={faEnvelope}
                  size='xl'
                  className='text-blue-pastel-300'
                />
              </span>
            </div>
          </div>
        </Card>
      </div>
      <ModalContacto />
    </>
  )
}

export default Home
