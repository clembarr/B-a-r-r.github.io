import styles from '../../style'
import { ContactForm, SubmitEngine } from '../contact'
import { SocialMedia } from '../../assets/dataTypes'
import { socialMedia } from '../../assets/constants'
import { ThemeContext } from '../theme/ThemeEngine'
import { useContext } from 'react'

/**
 * @component Contact
 * @description Contact section. On desktop, shows the contact form on the left and
 * social media links in the centre. On mobile, the layout stacks vertically with
 * the form rendered below the social links (outside SubmitEngine to avoid context
 * duplication — only the desktop form uses SubmitEngine).
 */
const Contact = () => {
  const { currentTheme } = useContext(ThemeContext);

  return (
    <section id="contact"
      className={`
        ${styles.sizeFull}
        ${styles.flexColToRowAtMd}
        ${styles.contentCenter}
        xl:space-x-50 lg:space-x-37.5
      `}
    >
        <div id='form-container-desktop'
            className={`
              ${styles.flexRowHideAtMd}
              w-2/5
              h-full
              ${styles.contentCenter}
              overflow-hidden
            `}
        >
          <SubmitEngine>
            <ContactForm />
          </SubmitEngine>
        </div>

        <div id='contact-info'
            className={`
              w-fit
              h-full
              ${styles.flexCol}
              ${styles.contentCenter}
              space-y-[15%] md:space-y-[50%] lg:space-y-[35%]
              order-last md:order-none
            `}
        >
          {socialMedia.map((social: SocialMedia) => (
            <div key={`icon-${social.label}-container`}
              className={`
                ${styles.flexRowToColAtMd}
                ${styles.contentStartAll}
                w-full
                h-fit
                space-y-[3%] md:space-y-[1%]
                md:color-scheme-primary
                rounded-lg md:rounded-none
                py-[3%] px-[5%] md:p-0
                shadow-md md:shadow-none
              `}
            >
              <a href={social.link}
                className={`
                  ${styles.flexRow}
                  ${styles.contentStartX}
                `}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={social.icon.content[currentTheme]}
                    alt={social.icon.alt}
                    className={`
                      object-cover
                      aspect-square
                      w-full md:w-[120%]
                    `}
                />
              </a>
              <hr className={`
                  hidden md:block
                  ${styles.line}
                  w-[20%]
                  h-[2.5px]
                `}
              />

              <div className={`
                  ${styles.flexColHideAtMd}
                  ${styles.contentStartX}
                `}
              >
                <label className={`
                  text-xs md:text-base
                  w-full
                  ${styles.contentStartX}
                `}
                >{social.at}</label>
              </div>

              <label className={`
                  hidden md:block
                  md:text-base text-xs
                  w-full
                  ${styles.contentStartX}
                `}
              >{social.at}</label>
            </div>
          ))}
        </div>

        <div id='form-container-mobile'
            className={`
              md:hidden ${styles.flexCol}
              w-full
              h-full
              ${styles.contentCenter}
              overflow-hidden
              order-first md:order-none
            `}
        >
          <ContactForm />
        </div>
    </section>
  )
}

export default Contact
