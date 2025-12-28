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
  return (
    <div
      className={cn(
        "relative bg-white rounded-2xl shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 overflow-hidden h-full flex flex-col",
        package_.isPopular && "ring-2 ring-[#0D9488]"
      )}
    >
      {/* Popular Badge */}
      {package_.isPopular && (
        <div className="absolute top-0 right-0">
          <div className="bg-[#0D9488] text-white px-4 py-1.5 text-xs font-bold rounded-bl-xl flex items-center gap-1 uppercase tracking-wider">
            <Star className="w-3 h-3 fill-current" />
            En Çok Tercih Edilen
          </div>
        </div>
      )}

      <div className="p-8 flex-grow flex flex-col">
        {/* Header */}
        <div className="mb-6">
          <h3
            className="text-3xl font-bold text-[#111827] mb-4"
            style={{ fontFamily: 'var(--font-family-display)' }}
          >
            {package_.title}
          </h3>
          <p className="text-[#6B7280] leading-relaxed">
            {package_.description}
          </p>
        </div>

        {/* Features List */}
        <div className="space-y-4 mb-8 flex-grow">
          {package_.includes.slice(0, 5).map((item, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#0D9488]/10 flex items-center justify-center mt-0.5">
                <Check className="w-3 h-3 text-[#0D9488]" />
              </div>
              <span className="text-sm text-[#4B5563]">{item}</span>
            </div>
          ))}
          {package_.includes.length > 5 && (
            <p className="text-sm text-[#0D9488] font-medium pl-8">
              +{package_.includes.length - 5} özellik daha
            </p>
          )}
        </div>

        {/* CTA */}
        <Button
          onClick={() => onSelect(package_)}
          variant={package_.isPopular ? "primary" : "outline"}
          className="w-full mt-auto py-6 text-base font-bold flex items-center justify-center gap-2 group"
        >
          Paketi İncele & Özelleştir
          <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </Button>
      </div>
    </div>
  );
}
