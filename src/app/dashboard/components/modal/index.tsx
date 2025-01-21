import { X } from "lucide-react";
import styles from "./styles.module.scss";
import { OrderContext } from "@/providers/order";
import { calculateTotalOrder } from "@/lib/helper";
import { useContext } from "react";

export function Modalorder() {
  const { onRequestClose, order, finishOrde } = useContext(OrderContext);

  if (!order || order.length === 0) {
    return null;
  }

  async function handleFinishOrder() {
    if (order[0]?.order?.id) {
      await finishOrde(order[0].order.id);
    }
  }

  return (
    <div>
      <dialog className={styles.dialogContainer}>
        <section className={styles.dialogContent}>
          <button onClick={onRequestClose} className={styles.dialogBack}>
            <X size={40} color="#cd0049" />
          </button>

          <article className={styles.container}>
            <h2>Detalhes do pedido</h2>

            {order[0]?.order?.table && (
              <span className={styles.table}>
                Mesa <b>{order[0].order.table}</b>
              </span>
            )}

            {order[0]?.order?.name && (
              <span className={styles.name}>
                Nome da mesa: <b>{order[0].order.name}</b>
              </span>
            )}

            {order.map((item) => (
              item?.product && (
                <section key={item.id} className={styles.Item}>
                  <span>
                    Qtd: {item.amount} - <b>{item.product.name}</b> - R$
                    {(parseFloat(item.product.price) * (item.amount || 0)).toFixed(2)}
                  </span>
                  <span className={styles.description}>
                    {item.product.description}
                  </span>
                </section>
              )
            ))}

            <h3 className={styles.total}>
              Valor total: R$ {calculateTotalOrder(order)}
            </h3>

            <button className={styles.buttonOrder} onClick={handleFinishOrder}>
              Concluir pedido
            </button>
          </article>
        </section>
      </dialog>
    </div>
  );
}