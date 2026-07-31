import { useState } from "react";
import CustomHero from "@/components/organisms/hero/CustomHero";
import ProductFilter from "@/components/molecules/filter/ProductFilter";
import CTA from "@/components/organisms/CTA";
import ProductList from "@/components/organisms/ProductList";

export default function Product() {
  const [tech, setTech] = useState<string | undefined>(undefined);
  const [deployment, setDeployment] = useState<string | undefined>(undefined);

  return (
    <section>
      <CustomHero
        title="Ready-to-use IT Products"
        subtitle="Ready-to-use IT Products"
        description="These software solutions streamline operations, enhance productivity, and equip your team with the tools they need to thrive in a competitive landscape."
        path="/product"
      >
        <ProductFilter
          techValue={tech}
          deployValue={deployment}
          onTechChange={setTech}
          onDeployChange={setDeployment}
        />
      </CustomHero>
      <section className="py-[5%]">
        <ProductList
          name="Our Ready-to-use IT Product Catalog"
          type={"it_training"}
        />
      </section>
      <CTA />
    </section>
  );
}
