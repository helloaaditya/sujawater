import Image from 'next/image';
import Breadcrumb from '@/components/Breadcrumb';
import AnimatedSection, { AnimatedStagger, AnimatedItem } from '@/components/AnimatedSection';
import { getGallery, getSiteConfig } from '@/lib/data-source';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  const siteConfig = await getSiteConfig();
  return {
    title: 'Gallery',
    description: `Before & after waterproofing project gallery. Terrace, bathroom, basement, epoxy grouting and roof waterproofing projects in Bangalore by ${siteConfig.fullName || siteConfig.name}.`,
    keywords: 'waterproofing gallery Bangalore, terrace waterproofing projects, basement waterproofing before after, epoxy grouting Bangalore',
  };
}

export default async function GalleryPage() {
  const [galleryItems, siteConfig] = await Promise.all([getGallery(), getSiteConfig()]);
  return (
    <>
      <Breadcrumb items={[{ label: 'Gallery', href: '/gallery' }]} />
      <section className="section-padding bg-white" aria-labelledby="gallery-heading">
        <div className="container-wide px-4 sm:px-6">
          <AnimatedSection className="mb-10 sm:mb-14">
            <h1 id="gallery-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Project Gallery
            </h1>
            <p className="text-gray-600 text-base sm:text-lg max-w-2xl">
              Before & after and project highlights from our waterproofing work in Bangalore—terrace waterproofing, bathroom waterproofing, basement waterproofing, epoxy grouting, swimming pool waterproofing, and more. {(siteConfig.fullName || siteConfig.name) + ' serves residential, commercial, and industrial clients'} across Bengaluru and nearby areas.
            </p>
          </AnimatedSection>
          <AnimatedStagger className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4" stagger={0.08}>
            {galleryItems.map((cat, i) => (
              <AnimatedItem key={cat.id || i}>
                <article className="group rounded-2xl border border-gray-100 overflow-hidden shadow-soft hover:shadow-soft-lg transition-all duration-300">
                  <div className="aspect-video relative overflow-hidden bg-gray-100">
                    <Image
                      src={cat.image_url}
                      alt={cat.alt || cat.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      unoptimized
                    />
                  </div>
                  <div className="p-4 sm:p-5">
                    <h2 className="text-base sm:text-lg font-semibold text-gray-900">{cat.title}</h2>
                    <p className="text-sm text-gray-500 mt-1">Project gallery</p>
                  </div>
                </article>
              </AnimatedItem>
            ))}
          </AnimatedStagger>
        </div>
      </section>
    </>
  );
}
