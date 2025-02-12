import Image from "next/image";
import styles from "./page.module.scss";
import logoImg from "../../public/logo.svg";
import Link from "next/link";
import { api } from "@/services/app";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";


import { AxiosError } from "axios";
import { toast } from "sonner";


export default function Home() {

  async function handleLogin(formData: FormData) {
    "use server"
    const email = formData.get("email");
    const password = formData.get("password");

    // if (email === "" || password === "") {
    //   return;
    // }

    if (!email || !password) {
      return;
    }

    try {
      const response = await api.post("/session", {
        email,
        password
      });

      if (!response.data.token) {
        return;
      }

      const expressTime = 60 * 60 * 24 * 30 * 1000;
      const cookiesStore = await cookies();
      cookiesStore.set("session", response.data.token, {
        maxAge: expressTime,
        path: "/",
        httpOnly: false,
        secure: process.env.NODE_ENV === "production"
      })

    } catch (error: unknown) {

      if (error instanceof AxiosError) {
        // A partir daqui, 'error' é tratado como um AxiosError
        if (error.response) {
          console.error("Erro de resposta:", error.response.data);
          console.error("Código de status:", error.response.status);
        } else {
          console.error("Erro na requisição:", error.message);
        }
      } else {
        // Caso o erro não seja um AxiosError, trataremos ele de forma genérica
        console.error("Erro desconhecido:", error);
      }
      return;;
    }
    redirect("/dashboard");

  }

  return (
    <>
      <div className={styles.containerCenter}>
        <section className={styles.login}>
          <div className={styles.logo}>
            <h1>BLEND HOUSE</h1>
            <p>Restaurant & Lounge</p>
          </div>

          <form action={handleLogin}>
            <input
              type="email"
              name="email"
              placeholder="Digite seu email"
              required
              className={styles.input}
            />
            <input
              type="password"
              name="password"
              placeholder="Digite sua enha"
              required
              className={styles.input}
            />
            <button type="submit">
              Acessar
            </button>
          </form>

          <Link href="/signup" className={styles.text}>
            Não possue uma conta? <strong>Cadastre-se</strong>
          </Link>
        </section>
      </div>
    </>
  );
}
