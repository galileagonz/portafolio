"use client";

import { useSearchParams } from "next/navigation";
import { contactSection, services } from "@/data/content";
import { SERVICE_PARAM } from "@/lib/services";

// Option value for requests that match no listed service
export const OTHER_SERVICE = "otro";

type ServiceSelectFieldProps = {
  id: string;
  className: string;
  invalid: boolean;
  describedBy?: string;
  preselect: string;
};

// Uncontrolled select; a new preselect remounts it with that value
export function ServiceSelectField({ id, className, invalid, describedBy, preselect }: ServiceSelectFieldProps) {
  return (
    <select
      key={preselect}
      id={id}
      name="service"
      required
      defaultValue={preselect}
      aria-invalid={invalid}
      aria-describedby={describedBy}
      className={className}
    >
      <option value="" disabled>
        {contactSection.servicePlaceholder}
      </option>
      {services.map((service) => (
        <option key={service.id} value={service.id}>
          {service.title}
        </option>
      ))}
      <option value={OTHER_SERVICE}>{contactSection.serviceOther}</option>
    </select>
  );
}

// Reads ?servicio= from "Cotizar" links; needs a Suspense boundary
export function ServiceSelect(props: Omit<ServiceSelectFieldProps, "preselect">) {
  const param = useSearchParams().get(SERVICE_PARAM);
  const preselect = param && services.some((s) => s.id === param) ? param : "";
  return <ServiceSelectField {...props} preselect={preselect} />;
}
