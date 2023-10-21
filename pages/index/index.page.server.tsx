import profilePicture from '../../assets/profile-picture.webp';
import context from '../context'
import Layout from '../Layout'
import Email from '../../assets/mail-outline.svg?react'
import Twitter from '../../assets/logo-twitter.svg?react'
import LinkedIn from '../../assets/logo-linkedin.svg?react'
import GitHub from '../../assets/logo-github.svg?react'
import Medium from '../../assets/logo-medium.svg?react'
import Newsletter from '../../assets/newspaper-outline.svg?react'

const title = `You spotted ${context.firstName}!`
const description = `Find ${context.firstName} on the internet`

export const documentProps = {
  title,
  description,
}

function ListLink({ href, children }: { href: string, children: React.ReactNode }) {
  return (
    <li>
      <a href={href} className="border border-primary-500 text-primary-500 fill-primary-500 px-4 py-2 flex flex-row gap-2 items-center hover:bg-primary-500 hover:text-white hover:fill-white">
        {children}
      </a>
    </li>
  )
}

export function Page() {
  return (
    <Layout>
      <section className="my-8 flex flex-col items-center">
        <img className="p-2 rounded-full shadow-lg w-48 h-48" src={profilePicture} alt={`${context.firstName} ${context.lastName}`} />
        <h1 className="mt-4 text-2xl">{context.firstName} {context.lastName}</h1>
        <div className="text-neutral-500 mt-2">
          <p className="">🛠️ {context.title}</p>
          <p className="">🏢 {context.role} @ {context.company}</p>
        </div>
      </section>
      <section className="px-4 py-2 max-w-xs mx-auto">
        <ul className="flex flex-col gap-2">
          {context.email &&
            <ListLink href={`mailto:${context.email}`}>
              <Email className="w-8 h-8" />
              <span className="hover:text-">Send an email</span>
            </ListLink>}
          {context.links.twitter &&
            <ListLink href={context.links.twitter}>
              <Twitter className="w-8 h-8" />
              <span>Follow on Twitter</span>
            </ListLink>}
          {context.links.linkedin &&
            <ListLink href={context.links.linkedin}>
              <LinkedIn className="w-8 h-8" />
              <span>Connect on LinkedIn</span>
            </ListLink>}
          {context.links.github &&
            <ListLink href={context.links.github}>
              <GitHub className="w-8 h-8" />
              <span>View on GitHub</span>
            </ListLink>}
          {context.links.medium &&
            <ListLink href={context.links.medium}>
              <Medium className="w-8 h-8" />
              <span>Read on Medium</span>
            </ListLink>}
          {context.links.newsletter &&
            <ListLink href={context.links.newsletter}>
              <Newsletter className="w-8 h-8" />
              <span>Newsletter</span>
            </ListLink>}
        </ul>
      </section>
    </Layout>
  )
}
