"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ShoppingCart, Star, ArrowLeft, Skull, Check, X, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import Link from "next/link"

const whatsappNumber = "+254746627718"

interface LowerFaceMask {
  id: string
  name: string
  code: string
  price: number
  image: string
  description: string
}

const lowerFaceMasks: LowerFaceMask[] = [
  {
    id: "lf-01",
    name: "Black Fang Mask",
    code: "LF-01",
    price: 500,
    image: "/images/lower-face/black-fang-mask.jpg",
    description: "Black lower face mask with sharp fangs and spikes",
  },
  {
    id: "lf-02",
    name: "Golden Skull Jaw",
    code: "LF-02",
    price: 500,
    image: "/images/lower-face/golden-skull-jaw.jpg",
    description: "Golden skull jaw mask with detailed teeth design",
  },
  {
    id: "lf-03",
    name: "White Fang Mask",
    code: "LF-03",
    price: 500,
    image: "/images/lower-face/white-fang-mask.jpg",
    description: "White lower face mask with prominent fangs",
  },
  {
    id: "lf-04",
    name: "Bronze Skull Jaw",
    code: "LF-04",
    price: 500,
    image: "/images/lower-face/bronze-skull-jaw.jpg",
    description: "Bronze skull jaw mask with weathered finish",
  },
]

