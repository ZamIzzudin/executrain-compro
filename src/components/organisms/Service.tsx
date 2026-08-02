/** @format */

"use client";

import { useState, useEffect } from "react";

import { ServiceCardSkeleton } from "./Skeleton";
import ProductList from "./Product";
import { FadeInUp } from "../atoms/Motion";

import { UserIcon } from "lucide-react";

import { useServices } from "@/services/service/hook";
import { useProduct } from "@/services/strategic-solution/hook";

export default function ServiceList() {
  const [selected, setSelected] = useState<any>();
  const { data: services = [], isLoading } = useServices();

  const { data: product = [], isLoading: productLoading } = useProduct({
    product_category: selected?.slug,
  });

  const displayProduct = product.slice(0, 3);

  useEffect(() => {
    if (services.length > 0) {
      const newService = services[0];
      if (newService) {
        setSelected(newService);
      }
    }
  }, [services]);

  if (isLoading) {
    return (
      <div className="px-[5%] md:px-[7%] lg:px-[10%] py-[5%] text-center w-full space-y-6 md:space-y-6 min-h-[30dvh] md:min-h-[50dvh]">
        <h2 className="font-semibold text-[32px] md:text-[40px] lg:text-[49px] leading-10 md:leading-15">
          Our Business Solutions
        </h2>
        <h3 className="text-[14px] md:text-[18px] lg:text-[20px] font-light">
          Delivering reliable technology solutions for modern business needs.
        </h3>
        <div className="flex justify-evenly gap-4 md:gap-6">
          {[1, 2, 3].map((i) => (
            <ServiceCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="pt-[3%] text-center w-full min-h-[30dvh] md:min-h-[50dvh]">
      <FadeInUp delay={0.1} duration={0.5}>
        <h2 className="font-semibold text-2xl md:text-[32px]">Our Business Solutions</h2>
      </FadeInUp>
      <FadeInUp delay={0.2} duration={0.5}>
        <h3 className="text-base text-gray-600">
          Top-Rated Picks of Our Product
        </h3>
      </FadeInUp>
      {services.length === 0 ? (
        <div className="bg-slate-50 flex flex-col items-center p-[8%] md:p-[5%] rounded-3xl gap-4 md:gap-5">
          <span className="font-[400] text-slate-500 text-[16px] md:text-[18px]">
            No Service Found
          </span>
        </div>
      ) : (
        <div
          id="service-detail"
          className="pt-5 px-[5%] md:px-[7%] lg:px-[10%] w-full"
        >
          <div className="flex flex-wrap gap-2 items-center justify-center border-t pt-4 border-gray-300">
            {services.map((each: any) => {
              const isSelected = selected?._id === each._id;

              return (
                <button
                  key={each._id}
                  type="button"
                  onClick={() => {
                    setSelected(each);
                  }}
                  className={`px-3 py-2 rounded-full text-sm cursor-pointer duration-150 flex gap-2 items-center transition-colors ${
                    isSelected
                      ? "text-white bg-primary-500"
                      : "text-primary-500"
                  } hover:text-primary-500/70 hover:bg-primary-100`}
                >
                  <UserIcon size={14} />
                  {each.service_name}
                </button>
              );
            })}
          </div>
          <ProductList data={displayProduct} isLoading={productLoading} />
        </div>
      )}
    </div>
  );
}
