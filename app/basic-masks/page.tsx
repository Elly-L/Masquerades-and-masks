"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ShoppingCart, Star, ArrowLeft, Palette, Check, Info, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const whatsappNumber = "+254719338534"

interface BasicMask {
  id: string
  name: string
  code: string
  price: number
  image: string
  description: string
  color: string
}

const basicMasks: BasicMask[] = [
  {
    id: "bm-01",
    name: "Red Party Mask",
    code: "BM-01",
    price: 500,
    image: "/images/basic-masks/red-mask.jpg",
    description: "Simple red party mask for casual events",
    color: "Red",
  },
  {
    id: "bm-02",
    name: "Black Party Mask",
    code: "BM-02",
    price: 500,
    image: "/images/basic-masks/black-mask.jpg",
    description: "Classic black party mask for any occasion",
    color: "Black",
  },
  {
    id: "bm-03",
    name: "White Party Mask",
    code: "BM-03",
    price: 500,
    image: "/images/basic-masks/white-mask.jpg",
    description: "Clean white party mask for elegant events",
    color: "White",
  },
  {
    id: "bm-04",
    name: "Green Party Mask",
    code: "BM-04",
    price: 500,
    image: "/images/basic-masks/green-mask.jpg",
    description: "Vibrant green party mask for fun occasions",
    color: "Green",
  },
]

