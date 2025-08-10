'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

interface GifItem { src: string; alt?: string }

export default function MobileGifShowcase({ gifs }: { gifs: GifItem[] }) {
  if (!gifs?.length) return null
  return (
    <div className="block sm:hidden relative z-10 py-4">
      <div className="px-3 text-white/80 text-sm mb-2">Em destaque</div>
      <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory px-3 [-webkit-overflow-scrolling:touch] scrollbar-hide">
        {gifs.map((gif, i) => (
          <motion.div
            key={gif.src}
            className="relative flex-shrink-0 w-[78vw] h-44 rounded-xl overflow-hidden border border-white/10 bg-zinc-900 snap-center"
            initial={{ opacity: 0, y: 10 }}
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
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent" />
          </motion.div>
        ))}
      </div>
    </div>
  )
}


