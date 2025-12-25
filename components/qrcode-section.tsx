"use client"

import { Card } from "@/components/ui/card"

const qrCodes = [
  {
    title: "小红书",
    description: "搜索与关注园区故事",
    src: "/小红书二维码.png",
  },
  {
    title: "微信",
    description: "扫码联系园区顾问",
    src: "/公众号二维码.png",
  },
  {
    title: "抖音",
    description: "视频看园区动态",
    src: "/抖音二维码.png",
  },
]

export function QRCodeSection() {
  return (
    <section className="bg-background py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 font-mono text-3xl font-bold md:text-5xl text-balance">联系方式</h2>
          <div className="mx-auto mb-6 h-1 w-20 bg-accent" />
          <p className="text-lg text-muted-foreground">扫描二维码，了解更多信息</p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
          {qrCodes.map((qr) => (
            <Card key={qr.title} className="p-8 text-center shadow-lg">
              <div className="mb-6 flex justify-center">
                <div className="h-48 w-48 overflow-hidden rounded-xl bg-muted">
                  <img
                    src={qr.src}
                    alt={qr.title}
                    className="h-full w-full object-contain"
                  />
                </div>
              </div>
              <h3 className="mb-2 text-xl font-bold">{qr.title}</h3>
              <p className="text-sm text-muted-foreground">{qr.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
