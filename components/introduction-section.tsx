"use client"

import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"

const stats = [
  { label: "总建筑面积", value: "约 4.4 万㎡" },
  { label: "整体出租率", value: "78.72%" },
  { label: "科技类企业占比", value: "68%" },
  { label: "民营企业占比", value: "95%" },
  { label: "小微企业占比", value: "85%" },
  { label: "孵化容量", value: "125 个工位 / 7 间独立室" },
]

const services = [
  { title: "政务服务", detail: "联动市、区数据局、发改经信局等部门，提供政策解读、项目申报、场景对接。" },
  { title: "金融服务", detail: "合作杭州城基投资、方圆金鼎等机构，为企业提供融资对接与资本赋能。" },
  { title: "产业服务", detail: "举办“潮起钱塘沙龙”“浙大银发经济论坛”“AI切磋大会”等品牌活动，搭建产业交流平台。" },
  { title: "社群运营", detail: "打造“创见者说”企业故事计划，构建“招商+品牌+社群”IP共生平台。" },
]

const gallery = [
  { src: "/2-未来数智港介绍配图-1.jpg", alt: "未来数智港外观" },
  { src: "/2-未来数智港介绍配图-2.jpg", alt: "未来数智港大堂" },
  { src: "/2-未来数智港介绍配图-3.jpg", alt: "未来数智港会议空间" },
  { src: "/2-未来数智港介绍配图-4.jpg", alt: "未来数智港" },
  { src: "/2-未来数智港介绍配图-5.jpg", alt: "未来数智港公共区域" },
]

