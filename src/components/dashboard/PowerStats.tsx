import { motion } from "framer-motion";
import { useState } from "react";
import { useCompanyStore } from "@/components/CompanySidebar";
import { companiesData } from "@/data/companies";
import { StatCard } from "./StatCard";
import { useHiddenItems } from "@/hooks/useHiddenItems";

export const PowerStats = () => {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const { selectedCompanyId } = useCompanyStore();
  const selectedCompany = companiesData.find(
    (company) => company.id === selectedCompanyId
  );

  const { hideItem, isHidden } = useHiddenItems('hidden-power-stats');

  const visibleStats = selectedCompany?.stats.filter(
    (stat) => !isHidden(stat.title)
  ) || [];

  return (
    <>
      {visibleStats.map((stat, index) => (
        <StatCard
          key={stat.title}
          stat={stat}
          index={index}
          onHide={() => hideItem(stat.title)}
        />
      ))}
    </>
  );
};