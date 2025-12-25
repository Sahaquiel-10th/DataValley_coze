"use client"

import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"

const images = [
  { src: "/4-杭州城投资产集团介绍配图-1.png", alt: "城投资产集团 办公楼" },
  { src: "/4-杭州城投资产集团介绍配图-2.png", alt: "城投资产集团 会议空间" },
  { src: "/4-杭州城投资产集团介绍配图-3.png", alt: "城投资产集团 园区环境" },
  { src: "/4-杭州城投资产集团介绍配图-4.png", alt: "城投资产集团 街区商业" },
  { src: "/4-杭州城投资产集团介绍配图-5.png", alt: "城投资产集团 活动场景" },
]

export function AssetGroupSection() {
  return (
    <section className="bg-secondary py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-mono text-3xl font-bold md:text-5xl text-balance">杭州城投资产集团</h2>
          <div className="mx-auto mb-8 h-1 w-20 bg-accent" />
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.05fr,0.95fr]">
          <Card className="h-full border border-muted-foreground/10 bg-card p-8 shadow-xl">
            <div className="flex flex-col gap-4">
              <Badge variant="secondary" className="w-fit px-3 py-1 text-xs uppercase tracking-wide">
                杭州城投资产集团介绍
              </Badge>
              <p className="leading-relaxed text-foreground text-pretty">
                杭州城投资产集团有限公司成立于 2012 年 7 月，注册资本 10 亿元，隶属于杭州市城市建设投资集团有限公司，定位“杭州城投资产经营主平台”，主要负责城市物业资产的经营与管理，履行投资、融资职责，助力国有资产保值增值。
              </p>
              <p className="leading-relaxed text-foreground text-pretty">
                当前累计经营面积约 82 万平米（2025H1），包括写字楼、园区、核心街区商铺、邻居中心、体育公园等多种物业类型，采用“租赁、自营、联营”等多种模式经营，聚焦“资产经营”十余载，深耕“价值培育”。
              </p>
              <p className="leading-relaxed text-foreground text-pretty">
                以“东韵”市场品牌主导，深耕办公、产业园、商业三大核心业务，在数智产业、康养产业、新零售产业等新兴赛道布局，依托“市场化、资本化、数字化”思维，做大做强城投资产体量规模，逐步实现“资产经营”高质量转型发展。
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                <Card className="border border-muted-foreground/20 bg-muted/50 p-4 shadow-sm">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">企业使命</p>
                  <p className="mt-1 text-lg font-semibold text-foreground">焕新资产，美好城市</p>
                </Card>
                <Card className="border border-muted-foreground/20 bg-muted/50 p-4 shadow-sm">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">企业愿景</p>
                  <p className="mt-1 text-lg font-semibold text-foreground">成为国内一流的国有资产运营服务商</p>
                </Card>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-2 gap-4">
            {images.map((image, index) => (
              <Card
                key={image.src}
                className={`group relative overflow-hidden border-0 shadow-lg transition-transform hover:scale-[1.02] ${
                  index === 0 ? "col-span-2" : ""
                }`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="absolute bottom-3 left-3 rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-foreground shadow">
                  {image.alt}
                </span>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
