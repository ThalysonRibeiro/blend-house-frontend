"use client"
import { RefreshCw } from "lucide-react"
import styles from "./styles.module.scss"
import { OrderProps } from "@/lib/order.type"
import { Modalorder } from "../modal"
import { useContext } from 'react' // Correto import do useContext
import { OrderContext } from "@/providers/order"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface Props {
  orders: OrderProps[];
}

export function Orders({ orders }: Props) {
  const { isOpen, onRequestOpem } = useContext(OrderContext); // Usando useContext em vez de use
  const route = useRouter();

  async function handleDetailOrde(order_id: string) {
    await onRequestOpem(order_id);
  }

  function handleRefresh() {
    route.refresh();
    toast.success("Pedidos atualizados com sucesso!");
  }

  return (
    <>
      <main className={styles.container}>
        <section className={styles.containerHeader}>
          <h1>Ultimos pedidos</h1>
          <button onClick={handleRefresh}>
            <RefreshCw size={24} color="#3fffa3" />
          </button>
        </section>
        <section className={styles.listOrders}>
          {orders.length === 0 && (
            <span className={styles.emptyItem}>
              Nenhum pedido aberto no momento...
            </span>
          )}

          {orders.map((order) => (
            <button
              onClick={() => handleDetailOrde(order.id)}
              key={order.id}
              className={styles.orderItem}
            >
              <div className={styles.tag}></div>
              <span>Mesa {order.table}</span>
            </button>
          ))}
        </section>
      </main>
      {isOpen && <Modalorder />}
    </>
  )
}