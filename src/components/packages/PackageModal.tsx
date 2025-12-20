"use client";

import { Package } from "@/lib/data/packages";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { Check, Clock, Users, AlertCircle } from "lucide-react";
import Link from "next/link";

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
  if (!package_) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={package_.title}>
      <div className="space-y-6">
        {/* Subtitle & Description */}
        <div>
          <span className="inline-block px-3 py-1 bg-[#0D9488]/10 text-[#0D9488] text-sm font-medium rounded-full mb-3">
            {package_.subtitle}
          </span>
          <p className="text-[#6B7280]">{package_.description}</p>
        </div>

        {/* For Whom */}
        <div>
          <h4 className="flex items-center gap-2 text-lg font-semibold text-[#111827] mb-3">
            <Users className="w-5 h-5 text-[#0D9488]" />
            Kimler İçin?
          </h4>
          <ul className="space-y-2">
            {package_.forWhom.map((item, index) => (
              <li key={index} className="flex items-start gap-3 text-[#6B7280]">
                <Check className="w-4 h-4 text-[#0D9488] flex-shrink-0 mt-1" />
                <span className="text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Includes */}
        <div>
          <h4 className="flex items-center gap-2 text-lg font-semibold text-[#111827] mb-3">
            <Check className="w-5 h-5 text-[#0D9488]" />
            Neler İçerir?
          </h4>
          <ul className="space-y-2">
            {package_.includes.map((item, index) => (
              <li key={index} className="flex items-start gap-3 text-[#6B7280]">
                <Check className="w-4 h-4 text-[#10B981] flex-shrink-0 mt-1" />
                <span className="text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Delivery Time & Price */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-[#F9FAFB] rounded-xl p-4">
            <div className="flex items-center gap-2 text-[#6B7280] mb-1">
              <Clock className="w-4 h-4" />
              <span className="text-sm">Teslim Süresi</span>
            </div>
            <p className="font-semibold text-[#111827]">{package_.deliveryTime}</p>
          </div>
          <div className="bg-[#0D9488]/5 rounded-xl p-4 border border-[#0D9488]/20">
            <div className="flex items-center gap-2 text-[#6B7280] mb-1">
              <span className="text-sm">Başlangıç Fiyatı</span>
            </div>
            <p className="font-bold text-[#0D9488] text-lg">{package_.price}</p>
          </div>
        </div>

        {/* Extra Services */}
        {package_.extraServices && package_.extraServices.length > 0 && (
          <div>
            <h4 className="flex items-center gap-2 text-lg font-semibold text-[#111827] mb-3">
              <AlertCircle className="w-5 h-5 text-[#0D9488]" />
              Ek Hizmetler & Notlar
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
            </Button>
          </Link>
        </div>
      </div>
    </Modal>
  );
}
