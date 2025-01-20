import { getCookieServer } from "@/lib/cookieServer"
import { Form } from "./components/form"
import styles from "./styles.module.scss"
import { api } from "@/services/app";


export default async function Producty() {

  const token = await getCookieServer();

  const response = await api.get("/category", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return (
    <main>
      <Form categories={response.data} />
    </main>
  )
}