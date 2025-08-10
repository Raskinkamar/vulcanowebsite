'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

interface GifItem { src: string; alt?: string }

export default function MobileGifShowcase({ gifs }: { gifs: GifItem[] }) {
  if (!gifs?.length) return null
  return (
    <div className="block sm:hidden relative z-0 py-2">
      <div className="px-4 text-white/70 text-xs mb-1">Galeria</div>
      <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory px-4 [-webkit-overflow-scrolling:touch] scrollbar-hide">
        {gifs.map((gif, i) => (
          <motion.figure
            key={gif.src}
            className="relative flex-shrink-0 w-[78vw] h-40 rounded-2xl overflow-hidden border border-white/10 bg-zinc-950 snap-center"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Image
              src={gif.src}
              alt={gif.alt || 'GIF'}
              fill
              unoptimized
              loading="lazy"
              sizes="80vw"
              style={{ objectFit: 'cover' }}
            />
            <figcaption className="absolute inset-x-0 bottom-0 p-2 text-[11px] text-white/70 bg-gradient-to-t from-black/80 to-transparent">
              {gif.alt || 'GIF'}
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </div>
  )
}


