"use client";

import { Package } from "@/lib/data/packages";
import { Check, Star, ArrowUpRight } from "lucide-react";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface PackageCardProps {
  package_: Package;
  onSelect: (pkg: Package) => void;
}

export default function PackageCard({ package_, onSelect }: PackageCardProps) {
  // Define border and button colors based on package id
  const getBorderColor = () => {
    switch (package_.id) {
      case "on-analiz":
        return "ring-2 ring-[#a3d95b]"; // Light green
      case "yerinde-analiz":
        return "ring-2 ring-[#8CC63F]"; // Standard green
      case "ozel-danismanlik":
        return "ring-2 ring-[#2C3E50]"; // Navy blue
      default:
        return "";
    }
  };

  const getButtonVariant = () => {
    switch (package_.id) {
      case "on-analiz":
        return "lightGreen";
      case "yerinde-analiz":
        return "primary";
      case "ozel-danismanlik":
        return "navy";
      default:
        return "outline";
    }
  };

  return (
    <div
      className={cn(
        "relative bg-white rounded-2xl shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 overflow-hidden h-full flex flex-col",
        getBorderColor()
      )}
    >
      {/* Popular Badge */}
      {package_.isPopular && (
        <div className="absolute top-0 right-0">
          <div className="bg-[#8CC63F] text-white px-4 py-1.5 text-xs font-bold rounded-bl-xl flex items-center gap-1 uppercase tracking-wider">
            <Star className="w-3 h-3 fill-current" />
            En Çok Tercih Edilen
          </div>
        </div>
      )}

      <div className="p-8 flex-grow flex flex-col">
        {/* Header */}
        <div className="mb-6 text-center">
          <h3
            className="text-3xl font-bold text-[#2C3E50] mb-4"
            style={{ fontFamily: 'var(--font-family-display)' }}
          >
            {package_.title}
          </h3>
          <p className="text-[#6B7280] leading-relaxed">
            {package_.description}
          </p>
        </div>

        {/* "Neler İçerir?" Section */}
        {package_.whatIncludes && (
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-[#2C3E50] mb-3">Neler İçerir?</h4>
            <div className="space-y-3">
              {package_.whatIncludes.map((item, index) => (
                <div key={index}>
                  <p className="font-bold text-[#2C3E50] text-sm">{item.title}</p>
                  {item.details && item.details.map((detail, idx) => (
                    <p key={idx} className="text-sm text-[#6B7280] ml-2">– {detail}</p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Legacy Features List (fallback) */}
        {!package_.whatIncludes && (
          <div className="space-y-4 mb-8 flex-grow">
            {package_.includes.slice(0, 5).map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#8CC63F]/10 flex items-center justify-center mt-0.5">
                  <Check className="w-3 h-3 text-[#8CC63F]" />
                </div>
                <span className="text-sm text-[#4B5563]">{item}</span>
              </div>
            ))}
            {package_.includes.length > 5 && (
              <p className="text-sm text-[#8CC63F] font-medium pl-8">
                +{package_.includes.length - 5} özellik daha
              </p>
            )}
          </div>
        )}

        {/* CTA */}
        <Button
          onClick={() => onSelect(package_)}
          variant={getButtonVariant() as "primary" | "outline" | "secondary" | "lightGreen" | "navy"}
          className="w-full mt-auto py-4 text-base font-bold flex items-center justify-center gap-2 group whitespace-nowrap"
        >
          Paketi İnceleyin
          <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </Button>
      </div>
    </div>
  );
}