export default function BasicMasksPage() {
  const [selectedMasks, setSelectedMasks] = useState<Set<string>>(new Set())
  const [showGuide, setShowGuide] = useState(false)

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

  const orderViaWhatsApp = (mask: BasicMask) => {
    const message = `Hi! I'd like to order ${mask.name} (${mask.code}) for KSH ${mask.price}. Please confirm availability and delivery details.`
    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, "_blank")
  }

  const orderSelectedMasks = () => {
    if (selectedMasks.size === 0) return

    const selectedMasksList = basicMasks.filter((mask) => selectedMasks.has(mask.id))
    const totalPrice = selectedMasksList.reduce((sum, mask) => sum + mask.price, 0)
    const itemsList = selectedMasksList.map((mask) => `${mask.name} (${mask.code}) - KSH ${mask.price}`).join("\n")

    const message = `Hi! I'd like to order the following Basic masks:\n\n${itemsList}\n\nTotal: KSH ${totalPrice}\n\nPlease confirm availability and delivery details.`
    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, "_blank")
  }

  const clearSelection = () => {
    setSelectedMasks(new Set())
  }

  const selectedCount = selectedMasks.size
  const totalPrice = basicMasks.filter((mask) => selectedMasks.has(mask.id)).reduce((sum, mask) => sum + mask.price, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-blue-900 to-purple-900 relative overflow-hidden">
      {/* Improved Help Guide Modal */}
      {showGuide && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 max-w-lg w-full mx-4 shadow-2xl border border-gray-200"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Info className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Selection Guide</h3>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setShowGuide(false)}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full w-8 h-8 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-4 p-3 bg-green-50 rounded-xl">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <p className="font-medium text-gray-900 mb-1">Select Masks</p>
                  <p className="text-sm text-gray-600">
                    Tap on any mask card or use the ✓ button to add masks to your selection.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-3 bg-blue-50 rounded-xl">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <p className="font-medium text-gray-900 mb-1">Review Selection</p>
                  <p className="text-sm text-gray-600">
                    View your selected masks and total price in the floating summary bar.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-3 bg-purple-50 rounded-xl">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <p className="font-medium text-gray-900 mb-1">Place Order</p>
                  <p className="text-sm text-gray-600">Click "Order Selected" to proceed with WhatsApp ordering.</p>
                </div>
              </div>
            </div>

            <Button
              className="w-full bg-gradient-to-r from-green-600 to-purple-600 hover:from-green-700 hover:to-purple-700 text-white font-medium py-3 rounded-xl shadow-lg"
              onClick={() => setShowGuide(false)}
            >
              Got it! Let's start shopping
            </Button>
          </motion.div>
        </div>
      )}

      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-32 h-32 md:w-72 md:h-72 bg-green-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-32 h-32 md:w-72 md:h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-40 w-32 h-32 md:w-72 md:h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <Link href="/">
              <Button
                variant="ghost"
                className="text-white hover:bg-white/10 border-0 bg-transparent text-sm md:text-base"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Back to Collection</span>
                <span className="sm:hidden">Back</span>
              </Button>
            </Link>

            <Button
              variant="ghost"
              className="text-white hover:bg-white/10 border border-white/20 rounded-full"
              onClick={() => setShowGuide(true)}
            >
              <Info className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Help</span>
            </Button>
          </div>

          <div className="text-center">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-2">
              BASIC MASKS
            </h1>
            <p className="text-white/80 text-sm md:text-lg">Simple Collection</p>
          </div>
        </div>
      </header>

      {/* Floating Selection Summary */}
      {selectedCount > 0 && (
        <div className="fixed top-24 left-0 right-0 z-40 px-4">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="max-w-7xl mx-auto">
            <div className="backdrop-blur-md bg-gradient-to-r from-green-600/90 to-purple-600/90 rounded-2xl p-4 border border-white/20 shadow-xl">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-white font-semibold text-sm md:text-base">
                      {selectedCount} mask{selectedCount !== 1 ? "s" : ""} selected
                    </span>
                  </div>
                  <div className="text-yellow-300 font-bold text-lg md:text-xl">KSH {totalPrice}</div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white/10 border border-white/20 rounded-full"
                    onClick={clearSelection}
                  >
                    <X className="w-4 h-4 mr-1" />
                    Clear
                  </Button>
                  <Button
                    size="sm"
                    className="bg-white text-green-600 hover:bg-gray-100 font-medium rounded-full px-6"
                    onClick={orderSelectedMasks}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Order Selected
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Collection Stats */}
      <section className="relative z-10 py-6 px-4" style={{ marginTop: selectedCount > 0 ? "80px" : "20px" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <div className="backdrop-blur-md bg-white/10 rounded-2xl p-6 border border-white/20 inline-block">
              <div className="grid grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-2xl md:text-3xl font-bold text-green-400">{basicMasks.length}</div>
                  <div className="text-white/70 text-xs md:text-sm">Basic Designs</div>
                </div>
                <div>
                  <div className="text-2xl md:text-3xl font-bold text-blue-400">KSH 500</div>
                  <div className="text-white/70 text-xs md:text-sm">Each Mask</div>
                </div>
                <div>
                  <div className="text-2xl md:text-3xl font-bold text-purple-400">Simple</div>
                  <div className="text-white/70 text-xs md:text-sm">Style</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Masks Grid */}
      <section className="relative z-10 py-6 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {basicMasks.map((mask, index) => {
              const isSelected = selectedMasks.has(mask.id)
              return (
                <motion.div
                  key={mask.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -8 }}
                  className="group"
                >
                  <Card
                    className={`backdrop-blur-md bg-white/10 border-white/20 hover:bg-white/20 transition-all duration-300 overflow-hidden h-full ${
                      isSelected ? "ring-2 ring-yellow-400 bg-white/20 shadow-xl" : ""
                    }`}
                  >
                    <div className="relative">
                      <div className="aspect-square bg-gradient-to-br from-green-500/20 to-purple-500/20 flex items-center justify-center relative overflow-hidden">
                        <img
                          src={mask.image || "/placeholder.svg"}
                          alt={mask.name}
                          className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        <Badge className="absolute top-3 right-3 bg-green-600 text-white border-0">
                          <Palette className="w-3 h-3 mr-1" />
                          Basic
                        </Badge>

                        {isSelected && (
                          <div className="absolute top-3 left-3 bg-yellow-400 text-black rounded-full p-2 shadow-lg">
                            <Check className="w-4 h-4" />
                          </div>
                        )}

                        <button
                          onClick={() => toggleMaskSelection(mask.id)}
                          className="absolute inset-0 bg-transparent cursor-pointer"
                          aria-label={`${isSelected ? "Remove" : "Add"} ${mask.name} from selection`}
                        />
                      </div>
                    </div>

                    <CardContent className="p-6">
                      <div className="mb-4">
                        <h3 className="text-lg md:text-xl font-bold text-white mb-2 line-clamp-1">{mask.name}</h3>
                        <p className="text-white/70 text-sm mb-2">
                          {mask.code} • {mask.color}
                        </p>
                        <p className="text-white/60 text-sm line-clamp-2">{mask.description}</p>
                      </div>

                      <div className="flex items-center justify-between mb-4">
                        <span className="text-2xl font-bold text-yellow-400">KSH {mask.price}</span>
                        <div className="flex items-center text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-current" />
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Button
                          size="sm"
                          className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-full font-medium"
                          onClick={() => orderViaWhatsApp(mask)}
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Order Now
                        </Button>
                        <Button
                          size="sm"
                          className={`rounded-full px-4 font-medium transition-all duration-200 ${
                            isSelected
                              ? "bg-yellow-400 text-black hover:bg-yellow-500 shadow-lg"
                              : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
                          }`}
                          onClick={() => toggleMaskSelection(mask.id)}
                        >
                          {isSelected ? <X className="w-4 h-4" /> : <Check className="w-4 h-4" />}
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
      <footer className="relative z-10 py-12 px-4 border-t border-white/20 mt-20">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-white mb-4">BASIC MASK COLLECTION</h3>
          <p className="text-white/70 mb-6">Simple and affordable masks for any occasion</p>
          <div className="backdrop-blur-md bg-white/10 rounded-2xl p-6 border border-white/20 inline-block">
            <div className="flex items-center justify-center gap-4 mb-4">
              <img src="/images/eltek-logo.jpg" alt="Eltek Logo" className="w-12 h-12 rounded-lg" />
              <div>
                <p className="text-white/90 font-medium">
                  Designed and Developed by <span className="text-yellow-400 font-bold">ELTEK</span>
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black transition-colors"
              onClick={() => window.open("https://eltek.netlify.app", "_blank")}
            >
              Visit Eltek Website
            </Button>
          </div>
        </div>
      </footer>
    </div>
  )
}
