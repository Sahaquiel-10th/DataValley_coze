"use client"

export function HeroSection() {
  const videoSrc = process.env.NEXT_PUBLIC_VIDEO1_URL || "/1-星聚荟视频.mp4"

  return (
    <section className="relative w-full bg-black">
      <div className="border-b border-white/10 px-6 py-8 text-center md:py-12">
        <h1 className="mb-3 font-mono text-4xl font-bold text-white md:text-5xl text-balance">城投资产·未来数智港</h1>
        <p className="text-base text-white/70 md:text-lg text-balance">杭州东站旁的数智产业新地标</p>
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-8 md:py-12">
        <div className="aspect-video overflow-hidden rounded-xl border border-white/10 shadow-2xl">
          <video className="h-full w-full object-cover" autoPlay muted loop playsInline controls>
            <source src={videoSrc} type="video/mp4" />
            您的浏览器不支持视频播放
          </video>
        </div>
      </div>
    </section>
  )
}
