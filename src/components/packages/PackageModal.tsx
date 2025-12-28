"use client";

import { useState, useEffect, useMemo } from "react";
import { Package, PackageAddOn } from "@/lib/data/packages";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { Check, Clock, Users, AlertCircle, Plus, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface PackageModalProps {
  package_: Package | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function PackageModal({
  package_,
  isOpen,
  onClose,
}: PackageModalProps) {
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);

  // Reset selections when modal opens/closes or package changes
  useEffect(() => {
    if (!isOpen) {
      setSelectedAddOns([]);
    }
  }, [isOpen, package_?.id]);

  const toggleAddOn = (addOnId: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(addOnId)
        ? prev.filter((id) => id !== addOnId)
        : [...prev, addOnId]
    );
  };

  const { totalPrice, addOnsTotal } = useMemo(() => {
    if (!package_) return { totalPrice: 0, addOnsTotal: 0 };

    const addOnsTotal = package_.addOns
      ?.filter((addOn) => selectedAddOns.includes(addOn.id))
      .reduce((sum, addOn) => sum + addOn.price, 0) || 0;

    return {
      totalPrice: package_.basePrice + addOnsTotal,
      addOnsTotal,
    };
  }, [package_, selectedAddOns]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("tr-TR").format(price);
  };

  if (!package_) return null;

  const hasFixedPrice = package_.basePrice > 0;
  const hasAddOns = package_.addOns && package_.addOns.length > 0;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={package_.title}>
      <div className="space-y-6">
        {/* Subtitle & Description */}
        <div>
          <span className="inline-block px-3 py-1 bg-[#8CC63F]/10 text-[#8CC63F] text-sm font-medium rounded-full mb-3">
            {package_.subtitle}
          </span>
          <p className="text-[#6B7280]">{package_.description}</p>
        </div>

        {/* For Whom */}
        <div>
          <h4 className="flex items-center gap-2 text-lg font-semibold text-[#2C3E50] mb-3">
            <Users className="w-5 h-5 text-[#8CC63F]" />
            Kimler İçin?
          </h4>
          <ul className="space-y-2">
            {package_.forWhom.map((item, index) => (
              <li key={index} className="flex items-start gap-3 text-[#6B7280]">
                <Check className="w-4 h-4 text-[#8CC63F] flex-shrink-0 mt-1" />
                <span className="text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Includes */}
        <div>
          <h4 className="flex items-center gap-2 text-lg font-semibold text-[#2C3E50] mb-3">
            <Check className="w-5 h-5 text-[#8CC63F]" />
            Neler İçerir?
          </h4>
          <ul className="space-y-2">
            {package_.includes.map((item, index) => (
              <li key={index} className="flex items-start gap-3 text-[#6B7280]">
                <Check className="w-4 h-4 text-[#a3d95b] flex-shrink-0 mt-1" />
                <span className="text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Add-Ons Section */}
        {hasAddOns && (
          <div>
            <h4 className="flex items-center gap-2 text-lg font-semibold text-[#2C3E50] mb-3">
              <Plus className="w-5 h-5 text-[#8CC63F]" />
              Ek Hizmetler
            </h4>
            <p className="text-sm text-[#6B7280] mb-4">
              İhtiyacınıza göre ek hizmetler ekleyebilirsiniz:
            </p>
            <div className="space-y-3">
              {package_.addOns?.map((addOn) => (
                <AddOnItem
                  key={addOn.id}
                  addOn={addOn}
                  isSelected={selectedAddOns.includes(addOn.id)}
                  onToggle={() => toggleAddOn(addOn.id)}
                  hasFixedPrice={hasFixedPrice}
                />
              ))}
            </div>
          </div>
        )}

        {/* Delivery Time & Price */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-[#F9FAFB] rounded-xl p-4">
            <div className="flex items-center gap-2 text-[#6B7280] mb-1">
              <Clock className="w-4 h-4" />
              <span className="text-sm">Teslim Süresi</span>
            </div>
            <p className="font-semibold text-[#2C3E50]">{package_.deliveryTime}</p>
          </div>
          <div className="bg-[#8CC63F]/5 rounded-xl p-4 border border-[#8CC63F]/20">
            <div className="flex items-center gap-2 text-[#6B7280] mb-1">
              <span className="text-sm">
                {hasFixedPrice ? "Toplam Fiyat" : "Fiyat"}
              </span>
            </div>
            {hasFixedPrice ? (
              <div>
                <p className="font-bold text-[#8CC63F] text-lg">
                  {formatPrice(totalPrice)} TL + KDV
                </p>
                {addOnsTotal > 0 && (
                  <p className="text-xs text-[#6B7280] mt-1">
                    Temel: {formatPrice(package_.basePrice)} TL + Ekler: {formatPrice(addOnsTotal)} TL
                  </p>
                )}
              </div>
            ) : (
              <p className="font-bold text-[#8CC63F] text-lg">{package_.price}</p>
            )}
          </div>
        </div>

        {/* Selected Add-Ons Summary */}
        {hasFixedPrice && selectedAddOns.length > 0 && (
          <div className="bg-[#8CC63F]/5 rounded-xl p-4 border border-[#8CC63F]/20">
            <div className="flex items-center gap-2 mb-3">
              <ShoppingCart className="w-5 h-5 text-[#8CC63F]" />
              <h5 className="font-semibold text-[#2C3E50]">Seçilen Ek Hizmetler</h5>
            </div>
            <ul className="space-y-1">
              {package_.addOns
                ?.filter((addOn) => selectedAddOns.includes(addOn.id))
                .map((addOn) => (
                  <li key={addOn.id} className="flex justify-between text-sm">
                    <span className="text-[#6B7280]">{addOn.name}</span>
                    <span className="font-medium text-[#8CC63F]">{addOn.priceLabel}</span>
                  </li>
                ))}
            </ul>
          </div>
        )}

        {/* Extra Services / Notes */}
        {package_.extraServices && package_.extraServices.length > 0 && (
          <div>
            <h4 className="flex items-center gap-2 text-lg font-semibold text-[#2C3E50] mb-3">
              <AlertCircle className="w-5 h-5 text-[#8CC63F]" />
              Notlar
            </h4>
            <ul className="space-y-2">
              {package_.extraServices.map((item, index) => (
                <li
                  key={index}
                  className="text-sm text-[#6B7280] bg-[#F9FAFB] rounded-lg p-3"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* CTA */}
        <div className="pt-4 border-t border-gray-100">
          <Link href="/iletisim" onClick={onClose}>
            <Button className="w-full" size="lg">
              Talep Oluştur
              {hasFixedPrice && totalPrice > 0 && (
                <span className="ml-2 opacity-80">
                  ({formatPrice(totalPrice)} TL + KDV)
                </span>
              )}
            </Button>
          </Link>
        </div>
      </div>
    </Modal>
  );
}

interface AddOnItemProps {
  addOn: PackageAddOn;
  isSelected: boolean;
  onToggle: () => void;
  hasFixedPrice: boolean;
}

function AddOnItem({ addOn, isSelected, onToggle, hasFixedPrice }: AddOnItemProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={cn(
        "w-full flex items-start gap-4 p-4 rounded-xl border-2 transition-all text-left",
        isSelected
          ? "border-[#8CC63F] bg-[#8CC63F]/5"
          : "border-gray-200 hover:border-[#8CC63F]/50 hover:bg-gray-50"
      )}
    >
      {/* Checkbox */}
      <div
        className={cn(
          "flex-shrink-0 w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all mt-0.5",
          isSelected
            ? "bg-[#8CC63F] border-[#8CC63F]"
            : "border-gray-300"
        )}
      >
        {isSelected && <Check className="w-4 h-4 text-white" />}
      </div>

      {/* Content */}
      <div className="flex-grow">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className={cn(
              "font-medium",
              isSelected ? "text-[#8CC63F]" : "text-[#2C3E50]"
            )}>
              {addOn.name}
            </p>
            {addOn.description && (
              <p className="text-sm text-[#6B7280] mt-1">{addOn.description}</p>
            )}
          </div>
          <span
            className={cn(
              "flex-shrink-0 px-3 py-1 rounded-full text-sm font-semibold",
              isSelected
                ? "bg-[#8CC63F] text-white"
                : hasFixedPrice && addOn.price > 0
                  ? "bg-[#8CC63F]/10 text-[#8CC63F]"
                  : "bg-gray-100 text-[#6B7280]"
            )}
          >
            {addOn.priceLabel}
          </span>
        </div>
      </div>
    </button>
  );
}
