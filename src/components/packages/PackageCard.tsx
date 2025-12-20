"use client";

import { Package } from "@/lib/data/packages";
import { Check, Star } from "lucide-react";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface PackageCardProps {
  package_: Package;
  onSelect: (pkg: Package) => void;
}

export default function PackageCard({ package_, onSelect }: PackageCardProps) {
  return (
    <div
      className={cn(
        "relative bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden",
        package_.isPopular ? "border-[#0D9488]" : "border-gray-100"
      )}
    >
      {/* Popular Badge */}
      {package_.isPopular && (
        <div className="absolute top-0 right-0">
          <div className="bg-[#0D9488] text-white px-4 py-1 text-sm font-medium rounded-bl-lg flex items-center gap-1">
            <Star className="w-4 h-4 fill-current" />
            Popüler
          </div>
        </div>
      )}

      <div className="p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <p className="text-[#0D9488] font-medium text-sm mb-1">
            {package_.subtitle}
          </p>
          <h3 className="text-2xl font-bold text-[#111827]">{package_.title}</h3>
        </div>

        {/* Description */}
        <p className="text-[#6B7280] text-center mb-6 min-h-[60px]">
          {package_.description}
        </p>

        {/* Quick Features */}
        <div className="space-y-3 mb-8">
          {package_.includes.slice(0, 4).map((item, index) => (
            <div key={index} className="flex items-start gap-3">
              <Check className="w-5 h-5 text-[#0D9488] flex-shrink-0 mt-0.5" />
              <span className="text-sm text-[#6B7280] line-clamp-2">{item}</span>
            </div>
          ))}
          {package_.includes.length > 4 && (
            <p className="text-sm text-[#0D9488] font-medium text-center">
              +{package_.includes.length - 4} özellik daha
            </p>
          )}
        </div>

        {/* CTA */}
        <Button
          onClick={() => onSelect(package_)}
          variant={package_.isPopular ? "primary" : "outline"}
          className="w-full"
        >
          Detayları Gör
        </Button>
      </div>
    </div>
  );
}
