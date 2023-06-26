import { Link } from 'react-router-dom'
import { Dropdown } from 'flowbite-react'
import { NavLink } from 'react-router-dom'
import { Avatar } from 'modern-react-avatar'
import 'modern-react-avatar/dist/index.css'
import { useTranslation } from 'react-i18next'
import i18n from '../i18n'
import usePortafolio from '../hooks/usePortafolio'

const Sidebar = () => {
  let activeClassName = 'bg-red-500'
  const { t } = useTranslation()
  const { setLang } = usePortafolio()

  const changeLanguage = lng => {
    i18n.changeLanguage(lng)
    setLang(lng)
  }
  return (
    <aside className='md:w-60 py-3 border-r sm:border-b bg-blue-pastel-200'>
      <div className='flex justify-center md:mt-10'>
        <span data-end='g'>
          <Avatar
            name={'Fabian Jorge'}
            className={
              'w-32 h-32 border overflow-hidden bg-gray-100 rounded-full border-blue-pastel-200 text-5xl text-blue-pastel-300'
            }
          />
        </span>
      </div>
      {/**menu mobile */}
      <div className='flex justify-center mt-2 mb-2 md:hidden visible outline-none'>
        <Dropdown label='Menu' placement='bottom'>
          <Dropdown.Item>
            <Link to='/'>{t('aboutme_menu')}</Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Link to='habilidades'>{t('skills_menu')}</Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Link to='proyectos'>{t('projects_menu')}</Link>
          </Dropdown.Item>
        </Dropdown>
      </div>
      {/**menu normal */}
      <div className='md:flex flex-col flex-1 items-center md:visible hidden'>
        <ul className='w-48 text-sm font-medium text-blue-pastel-100 bg-blue-pastel-200  text-center mt-1 uppercase'>
          <NavLink
            to='/'
            className={({ isActive }) => (isActive ? 'text-white' : undefined)}
          >
            <li className='block px-4 py-2 border-b border-blue-pastel-100 hover:bg-blue-pastel-300 hover:text-white'>
              {t('aboutme_menu')}
            </li>
          </NavLink>
          <NavLink
            to='habilidades'
            className={({ isActive }) => (isActive ? 'text-white' : undefined)}
          >
            <li
              aria-current='true'
              className='px-4 py-2 border-b border-blue-pastel-100 hover:bg-blue-pastel-300 hover:text-white'
            >
              {t('skills_menu')}
            </li>
          </NavLink>

          <NavLink
            to='proyectos'
            className={({ isActive }) => (isActive ? 'text-white' : undefined)}
          >
            <li className='px-4 py-2 border-b border-blue-pastel-100 hover:bg-blue-pastel-300 hover:text-white'>
              {t('projects_menu')}
            </li>
          </NavLink>
        </ul>
      </div>
      <div className='absolute top-0 left-0 p-2'>
        <select
          onChange={e => changeLanguage(e.target.value)}
          className='px-1 py-0.5 text-pastel-300 outline-none'
        >
          <option value='es'>Español</option>
          <option value='en'>English</option>
        </select>
      </div>
    </aside>
  )
}

export default Sidebar
