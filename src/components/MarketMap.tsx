"use client";
import React from "react";
import { CompanyCard } from "./CompanyCard";
import { MarketMapData, Layer } from "@/types/types";

export function MarketMap({ data }: { data: MarketMapData }) {
  const generationDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });

  return (
    <div className="max-w-[1440px] mx-auto market-map">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-4xl font-bold text-[--text-primary]">
            {data.title.heading.toUpperCase()}
          </h1>
          <div className="text-xl text-[--text-secondary]">
            <a
              href="https://twitter.com/auchenberg"
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="text-[--text-primary] no-underline"
            >
              @auchenberg
            </a>
            {" - "}
            {generationDate}
          </div>
        </div>

        <h3 className="text-xl font-light text-[--text-secondary] w-[700px] pb-2.5">
          {data.title.subtitle}
        </h3>
      </div>

      {data.layers.map((layer: Layer) => (
        <div
          key={layer.number}
          className="border border-[--border-color] relative z-[1] -mt-px first:mt-0"
        >
          <div
            className={`p-5 border-b border-[--border-color] flex gap-6`}
            style={{ backgroundColor: `var(--layer${layer.number}-bg)` }}
          >
            <div
              className={`font-bold`}
              style={{ color: `var(--layer${layer.number}-text)` }}
            >
              <span className={`pr-5`}>LAYER {layer.number}</span>
              {layer.name}
            </div>
          </div>

          <div className="flex flex-col">
            {layer.sections.map((section) => (
              <div
                key={section.name}
                className="bg-white border-b border-dashed border-[--border-color] p-5 min-w-[100px] last:border-b-0"
              >
                <div className="text-base font-bold text-[--text-primary] mb-4">
                  {section.name}
                </div>
                <div className="flex flex-wrap gap-2">
                  {section.companies
                    .filter((company) => !company.hidden)
                    .map((company) => (
                      <CompanyCard key={company.name} company={company} />
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="mt-8 mb-8 text-center text-[--text-secondary]">
        <p>
          Want to add your startup to this market map?{" "}
          <a
            href="https://github.com/auchenberg/ai-tools-integrations-market-map?tab=readme-ov-file#how-to-contribute"
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="text-[--text-primary] hover:underline"
          >
            Submit a PR on GitHub
          </a>
        </p>
      </div>
    </div>
  );
}