export default function LowerFacePage() {
  const [selectedMasks, setSelectedMasks] = useState<Set<string>>(new Set())

  const toggleMaskSelection = (maskId: string) => {
    setSelectedMasks((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(maskId)) {
        newSet.delete(maskId)
      } else {
        newSet.add(maskId)
      }
      return newSet
    })
  }

  const orderViaWhatsApp = (mask: LowerFaceMask) => {
    const message = `Hi! I'd like to order ${mask.name} (${mask.code}) for KSH ${mask.price}. Please confirm availability and delivery details.`
    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, "_blank")
  }

  const orderSelectedMasks = () => {
    if (selectedMasks.size === 0) return

    const selectedMasksList = lowerFaceMasks.filter((mask) => selectedMasks.has(mask.id))
    const totalPrice = selectedMasksList.reduce((sum, mask) => sum + mask.price, 0)
    const itemsList = selectedMasksList.map((mask) => `${mask.name} (${mask.code}) - KSH ${mask.price}`).join("\n")

    const message = `Hi! I'd like to order the following Lower Face masks:\n\n${itemsList}\n\nTotal: KSH ${totalPrice}\n\nPlease confirm availability and delivery details.`
    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, "_blank")
  }

  const clearSelection = () => {
    setSelectedMasks(new Set())
  }

  const selectedCount = selectedMasks.size
  const totalPrice = lowerFaceMasks
    .filter((mask) => selectedMasks.has(mask.id))
    .reduce((sum, mask) => sum + mask.price, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-900 via-red-900 to-yellow-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-72 h-72 bg-orange-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-red-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-40 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 p-4 md:p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" className="text-white hover:bg-white/10 border-0 bg-transparent">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Collection
            </Button>
          </Link>
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white bg-gradient-to-r from-orange-400 via-red-500 to-yellow-600 bg-clip-text text-transparent">
              LOWER FACE MASKS
            </h1>
            <p className="text-white/80 text-sm md:text-lg">Jaw & Fang Collection</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" className="text-white hover:bg-white/10">
                <HelpCircle className="w-4 h-4 mr-2" />
                <span className="hidden md:inline">Help</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gradient-to-br from-orange-900/95 to-red-900/95 border-orange-500/20 text-white max-w-md">
              <DialogHeader>
                <DialogTitle className="text-orange-400 text-xl">How to Order Lower Face Masks</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 text-sm">
                <div className="bg-orange-500/20 p-3 rounded-lg">
                  <h4 className="font-semibold text-orange-300 mb-2">Step 1: Select Masks</h4>
                  <p className="text-white/80">Click the ✓ icon to select masks. Click ✗ to deselect.</p>
                </div>
                <div className="bg-red-500/20 p-3 rounded-lg">
                  <h4 className="font-semibold text-red-300 mb-2">Step 2: Review Selection</h4>
                  <p className="text-white/80">Your selected masks and total price will appear at the top.</p>
                </div>
                <div className="bg-yellow-500/20 p-3 rounded-lg">
                  <h4 className="font-semibold text-yellow-300 mb-2">Step 3: Place Order</h4>
                  <p className="text-white/80">
                    Click "Order Now" on individual masks or "Order Selected" for multiple masks.
                  </p>
                </div>
                <div className="bg-green-500/20 p-3 rounded-lg">
                  <h4 className="font-semibold text-green-300 mb-2">Step 4: WhatsApp</h4>
                  <p className="text-white/80">You'll be redirected to WhatsApp with your order details pre-filled.</p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      {/* Floating Selection Summary */}
      {selectedCount > 0 && (
        <div className="fixed top-20 left-0 right-0 z-40 px-4">
          <motion.div className="max-w-7xl mx-auto" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="backdrop-blur-md bg-white/10 rounded-2xl p-3 md:p-4 border border-white/20 shadow-xl">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-4">
                  <span className="text-white font-semibold text-sm md:text-base">
                    {selectedCount} mask{selectedCount !== 1 ? "s" : ""} selected
                  </span>
                  <span className="text-yellow-400 font-bold text-sm md:text-base">Total: KSH {totalPrice}</span>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-white/30 text-white hover:bg-white/10 text-xs md:text-sm"
                    onClick={clearSelection}
                  >
                    Clear Selection
                  </Button>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white text-xs md:text-sm"
                    onClick={orderSelectedMasks}
                  >
                    <ShoppingCart className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                    Order Selected
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Collection Header */}
      <section className="relative z-10 py-6 md:py-8 px-4" style={{ marginTop: selectedCount > 0 ? "80px" : "0" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <div className="backdrop-blur-md bg-white/10 rounded-2xl p-4 md:p-6 border border-white/20 inline-block">
              <div className="grid grid-cols-3 gap-4 md:gap-8 text-center">
                <div>
                  <div className="text-2xl md:text-3xl font-bold text-orange-400">{lowerFaceMasks.length}</div>
                  <div className="text-white/70 text-xs md:text-sm">Lower Face Designs</div>
                </div>
                <div>
                  <div className="text-2xl md:text-3xl font-bold text-red-400">KSH 500</div>
                  <div className="text-white/70 text-xs md:text-sm">Each Mask</div>
                </div>
                <div>
                  <div className="text-2xl md:text-3xl font-bold text-yellow-400">Jaw & Fang</div>
                  <div className="text-white/70 text-xs md:text-sm">Style</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Masks Grid */}
      <section className="relative z-10 py-6 md:py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
            {lowerFaceMasks.map((mask, index) => {
              const isSelected = selectedMasks.has(mask.id)
              return (
                <motion.div
                  key={mask.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -10 }}
                >
                  <Card className="backdrop-blur-md bg-white/10 border-white/20 hover:bg-white/20 transition-all duration-300 overflow-hidden group h-full">
                    <div className="relative">
                      <div className="aspect-square bg-gradient-to-br from-orange-500/20 to-red-500/20 flex items-center justify-center relative overflow-hidden">
                        <img
                          src={mask.image || "/placeholder.svg"}
                          alt={mask.name}
                          className="w-full h-full object-contain p-2 md:p-4 group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <Badge className="absolute top-2 md:top-4 right-2 md:right-4 bg-orange-500 text-white text-xs">
                          <Skull className="w-2 h-2 md:w-3 md:h-3 mr-1" />
                          Lower Face
                        </Badge>

                        {/* Selection Button with Tick/X Icons */}
                        <Button
                          size="sm"
                          className={`absolute top-2 md:top-4 left-2 md:left-4 rounded-full p-1 md:p-2 ${
                            isSelected
                              ? "bg-green-500 hover:bg-green-600 text-white"
                              : "bg-red-500 hover:bg-red-600 text-white"
                          }`}
                          onClick={() => toggleMaskSelection(mask.id)}
                        >
                          {isSelected ? (
                            <Check className="w-3 h-3 md:w-4 md:h-4" />
                          ) : (
                            <X className="w-3 h-3 md:w-4 md:h-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                    <CardContent className="p-3 md:p-6 flex flex-col h-full">
                      <div className="flex-1">
                        <h3 className="text-sm md:text-lg font-bold text-white mb-1 md:mb-2">{mask.name}</h3>
                        <p className="text-white/70 text-xs md:text-sm mb-1 md:mb-2">{mask.code}</p>
                        <p className="text-white/60 text-xs mb-2 md:mb-4 line-clamp-2">{mask.description}</p>
                      </div>
                      <div className="space-y-2 md:space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-lg md:text-2xl font-bold text-yellow-400">KSH {mask.price}</span>
                          <div className="flex items-center text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-2 h-2 md:w-3 md:h-3 fill-current" />
                            ))}
                          </div>
                        </div>
                        <Button
                          size="sm"
                          className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-full text-xs"
                          onClick={() => orderViaWhatsApp(mask)}
                        >
                          <ShoppingCart className="w-2 h-2 md:w-3 md:h-3 mr-1" />
                          Order Now
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 md:py-12 px-4 border-t border-white/20 mt-12 md:mt-20">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">LOWER FACE MASK COLLECTION</h3>
          <p className="text-white/70 mb-4 md:mb-6 text-sm md:text-base">
            Jaw and fang masks for dramatic lower face coverage
          </p>
          <div className="backdrop-blur-md bg-white/10 rounded-2xl p-4 md:p-6 border border-white/20 inline-block">
            <p className="text-white/90 font-medium text-sm md:text-base">
              Designed and Developed by{" "}
              <a
                href="https://eltek.netlify.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-400 hover:text-yellow-300 transition-colors font-bold"
              >
                ELTEK
              </a>
            </p>
            <p className="text-white/60 text-xs md:text-sm mt-2">
              <a
                href="https://eltek.netlify.app"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white/80 transition-colors"
              >
                eltek.netlify.app
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
