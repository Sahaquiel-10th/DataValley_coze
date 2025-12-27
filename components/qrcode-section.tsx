"use client"

import { Card } from "@/components/ui/card"

const qrCodes = [
  {
    title: "小红书",
    description: "搜索与关注园区故事",
    src: "/小红书.png",
  },
  {
    title: "微信",
    description: "扫码联系园区顾问",
    src: "/公众号.png",
  },
  {
    title: "抖音",
    description: "视频看园区动态",
    src: "/抖音.png",
  },
]

export function QRCodeSection() {
  return (
    <section className="bg-background py-12 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-3 font-mono text-3xl font-bold md:text-5xl text-balance">联系方式</h2>
          <div className="mx-auto mb-5 h-1 w-20 bg-accent" />
          <p className="text-base text-muted-foreground md:text-lg">扫描二维码，了解更多信息</p>
        </div>

        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-3 gap-4">
            {qrCodes.map((qr) => (
              <div key={qr.title} className="flex flex-col items-center gap-2">
                <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-xl bg-white sm:h-28 sm:w-28 md:h-32 md:w-32">
                  <img src={qr.src} alt={qr.title} className="h-full w-full object-contain" />
                </div>
                <div className="text-center">
                  <h3 className="mb-1 text-sm font-bold sm:text-base md:mb-1.5">{qr.title}</h3>
                  <p className="text-xs text-muted-foreground sm:text-sm">{qr.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
