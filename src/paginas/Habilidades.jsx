import SkillBar from 'react-skillbars'
import { Badge, Card } from 'flowbite-react'
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles
} from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { useEffect, useState } from 'react'
import usePortafolio from '../hooks/usePortafolio'
import {
  dataTools_1,
  dataTools_2,
  dataTools_3,
  dataTools_4
} from '../helper/skills'
import { useTranslation } from 'react-i18next'

const Container = ({ children }) => (
  <div style={{ display: 'flex', gap: 5 }}>{children}</div>
)

const LogoTools = ({ link = '', src = '', alt = '' }) => (
  <a href={link} rel='nofollow' title={alt}>
    <img
      src={src}
      alt={alt}
      width={50}
      height={50}
      style={{ maxWidth: '100%' }}
    />
  </a>
)

const Habilidades = () => {
  const { t } = useTranslation()
  return (
    <>
      <div className='flex flex-col w-auto md:mt-12'>
        <h5 className='text-2xl font-bold tracking-tight text-blue-pastel-300 text-center uppercase'>
          {t('skills')}
        </h5>
        <br />
        <Card>
          <Container>
            <Badge>Backend</Badge>
            {dataTools_1.map(({ link, src, alt }) => (
              <LogoTools link={link} src={src} alt={alt} key={alt} />
            ))}
          </Container>

          <hr className='border border-blue-pastel-100 w-full my-2' />
          <Container>
            <Badge>Frontend</Badge>
            <p style={{ display: 'flex', gap: 5, justifyContent: 'center' }}>
              {dataTools_2.map(({ link, src, alt }) => (
                <LogoTools link={link} src={src} alt={alt} key={alt} />
              ))}
            </p>
          </Container>
          <hr className='border border-blue-pastel-100 w-full my-2' />
          <Container>
            <Badge>DB</Badge>
            {dataTools_3.map(({ link, src, alt }) => (
              <LogoTools link={link} src={src} alt={alt} key={alt} />
            ))}
          </Container>
          <hr className='border border-blue-pastel-100 w-full my-2' />
          <Container>
            <Badge>+</Badge>
            {dataTools_4.map(({ link, src, alt }) => (
              <LogoTools link={link} src={src} alt={alt} key={alt} />
            ))}
          </Container>
        </Card>
      </div>
    </>
  )
}

export default Habilidades
