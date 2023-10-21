import qr from '../../assets/qr.png';
import context from '../context'
import Layout from '../Layout'

const title = `You spotted ${context.firstName}!`
const description = `Scan the QR code to find ${context.firstName} on the internet`

export const documentProps = {
  title,
  description,
}


export function Page() {
  return (
    <Layout>
      <section className="my-8 flex flex-col items-center">
        <h1 className="my-4 text-2xl">Hello 👋 This is {context.firstName}!</h1>

        <img className="p-4 w-64 h-64" src={qr} alt="QR Code" />

        <p className="mt-4 text-neutral-500">🔎 Scan to find me on the internet🌐</p>
      </section>
    </Layout>
  )
}
