'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[95vh] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-surface-container-low">
          <Image
            alt="Hero Editorial Image"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9gw3yqVdb4XXoQGaLq1rh20UFBYkbFTqI67OrKmu1WE9FM2dsBbsM1s1Et0Y3VrlLbwG6q-8gGnxBdg7AItcWoL9fMEgN8fSEFxVdhR0g4NMRU3ZhQMX9yLD8kx1pCniAbaSth8O7SQLbPlWF27lLp4hJiYSzEpao4A_2tQufP4c7UdMYTvnNDI5WVu19l1p6EEoREmRGfPkGA8b30ECaU-D0csfgqDE4Fc_1zzn44w9tabX6Ci3vMllvoOTkwQprXSpBH-Pvv_w"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-noir/20 mix-blend-multiply"></div>
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl animate-fade-in">
          <span className="font-label-caps text-ivory/80 mb-4 block tracking-[0.4em]">AUTUMN WINTER 2024</span>
          <h2 className="font-display-md md:font-display-lg text-ivory mb-8 tracking-tight italic drop-shadow-lg">The Heritage Archive</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/shop" className="min-w-[200px] border border-ivory text-ivory font-button px-8 py-4 hover:bg-ivory hover:text-noir transition-all duration-500 uppercase tracking-widest bg-noir/10 backdrop-blur-sm hover:backdrop-blur-none">
              Explore Collection
            </Link>
            <Link href="/shop/sarees" className="min-w-[200px] bg-gold text-noir font-button px-8 py-4 hover:bg-ivory transition-all duration-500 uppercase tracking-widest border border-gold hover:border-ivory">
              Shop the Drape
            </Link>
          </div>
        </div>
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <span className="material-symbols-outlined text-ivory font-thin">keyboard_arrow_down</span>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
          <Link href="/shop/bridal" className="group relative img-zoom-hover aspect-[4/5] bg-surface-container block overflow-hidden">
            <Image
              alt="Bridal Collection"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBj1s8-mjtmKYKEqs5wbf5uUknA-rt_t9wZdHq2mj3KDo5lXqIPNKnpg3NlYgrea0b4c9pMT4uqWm7uotW3XnE6Chcaay0hNE21VoZPFxAo4YYKy-uQgwBmRvjFWsSVYAKGLPAAg-ZKrmT8Tc5pt7CrbbQiLPnnnRAU57U6WVBOTIGwSRvNkqzhiVE8yt2CM8-a2bM1M0Esu1r8HkhTDiUfYzyq1S0jjiTN-ZeNy8wJG14rOZd8hOkQYVlPDuAadCxfGDBzlgZTgJM"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-noir/10 group-hover:bg-noir/30 transition-colors duration-700"></div>
            <div className="absolute inset-0 flex flex-col justify-end p-12 text-ivory z-10">
              <h3 className="font-headline-lg mb-4 italic">The Bridal Edit</h3>
              <p className="font-body-md text-ivory/80 mb-8 max-w-sm">Timeless silhouettes for the contemporary bride.</p>
              <span className="font-label-caps border-b border-ivory w-fit pb-1 group-hover:text-gold group-hover:border-gold transition-colors">VIEW COLLECTION</span>
            </div>
          </Link>
          <Link href="/shop/sarees" className="group relative img-zoom-hover aspect-[4/5] bg-surface-container block overflow-hidden">
            <Image
              alt="Heritage Collection"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBICnHKYXKLwWleb_RwDdqJ09EHOGxtgKL6-EcAkGiIyZ22nwwiN5CJopi1zBeGQeJQEoRth-xNIUoNpT6ovfhoGVGSyZ36PjKZ-Sd7ALG1PCEogsIr_onuMA0j7fFkT_psuBxFZPWgQiYqeLSbjJ28gDmfWsuj8xiWVDiMTcPAXWXELW_WNUdD3ZAA-GvIYH1W-7crTZY4yWyeF29qi_u8zTbVoZZjzKirY4UZOuTpkvDiwRHvoIw2Roj6RT7E1eFNXs90SfIJy3M"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-noir/10 group-hover:bg-noir/30 transition-colors duration-700"></div>
            <div className="absolute inset-0 flex flex-col justify-end p-12 text-ivory z-10">
              <h3 className="font-headline-lg mb-4 italic">Heritage Silk</h3>
              <p className="font-body-md text-ivory/80 mb-8 max-w-sm">Preserving centuries-old weaving techniques.</p>
              <span className="font-label-caps border-b border-ivory w-fit pb-1 group-hover:text-gold group-hover:border-gold transition-colors">VIEW COLLECTION</span>
            </div>
          </Link>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="bg-surface-container-low py-section-gap">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="flex justify-between items-end mb-16 border-b border-mink/20 pb-6">
            <div>
              <span className="font-label-caps text-mink tracking-widest block mb-2">JUST RELEASED</span>
              <h2 className="font-headline-lg italic">New Arrivals</h2>
            </div>
            <Link href="/shop?newArrival=true" className="font-label-caps text-noir hover:text-gold transition-colors border-b border-noir pb-1">
              SHOP ALL NEW
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {/* Products mocked for layout */}
            {[
              { id: '1', name: 'Aurelia Pendant', price: '$1,850.00', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBj1s8-mjtmKYKEqs5wbf5uUknA-rt_t9wZdHq2mj3KDo5lXqIPNKnpg3NlYgrea0b4c9pMT4uqWm7uotW3XnE6Chcaay0hNE21VoZPFxAo4YYKy-uQgwBmRvjFWsSVYAKGLPAAg-ZKrmT8Tc5pt7CrbbQiLPnnnRAU57U6WVBOTIGwSRvNkqzhiVE8yt2CM8-a2bM1M0Esu1r8HkhTDiUfYzyq1S0jjiTN-ZeNy8wJG14rOZd8hOkQYVlPDuAadCxfGDBzlgZTgJM' },
              { id: '2', name: 'Empress Gold Bangle', price: '$2,400.00', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDvkaERf0194WF6KCkubgUqkfyVnR3F7TCf6NxGiyYvRcIADZDEzW41KlBp-dRviQyzCm0PdzAkf_Qb5oxUxY3QCAaUViGxexFcD2frLFb7_q5ohnZ0t6i7QbCAVW6bkX8pkGONVNE6JgfTAVldTBpQArbIeC12mp3g2Q7MMydatERejOfsDdGgj3E5-by1rKq1_19rq36ocyK34dypyolGgj7ZkKPOznrKwC9eGISBgPnNT1sypWOo5GzE5OFTQW9qkXRVOk2EFfI' },
              { id: '3', name: 'Elysian Diamond Choker', price: '$4,200.00', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBj1s8-mjtmKYKEqs5wbf5uUknA-rt_t9wZdHq2mj3KDo5lXqIPNKnpg3NlYgrea0b4c9pMT4uqWm7uotW3XnE6Chcaay0hNE21VoZPFxAo4YYKy-uQgwBmRvjFWsSVYAKGLPAAg-ZKrmT8Tc5pt7CrbbQiLPnnnRAU57U6WVBOTIGwSRvNkqzhiVE8yt2CM8-a2bM1M0Esu1r8HkhTDiUfYzyq1S0jjiTN-ZeNy8wJG14rOZd8hOkQYVlPDuAadCxfGDBzlgZTgJM' },
              { id: '4', name: 'Imperial Gold Studs', price: '$1,150.00', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDvkaERf0194WF6KCkubgUqkfyVnR3F7TCf6NxGiyYvRcIADZDEzW41KlBp-dRviQyzCm0PdzAkf_Qb5oxUxY3QCAaUViGxexFcD2frLFb7_q5ohnZ0t6i7QbCAVW6bkX8pkGONVNE6JgfTAVldTBpQArbIeC12mp3g2Q7MMydatERejOfsDdGgj3E5-by1rKq1_19rq36ocyK34dypyolGgj7ZkKPOznrKwC9eGISBgPnNT1sypWOo5GzE5OFTQW9qkXRVOk2EFfI' },
            ].map((p) => (
              <Link href={`/product/${p.id}`} key={p.id} className="group cursor-pointer block">
                <div className="aspect-[3/4] bg-white mb-6 relative overflow-hidden">
                  <Image alt={p.name} src={p.img} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  <button className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-noir text-ivory font-button text-[10px] px-4 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 tracking-widest z-10" onClick={(e) => e.preventDefault()}>
                    ADD TO BAG
                  </button>
                </div>
                <h3 className="font-body-lg text-noir mb-1 group-hover:text-gold transition-colors">{p.name}</h3>
                <p className="font-label-caps text-mink">{p.price}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-section-gap max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <Link href="/shop/sarees" className="text-center group cursor-pointer block">
            <div className="aspect-square bg-surface-container-low mb-8 relative overflow-hidden">
              <Image alt="Sarees Category" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9gw3yqVdb4XXoQGaLq1rh20UFBYkbFTqI67OrKmu1WE9FM2dsBbsM1s1Et0Y3VrlLbwG6q-8gGnxBdg7AItcWoL9fMEgN8fSEFxVdhR0g4NMRU3ZhQMX9yLD8kx1pCniAbaSth8O7SQLbPlWF27lLp4hJiYSzEpao4A_2tQufP4c7UdMYTvnNDI5WVu19l1p6EEoREmRGfPkGA8b30ECaU-D0csfgqDE4Fc_1zzn44w9tabX6Ci3vMllvoOTkwQprXSpBH-Pvv_w" fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
            </div>
            <h3 className="font-headline-md italic mb-4">Sarees</h3>
            <span className="font-label-caps text-[10px] tracking-[0.2em] border-b border-noir pb-1 group-hover:text-gold group-hover:border-gold transition-colors">SHOP SAREES</span>
          </Link>
          <Link href="/shop/ornaments" className="text-center group cursor-pointer block">
            <div className="aspect-square bg-surface-container-low mb-8 relative overflow-hidden">
              <Image alt="Ornaments Category" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBj1s8-mjtmKYKEqs5wbf5uUknA-rt_t9wZdHq2mj3KDo5lXqIPNKnpg3NlYgrea0b4c9pMT4uqWm7uotW3XnE6Chcaay0hNE21VoZPFxAo4YYKy-uQgwBmRvjFWsSVYAKGLPAAg-ZKrmT8Tc5pt7CrbbQiLPnnnRAU57U6WVBOTIGwSRvNkqzhiVE8yt2CM8-a2bM1M0Esu1r8HkhTDiUfYzyq1S0jjiTN-ZeNy8wJG14rOZd8hOkQYVlPDuAadCxfGDBzlgZTgJM" fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
            </div>
            <h3 className="font-headline-md italic mb-4">Ornaments</h3>
            <span className="font-label-caps text-[10px] tracking-[0.2em] border-b border-noir pb-1 group-hover:text-gold group-hover:border-gold transition-colors">SHOP ORNAMENTS</span>
          </Link>
          <Link href="/shop/bangles" className="text-center group cursor-pointer block">
            <div className="aspect-square bg-surface-container-low mb-8 relative overflow-hidden">
              <Image alt="Bangles Category" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDvkaERf0194WF6KCkubgUqkfyVnR3F7TCf6NxGiyYvRcIADZDEzW41KlBp-dRviQyzCm0PdzAkf_Qb5oxUxY3QCAaUViGxexFcD2frLFb7_q5ohnZ0t6i7QbCAVW6bkX8pkGONVNE6JgfTAVldTBpQArbIeC12mp3g2Q7MMydatERejOfsDdGgj3E5-by1rKq1_19rq36ocyK34dypyolGgj7ZkKPOznrKwC9eGISBgPnNT1sypWOo5GzE5OFTQW9qkXRVOk2EFfI" fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
            </div>
            <h3 className="font-headline-md italic mb-4">Bangles</h3>
            <span className="font-label-caps text-[10px] tracking-[0.2em] border-b border-noir pb-1 group-hover:text-gold group-hover:border-gold transition-colors">SHOP BANGLES</span>
          </Link>
        </div>
      </section>

      {/* Limited Edition Vault */}
      <section className="bg-noir py-section-gap">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="w-full lg:w-1/2">
              <div className="relative group block">
                <div className="overflow-hidden bg-noir relative aspect-square">
                  <Image alt="Limited Edition Vault" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBICnHKYXKLwWleb_RwDdqJ09EHOGxtgKL6-EcAkGiIyZ22nwwiN5CJopi1zBeGQeJQEoRth-xNIUoNpT6ovfhoGVGSyZ36PjKZ-Sd7ALG1PCEogsIr_onuMA0j7fFkT_psuBxFZPWgQiYqeLSbjJ28gDmfWsuj8xiWVDiMTcPAXWXELW_WNUdD3ZAA-GvIYH1W-7crTZY4yWyeF29qi_u8zTbVoZZjzKirY4UZOuTpkvDiwRHvoIw2Roj6RT7E1eFNXs90SfIJy3M" fill className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700" />
                </div>
                <div className="absolute -bottom-8 -right-8 bg-gold p-12 hidden lg:block shadow-2xl">
                  <span className="font-label-caps text-[10px] tracking-[0.3em] block mb-2 text-noir">SERIALIZED PIECES</span>
                  <span className="font-headline-md italic text-noir">01/100</span>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 text-ivory">
              <span className="font-label-caps text-gold tracking-[0.4em] block mb-6">THE PRIVATE ARCHIVE</span>
              <h2 className="font-display-md italic mb-8 leading-tight">Limited Edition: The Noir Silk series</h2>
              <p className="font-body-lg text-mink mb-12 max-w-md">Only 100 pieces are hand-loomed for this collection annually. Each saree carries a unique hand-stitched serial number and a certificate of heritage authenticity.</p>
              <Link href="/shop?limited=true" className="inline-block bg-ivory text-noir font-button px-10 py-5 hover:bg-gold transition-colors duration-500 tracking-widest uppercase">
                REQUEST EARLY ACCESS
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-section-gap bg-ivory">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="font-label-caps text-mink tracking-widest block mb-8">OUR PHILOSOPHY</span>
          <h2 className="font-cormorant text-5xl md:text-6xl text-noir italic mb-10 leading-relaxed">
            "True luxury isn't about being noticed, but about being remembered through the quiet weight of gold and the whisper of silk."
          </h2>
          <div className="w-24 h-px bg-mink mx-auto mb-10"></div>
          <p className="font-body-lg text-mink max-w-2xl mx-auto leading-loose italic">
            Elyrène was founded on a singular vision: to elevate the master-craftsmanship of the Indian subcontinent to the global stage of haute couture. We don't follow trends; we preserve legacies.
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-section-gap bg-surface-container-low border-y border-mink/10">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="text-center">
              <span className="material-symbols-outlined text-gold text-4xl mb-6">format_quote</span>
              <p className="font-body-lg text-noir italic mb-8">"The Imperial Bangles have a weight and a finish that I haven't seen since my grandmother's heirloom collection. Absolutely stunning."</p>
              <p className="font-label-caps text-[10px] tracking-widest text-mink">— ELEANOR R., LONDON</p>
            </div>
            <div className="text-center md:border-x md:border-mink/20 md:px-8 border-y border-mink/20 py-12 md:py-0 md:border-y-0">
              <span className="material-symbols-outlined text-gold text-4xl mb-6">format_quote</span>
              <p className="font-body-lg text-noir italic mb-8">"Wearing an Elyrène saree is like draping oneself in poetry. The fluid silk moves with an elegance that is truly unparalleled in modern fashion."</p>
              <p className="font-label-caps text-[10px] tracking-widest text-mink">— PRIYA K., NEW YORK</p>
            </div>
            <div className="text-center">
              <span className="material-symbols-outlined text-gold text-4xl mb-6">format_quote</span>
              <p className="font-body-lg text-noir italic mb-8">"Minimalist yet incredibly opulent. This is exactly what quiet luxury should feel like. The service was as impeccable as the jewelry."</p>
              <p className="font-label-caps text-[10px] tracking-widest text-mink">— SOFIA V., MILAN</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
