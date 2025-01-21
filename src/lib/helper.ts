import { OrdeItemProps } from "@/providers/order";

export function calculateTotalOrder(orders: OrdeItemProps[]) {
  if (!orders || !Array.isArray(orders)) {
    return 0;
  }

  return orders.reduce((total, item) => {
    try {
      if (!item?.product?.price || !item?.amount) {
        return total;
      }

      const price = parseFloat(item.product.price);
      const amount = Number(item.amount);

      if (isNaN(price) || isNaN(amount)) {
        return total;
      }

      const itemTotal = price * amount;
      return total + itemTotal;
    } catch (error) {
      console.error('Erro ao calcular valor do item:', error);
      return total;
    }
  }, 0).toFixed(2);
}