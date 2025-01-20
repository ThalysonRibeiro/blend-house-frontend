import { OrdeItemProps } from "@/providers/order";

export function calculateTotalOrder(orders: OrdeItemProps[]) {
  return orders.reduce((total, item) => {
    const itemTotal = parseFloat(item.product.price) * item.amount;
    return total + itemTotal;
  }, 0);
}