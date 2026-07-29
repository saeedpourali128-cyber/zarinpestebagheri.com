// TODO(فاز بعد): شماره واقعی واتس‌اپ واحد فروش را اینجا قرار دهید تا دکمه «استعلام قیمت» به لینک واقعی wa.me وصل شود.
export const whatsappConfig = {
  enabled: false,
  phoneNumber: null as string | null,
  defaultMessage: "با سلام، در خصوص قیمت محصولات زرین پسته باقری نیاز به استعلام دارم.",
};

export function getWhatsappLink(productName?: string): string | null {
  if (!whatsappConfig.enabled || !whatsappConfig.phoneNumber) return null;
  const text = productName
    ? `${whatsappConfig.defaultMessage} (محصول مورد نظر: ${productName})`
    : whatsappConfig.defaultMessage;
  return `https://wa.me/${whatsappConfig.phoneNumber}?text=${encodeURIComponent(text)}`;
}