export function IntroductionSection() {
  return (
    <section className="relative overflow-hidden bg-background py-20 md:py-32">
      <div className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-accent/15 blur-3xl md:-left-32" />
      <div className="pointer-events-none absolute -right-16 bottom-10 h-64 w-64 rounded-full bg-primary/10 blur-3xl md:-right-24" />

      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-3 text-sm uppercase tracking-[0.35em] text-muted-foreground">Hangzhou · Future Data Valley</p>
          <h2 className="mb-5 font-mono text-3xl font-bold md:text-5xl text-balance">城投资产·未来数智港</h2>
          <p className="text-lg leading-relaxed text-muted-foreground text-pretty">
            在数字经济的时代浪潮中，一座以“数智产业”为核心的现代化产业园——城投资产·未来数智港，依托杭州东站枢纽的独特优势，加速成长为杭州乃至长三角地区的产业新地标，致力于打造“全国企业来杭第一站”的办公金名片。
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {stats.map((stat) => (
            <Card key={stat.label} className="border border-muted-foreground/10 bg-card shadow-md">
              <div className="flex h-full flex-col gap-1 p-4 text-left">
                <p className="text-[11px] uppercase tracking-wide text-muted-foreground">{stat.label}</p>
                <p className="text-xl font-semibold text-foreground">{stat.value}</p>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {gallery.map((item, index) => (
            <Card
              key={item.src}
              className={`group relative overflow-hidden border border-muted-foreground/10 bg-card shadow-lg ${index === 0 ? "lg:col-span-2" : ""}`}
            >
              <div className="relative h-52 w-full overflow-hidden sm:h-60 lg:h-72">
                <img src={item.src} alt={item.alt} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent" />
              </div>
              <div className="absolute bottom-3 left-3 rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-foreground shadow">
                {item.alt}
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <Card className="border border-muted-foreground/10 bg-card shadow-xl">
            <div className="flex flex-col gap-4 p-8">
              <Badge variant="secondary" className="w-fit px-3 py-1 text-xs uppercase tracking-wide">
                区位优势
              </Badge>
              <h3 className="text-2xl font-semibold text-foreground">从交通枢纽到数智枢纽</h3>
              <p className="leading-relaxed text-muted-foreground text-pretty">
                项目坐落于杭州东站西广场 D 座，总建筑面积约 4.4 万平方米。依托亚洲重要交通枢纽——杭州东站，每日数十万的客流吞吐，园区天然汇聚“人流、物流、信息流、数据流”，实现“出站 5 分钟即可抵达项目”的极致通勤体验，为企业对接全国资源、吸引高端人才提供无可比拟的区位条件。
              </p>
            </div>
          </Card>

          <Card className="border border-muted-foreground/10 bg-card shadow-xl">
            <div className="flex flex-col gap-4 p-8">
              <Badge variant="secondary" className="w-fit px-3 py-1 text-xs uppercase tracking-wide">
                空间布局
              </Badge>
              <h3 className="text-2xl font-semibold text-foreground">一站式全周期产业生态</h3>
              <p className="leading-relaxed text-muted-foreground text-pretty">
                园区构建“展示—办公—孵化—加速”一体化功能闭环，灵活匹配企业从初创到成熟的全阶段需求：
              </p>
              <ul className="grid gap-2 text-foreground">
                <li className="rounded-lg bg-muted/50 px-4 py-3 text-sm leading-relaxed">
                  <span className="font-semibold">1—2 层：</span>数据展示、企业服务、会议洽谈与科技办公，打造“城市级展厅与会客厅”。
                </li>
                <li className="rounded-lg bg-muted/50 px-4 py-3 text-sm leading-relaxed">
                  <span className="font-semibold">3—4 层：</span>众创空间、孵化苗圃、联合办公区（钱唐量子空间），提供 10㎡-8000㎡ 灵活办公，支持自由分割与定制化装修，实现“拎包入住”。
                </li>
                <li className="rounded-lg bg-muted/50 px-4 py-3 text-sm leading-relaxed">
                  园区出租率已达 <span className="font-semibold">78.72%</span>，科技类企业占比 <span className="font-semibold">68%</span>，民营企业占 <span className="font-semibold">95%</span>，小微企业达 <span className="font-semibold">85%</span>，形成“科技主导、民企集聚、小微活跃”的产业生态。
                </li>
              </ul>
            </div>
          </Card>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <Card className="border border-muted-foreground/10 bg-card shadow-xl">
            <div className="flex flex-col gap-4 p-8">
              <Badge variant="secondary" className="w-fit px-3 py-1 text-xs uppercase tracking-wide">
                孵化体系
              </Badge>
              <h3 className="text-2xl font-semibold text-foreground">陪伴企业从 0 到 1</h3>
              <p className="leading-relaxed text-muted-foreground text-pretty">
                园区四层专设科技孵化长廊，提供 125 个孵化工位与 7 间独立孵化室。符合条件的数智科创类企业可享受 3 个月至 3 年的孵化培育，期间进行季度评估与系统辅导；孵化期满后，优秀企业可转为正式办公客户，持续在园区成长，目前已签约孵化企业 6 家，形成创新集聚效应。
              </p>
            </div>
          </Card>

          <Card className="border border-muted-foreground/10 bg-card shadow-xl">
            <div className="flex flex-col gap-4 p-8">
              <Badge variant="secondary" className="w-fit px-3 py-1 text-xs uppercase tracking-wide">
                服务体系
              </Badge>
              <h3 className="text-2xl font-semibold text-foreground">政企金社联动赋能</h3>
              <div className="grid gap-3">
                {services.map((service) => (
                  <div key={service.title} className="rounded-xl border border-muted/40 bg-muted/30 px-4 py-3">
                    <p className="text-sm font-semibold text-foreground">{service.title}</p>
                    <p className="text-sm leading-relaxed text-muted-foreground text-pretty">{service.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
          <Card className="border border-muted-foreground/10 bg-card shadow-xl">
            <div className="flex flex-col gap-4 p-8">
              <Badge variant="secondary" className="w-fit px-3 py-1 text-xs uppercase tracking-wide">
                发展愿景
              </Badge>
              <h3 className="text-2xl font-semibold text-foreground">打造中国数谷·城市运营数据要素产业园</h3>
              <p className="leading-relaxed text-muted-foreground text-pretty">
                在杭州市、上城区两级政府的高度重视与指导下，未来数智港正积极申报建设“中国数谷·城市运营数据要素产业园”。园区将充分发挥城投集团的数据资源优势与东站枢纽的流量优势，推动“客流”变“人流”、“人流”带“钱流”、“钱流”融“数据流”，构建以城市运营数据要素为核心的全产业链生态。
              </p>
            </div>
          </Card>

          <Card className="border border-muted-foreground/10 bg-card shadow-xl">
            <div className="flex flex-col gap-4 p-8">
              <Badge variant="secondary" className="w-fit px-3 py-1 text-xs uppercase tracking-wide">
                结语与联系方式
              </Badge>
              <p className="leading-relaxed text-muted-foreground text-pretty">
                城投资产·未来数智港，不仅是办公空间，更是数智科技的孵化器、产业资源的连接器、城市创新的助推器。园区与数智企业、创新团队、行业伙伴携手同行，共创智能未来，书写杭州数字经济高质量发展的新篇章。
              </p>
              <div className="rounded-xl bg-muted/40 px-4 py-4 text-sm leading-relaxed text-foreground">
                <p className="font-semibold">地址</p>
                <p>杭州市上城区新风路 260 号 杭州东站西广场 D 座</p>
                <p className="mt-3 font-semibold">招商</p>
                <p>章经理 17857403513</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
