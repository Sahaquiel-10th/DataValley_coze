"use client"

export function AssetVideoSection() {
  const videoSrc = process.env.NEXT_PUBLIC_VIDEO2_URL || "/3-资产视频.mp4"

  return (
    <section className="bg-black py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-mono text-3xl font-bold text-white md:text-5xl text-balance">实力背景</h2>
          <div className="mx-auto h-1 w-20 bg-accent" />
        </div>

        <div className="mx-auto max-w-5xl">
          <div className="aspect-video overflow-hidden rounded-lg shadow-2xl">
            <video className="h-full w-full object-cover" controls playsInline>
              <source src={videoSrc} type="video/mp4" />
              您的浏览器不支持视频播放
            </video>
          </div>
        </div>
      </div>
    </section>
  )
}
