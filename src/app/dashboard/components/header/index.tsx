"use client"
import Link from "next/link";
import styles from "./styles.module.scss";
import Image from "next/image";
import logoImg from "../../../../../public/logo-blend-house.webp"
import { LogOutIcon } from "lucide-react";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function Header() {
  const router = useRouter();

  async function handleLogout() {
    deleteCookie("session", { path: "/" });
    toast.success("Logout feito com sucesso!!");
    router.replace("/");
  }

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Link href="/dashboard">
          <Image
            src={logoImg}
            alt="logo do restaurante"
            width={190}
            height={60}
            priority={true}
            quality={100}
          />
        </Link>
        <nav>
          <Link href="/dashboard/category">Categoria</Link>
          <Link href="/dashboard/product">Produto</Link>

          <form action={handleLogout}>
            <button type="submit">
              <LogOutIcon size={24} color="#fff" />
            </button>
          </form>
        </nav>
      </div>
    </header>
  )
}