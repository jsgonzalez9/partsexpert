import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPartByNumber } from '@/lib/supabase';
import { Badge } from '@/components/ui/badge';
import { ResultsView } from '@/components/ResultsView';
import { CompatibilityChecker } from '@/components/CompatibilityChecker';

interface Props {
  params: Promise<{ partNumber: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { partNumber } = await params;
  try {
    const part = await getPartByNumber(partNumber);
    
    if (!part) {
      return {
        title: 'Part Not Found | Parts Expert',
      };
    }

    const title = part.seo_title || `${part.name} (${part.part_number}) | Parts Expert`;
    const description = part.seo_description || `Buy ${part.name} for your vehicle. Get expert diagnostic tips, installation guides, and price comparisons for part number ${part.part_number}.`;

    return {
      title,
      description,
      alternates: {
        canonical: `https://partsexpert.app/p/${part.part_number}`,
      },
      openGraph: {
        title: `${part.name} | Expert Diagnostic & Part Finder`,
        description,
        images: part.image_url ? [part.image_url] : [],
      }
    };
  } catch (error) {
    return {
      title: 'Part Details | Parts Expert',
    };
  }
}

export default async function PartPage({ params }: Props) {
  const { partNumber } = await params;
  
  try {
    const part = await getPartByNumber(partNumber);
    
    if (!part) {
      notFound();
    }

    // JSON-LD structured data for Product
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: part.name,
      image: part.image_url,
      description: part.description || part.seo_description,
      sku: part.part_number,
      mpn: part.part_number,
      brand: {
        '@type': 'Brand',
        name: part.brand || 'Aftermarket',
      },
      offers: {
        '@type': 'AggregateOffer',
        priceCurrency: 'USD',
        lowPrice: part.price ? (part.price * 0.9).toFixed(2) : '0.00',
        highPrice: part.price ? (part.price * 1.1).toFixed(2) : '0.00',
        offerCount: (part as any).prices?.length || 1,
        availability: 'https://schema.org/InStock'
      }
    };

    // JSON-LD for Breadcrumbs
    const breadcrumbLd = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': [
        {
          '@type': 'ListItem',
          'position': 1,
          'name': 'Home',
          'item': 'https://partsexpert.vercel.app'
        },
        {
          '@type': 'ListItem',
          'position': 2,
          'name': part.category || 'Parts',
          'item': `https://partsexpert.vercel.app/parts?category=${encodeURIComponent(part.category || '')}`
        },
        {
          '@type': 'ListItem',
          'position': 3,
          'name': part.name,
          'item': `https://partsexpert.vercel.app/p/${part.part_number}`
        }
      ]
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
        />
        
        <div className="container relative mx-auto flex flex-col items-center justify-start min-h-[calc(100vh-3.5rem)] px-4 py-8 sm:px-6 md:py-16 gap-8 bg-zinc-950">
          <div className="w-full max-w-7xl">
            <div className="mb-12 border-b border-zinc-800 pb-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <Badge variant="outline" className="mb-4 bg-zinc-900/50 text-zinc-400 border-zinc-800 px-3 py-1">
                    {part.category || 'General Component'}
                  </Badge>
                  <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-100 font-sans mb-4">
                    {part.name}
                  </h1>
                  <div className="flex items-center gap-4 text-zinc-400 font-mono text-sm">
                    <span className="bg-zinc-900 border border-zinc-800 px-2 py-1 rounded">PN: {part.part_number}</span>
                    {part.brand && <span className="opacity-60">Brand: {part.brand}</span>}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                   {/* Simplified action buttons */}
                   <button className="bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold px-6 py-3 rounded-xl transition-all">
                      Check Availability
                   </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-4 sticky top-24">
                <CompatibilityChecker />
              </div>
              <div className="lg:col-span-8">
                <ResultsView part={part as any} />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } catch (error) {
    console.error('Error loading part page:', error);
    notFound();
  }
}
