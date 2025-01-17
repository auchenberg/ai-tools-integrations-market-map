"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Company } from "@/types/types";
import { Tooltip } from "./Tooltip";

const zoomScales: Record<string, string> = {
  "30": "scale-[0.3]",
  "40": "scale-[0.4]",
  "50": "scale-[0.5]",
  "60": "scale-[0.6]",
  "70": "scale-[0.7]",
  "80": "scale-[0.8]",
  "90": "scale-[0.9]",
  "110": "scale-[1.1]",
  "120": "scale-[1.2]",
  "130": "scale-[1.3]",
  "140": "scale-[1.4]",
  "150": "scale-[1.5]",
};

export function CompanyCard({ company }: { company: Company }) {
  const [imageError, setImageError] = useState(false);
  const zoomClass = company.zoom ? zoomScales[company.zoom] : "";

  const extractDomain = (url: string): string => {
    if (!url) return "";

    try {
      const urlWithProtocol = url.startsWith("http") ? url : `https://${url}`;
      const domain = new URL(urlWithProtocol).hostname;
      return domain.replace(/^www\./i, "");
    } catch {
      return url
        .replace(/^(?:https?:\/\/)?(?:www\.)?/i, "")
        .split("/")[0]
        .split("?")[0];
    }
  };

  const getImageUrl = (): string => {
    if (company.logo) {
      return company.logo;
    }

    if (company.link) {
      const domain = extractDomain(company.link);
      if (!domain) return "";
      return `https://img.logo.dev/${domain}?token=pk_YjPzhjWbT7iotg0IUzVdNQ&size=90&retina=true`;
    }

    return "";
  };

  const imageUrl = getImageUrl();

  return (
    <Tooltip content={company.description}>
      <div
        className={`px-3 py-4 cursor-pointer max-h-[70px] w-[140px] flex items-center justify-center 
                   hover:bg-white/5 hover:-translate-y-0.5 hover:z-50 transition-all duration-200
                   ${company.zoom ? `${zoomClass}` : ""}`}
        role="listitem"
        aria-label={company.name}
      >
        <a
          href={company.link || "#"}
          target="_blank"
          rel="nofollow noopener noreferrer"
          className="flex items-center justify-center w-full h-full"
          title={company.name}
        >
          {imageUrl && !imageError ? (
            <Image
              src={imageUrl}
              alt={company.name}
              width={140}
              height={80}
              className="object-contain w-full h-full"
              onError={() => setImageError(true)}
              priority={false}
              loading="lazy"
            />
          ) : (
            <div className="text-sm font-medium text-gray-600 px-2 truncate max-w-full">
              {company.name}
            </div>
          )}
        </a>
      </div>
    </Tooltip>
  );
}
