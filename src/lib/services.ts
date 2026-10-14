// Query param the contact form reads to preselect a service
export const SERVICE_PARAM = "servicio";

// Home URL that opens Contacto with a service preselected
export function serviceQuoteHref(serviceId: string) {
  return { pathname: "/", query: { [SERVICE_PARAM]: serviceId }, hash: "contacto" };
}
