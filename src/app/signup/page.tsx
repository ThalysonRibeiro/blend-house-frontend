import Image from "next/image";
import Link from "next/link";
import styles from "../page.module.scss";
import logoImg from "../../../public/logo.svg";
import { api } from "@/services/app";
import { redirect } from "next/navigation";


export default function Signup() {

  async function handleRegister(formeData: FormData) {
    "use server"
    const name = formeData.get("name");
    const email = formeData.get("email");
    const password = formeData.get("password");


    if (name === "" || email === "" || password === "") {
      return;
    }

    try {
      await api.post("/users", {
        name,
        email,
        password,
      });


    } catch (error) {
      console.log("error");
      console.log(error);
    }
    redirect("/");

  }

  return (
    <>
      <div className={styles.containerCenter}>
        {/* <Image
          src={logoImg}
          alt="logo do restaurante"
          className={styles.logiImg}
        /> */}
        <section className={styles.login}>
          <div className={styles.logo}>
            <h1>BLEND HOUSE</h1>
            <p>Restaurant & Lounge</p>
          </div>
          <h1>Criando sua conta</h1>
          <form action={handleRegister}>
            <input
              type="text"
              name="name"
              placeholder="Digite seu nome"
              required
              className={styles.input}
            />
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
              Cadastrar
            </button>
          </form>

          <Link href="/" className={styles.text}>
            Já possue uma conta? <strong>Faça login</strong>
          </Link>
        </section>
      </div>
    </>
  )
}