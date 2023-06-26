import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useRef, useState, useEffect } from 'react'
import usePortafolio from '../hooks/usePortafolio'
import {
  Label,
  TextInput,
  Textarea,
  Button,
  Toast,
  Spinner,
  Alert
} from 'flowbite-react'
import {
  faCake,
  faEnvelope,
  faMailBulk,
  faMailForward,
  faMailReply,
  faPaperPlane
} from '@fortawesome/free-solid-svg-icons'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { ExclamationCircleIcon, MailIcon } from '@heroicons/react/solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ReCAPTCHA from 'react-google-recaptcha'
import validator from 'validator'
import emailjs from '@emailjs/browser'
import { XCircleIcon } from '@heroicons/react/solid'
import { useTranslation } from 'react-i18next'

export default function ModalContacto() {
  const { isOpenModalContacto, handleModalContacto } = usePortafolio()
  const [email, setEmail] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [validatorEmail, setValidatorEmail] = useState({
    status: true,
    msg: ''
  })
  const [validatorCmt, setValidatorCmt] = useState({ status: true, msg: '' })
  const captcha = useRef(null)
  const [validatorCaptcha, setValidatorCaptcha] = useState({
    status: true,
    msg: ''
  })
  const form = useRef(null)
  const [loading, setLoading] = useState(false)
  const [emailSended, setEmailSended] = useState('')
  const { t } = useTranslation()

  const reset = () => {
    setEmail('')
    setMensaje('')
    form.current?.reset()
    captcha.current?.reset()

    setValidatorEmail({ status: true, msg: '' })
    setValidatorCaptcha({ status: true, msg: '' })
    setValidatorCmt({ status: true, msg: '' })
  }

  const fieldsValidation = e => {
    const id = e.target.id
    const value = e.target.value
    switch (id) {
      case 'email':
        if (validator.isEmail(value) && !validator.isEmpty(value)) {
          setValidatorEmail({ status: false, msg: '' })
          setEmail(value)
        } else if (!validator.isEmail(value) && validator.isEmpty(value)) {
          setValidatorEmail({
            status: true,
            msg: 'El campo: correo es obligatorio'
          })
        } else {
          setValidatorEmail({
            status: true,
            msg: 'Debe ingresar un email válido'
          })
        }
        break
      case 'mensaje': {
        if (validator.isEmpty(value)) {
          setValidatorCmt({
            status: true,
            msg: 'El campo: mensaje es obligatorio'
          })
        } else if (value.length < 15) {
          setValidatorCmt({ status: true, msg: 'Mensaje muy corto' })
        } else {
          setValidatorCmt({ status: false, msg: '' })
          setMensaje(value)
        }
      }

      default:
        break
    }
  }

  const handleChangeCaptcha = () => {
    if (!captcha.current.getValue()) {
      setValidatorCaptcha({ status: true, msg: 'Debe completar el catpcha' })
    } else {
      setValidatorCaptcha({ status: false, msg: '' })
    }
  }

  const handleSubmit = e => {
    e.preventDefault()

    const SERVICE_ID = import.meta.env.VITE_MAILJS_SERVICE_ID
    const TEMPLATE_ID = import.meta.env.VITE_MAILJS_TEMPLATE_ID
    const PUBLIC_KEY = import.meta.env.VITE_MAILJS_PUBLIC_KEY

    setTimeout(() => {
      setLoading(true)
    }, 500)
    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY).then(
      result => {
        if (result.text === 'OK') {
          setLoading(false)
          setEmailSended(result.text)
          //reset
          reset()
        }
      },
      error => {
        console.log(error.text)
        setLoading(false)
        setEmailSended('')
      }
    )
  }

  const handleToast = () => {
    setEmailSended('')
  }

  const validatorBtnEnviar =
    validatorEmail.status || validatorCmt.status || validatorCaptcha.status

  useEffect(() => {
    const exec = () => {
      //reset
      reset()
    }
    exec()
  }, [isOpenModalContacto])

  return (
    <>
      <Transition appear show={isOpenModalContacto} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={() => {}}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='md:w-1/2 w-full h-auto transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title
                    as='h3'
                    className='text-2xl font-medium leading-6 text-gray-900 text-center'
                  >
                    <div className='flex'>
                      <h3 className='text-xl uppercase text-blue-pastel-300 flex-1'>
                        {t('contact')}
                      </h3>
                      <button onClick={() => handleModalContacto()}>
                        <XCircleIcon className='h-7 w-7 text-red-700 text-right' />
                      </button>
                    </div>
                  </Dialog.Title>
                  <div className='mt-2'>
                    <div className='h-auto'>
                      <span>
                        {t('contact_desc.0')}
                        <a
                          href='mailto:sjorgefabi@gmail.com'
                          className='text-red-900 font-bold'
                        >
                          {' '}
                          Email{' '}
                        </a>
                        {t('contact_desc.1')}{' '}
                      </span>
                      <form
                        className='flex flex-col gap-4'
                        onSubmit={handleSubmit}
                        ref={form}
                      >
                        <div>
                          <div className='mb-2 block'>
                            <Label
                              htmlFor='email'
                              value={t('contact_form.0')}
                            />
                          </div>
                          <TextInput
                            id='email'
                            type='email'
                            name='user_email'
                            placeholder='✉️...'
                            required={true}
                            onChange={e => fieldsValidation(e)}
                            helperText={
                              validatorEmail.msg && (
                                <>
                                  <span className='font-medium text-red-500'>
                                    {validatorEmail.msg}
                                  </span>
                                </>
                              )
                            }
                          />
                        </div>
                        <div>
                          <div className='mb-2 block'>
                            <Label
                              htmlFor='mensaje'
                              value={t('contact_form.1')}
                            />
                          </div>
                          <Textarea
                            id='mensaje'
                            className='p-3'
                            placeholder='📝...'
                            name='message'
                            required={true}
                            rows={4}
                            onChange={e => fieldsValidation(e)}
                            helperText={
                              validatorCmt.msg && (
                                <>
                                  <span className='font-medium text-red-500'>
                                    {validatorCmt.msg}
                                  </span>
                                </>
                              )
                            }
                          />
                        </div>
                        <span className='flex justify-center items-center flex-col gap-2'>
                          <span className='flex flex-col gap-2'>
                            <ReCAPTCHA
                              ref={captcha}
                              sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                              onChange={handleChangeCaptcha}
                            />
                            {validatorCaptcha.msg && (
                              <span className='text-center text-red-500'>
                                {validatorCaptcha.msg}
                              </span>
                            )}
                          </span>

                          {/**Si el correo fue enviado, mostrar alerta si no mostrar el boton enviar.
                           * El boton enviar mostrara el texto normal si no mostrara icono loading cuando se envie
                           */}
                          {emailSended.length > 0 ? (
                            <>
                              <span className='flex justify-center'>
                                <Alert
                                  color='success'
                                  onDismiss={function onDismiss() {
                                    setEmailSended('')
                                  }}
                                >
                                  <span className='flex justify-center gap-2'>
                                    <span className='font-medium'>
                                      <MailIcon className='h-5 w-5' />
                                    </span>{' '}
                                    {t('contact_msg')}
                                  </span>
                                </Alert>
                              </span>
                            </>
                          ) : (
                            <button
                              type='submit'
                              disabled={validatorBtnEnviar ? true : false}
                              className={`text-white font-bold p-2 rounded-lg bg-blue-pastel-300 hover:bg-blue-pastel-200
                              ${validatorBtnEnviar && 'opacity-60'}
                              `}
                            >
                              {loading ? (
                                <>
                                  <div className='mr-3'>
                                    <Spinner size='sm' light={true} />
                                  </div>
                                  {t('loading')}...
                                </>
                              ) : (
                                <>
                                  {t('contact_button')} &nbsp;
                                  <FontAwesomeIcon
                                    icon={faPaperPlane}
                                    size='sm'
                                  />
                                </>
                              )}
                            </button>
                          )}
                        </span>
                      </form>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
