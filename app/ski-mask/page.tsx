"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ShoppingCart, Star, ArrowLeft, Shield, Check, Info, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const whatsappNumber = "+254719338534"

interface SkiMask {
  id: string
  name: string
  code: string
  price: number
  image: string
  description: string
}

const skiMasks: SkiMask[] = [
  {
    id: "sm-01",
    name: "Black Balaclava",
    code: "SM-01",
    price: 500,
    image: "/images/ski-mask/black-balaclava.jpg",
    description: "Classic black balaclava for tactical or winter use",
  },
  {
    id: "sm-02",
    name: "Skull Bandana",
    code: "SM-02",
    price: 500,
    image: "/images/ski-mask/skull-bandana.jpg",
    description: "Skull pattern bandana face covering",
  },
  {
    id: "sm-03",
    name: "Skull Face Cover",
    code: "SM-03",
    price: 500,
    image: "/images/ski-mask/skull-face-cover.jpg",
    description: "Skull design face covering with tactical style",
  },
  {
    id: "sm-04",
    name: "Skull Balaclava",
    code: "SM-04",
    price: 500,
    image: "/images/ski-mask/skull-balaclava.jpg",
    description: "Balaclava with skull jaw design",
  },
]

export default function SkiMaskPage() {
  const [selectedMasks, setSelectedMasks] = useState<Set<string>>(new Set())
  const [showGuide, setShowGuide] = useState(true)

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

  const orderViaWhatsApp = (mask: SkiMask) => {
    const message = `Hi! I'd like to order ${mask.name} (${mask.code}) for KSH ${mask.price}. Please confirm availability and delivery details.`
    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, "_blank")
  }

  const orderSelectedMasks = () => {
    if (selectedMasks.size === 0) return

    const selectedMasksList = skiMasks.filter((mask) => selectedMasks.has(mask.id))
    const totalPrice = selectedMasksList.reduce((sum, mask) => sum + mask.price, 0)
    const itemsList = selectedMasksList.map((mask) => `${mask.name} (${mask.code}) - KSH ${mask.price}`).join("\n")

    const message = `Hi! I'd like to order the following Ski masks:\n\n${itemsList}\n\nTotal: KSH ${totalPrice}\n\nPlease confirm availability and delivery details.`
    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, "_blank")
  }

  const clearSelection = () => {
    setSelectedMasks(new Set())
  }

  const selectedCount = selectedMasks.size
  const totalPrice = skiMasks.filter((mask) => selectedMasks.has(mask.id)).reduce((sum, mask) => sum + mask.price, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* User Guide Modal */}
      {showGuide && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 max-w-md w-full mx-4"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Info className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-bold text-gray-900">How to Select Masks</h3>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setShowGuide(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xs mt-0.5">
                  1
                </div>
                <p>Tap on any mask card to select it. Selected masks will show a checkmark.</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xs mt-0.5">
                  2
                </div>
                <p>Use the "+" button or tap the mask image to add to your selection.</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xs mt-0.5">
                  3
                </div>
                <p>View your selection summary at the top, then press "Order Selected" to proceed.</p>
              </div>
            </div>
            <Button
              className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => setShowGuide(false)}
            >
              Got it!
            </Button>
          </motion.div>
        </div>
      )}

      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-32 h-32 md:w-72 md:h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-32 h-32 md:w-72 md:h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-40 w-32 h-32 md:w-72 md:h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 p-4 md:p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
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
          <div className="text-center flex-1 px-4">
            <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold text-white bg-gradient-to-r from-gray-400 via-black to-gray-600 bg-clip-text text-transparent">
              SKI MASKS
            </h1>
            <p className="text-white/80 text-sm md:text-lg">Tactical Collection</p>
          </div>
          <div className="w-16 md:w-32"></div>
        </div>
      </header>

      {/* Floating Selection Summary */}
      {selectedCount > 0 && (
        <div className="fixed top-20 left-0 right-0 z-40 px-4">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="max-w-7xl mx-auto">
            <div className="backdrop-blur-md bg-white/10 rounded-2xl p-3 md:p-4 border border-white/20 shadow-lg">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2 md:gap-4">
                  <span className="text-white font-semibold text-sm md:text-base">
                    {selectedCount} mask{selectedCount !== 1 ? "s" : ""} selected
                  </span>
                  <span className="text-yellow-400 font-bold text-sm md:text-xl">Total: KSH {totalPrice}</span>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white/10 text-xs md:text-sm"
                    onClick={clearSelection}
                  >
                    Clear
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
      <section className="relative z-10 py-4 md:py-8 px-4" style={{ marginTop: selectedCount > 0 ? "80px" : "0" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <div className="backdrop-blur-md bg-white/10 rounded-2xl p-4 md:p-6 border border-white/20 inline-block">
              <div className="grid grid-cols-3 gap-4 md:gap-8 text-center">
                <div>
                  <div className="text-xl md:text-3xl font-bold text-gray-400">{skiMasks.length}</div>
                  <div className="text-white/70 text-xs md:text-sm">Ski Designs</div>
                </div>
                <div>
                  <div className="text-xl md:text-3xl font-bold text-black">KSH 500</div>
                  <div className="text-white/70 text-xs md:text-sm">Each Mask</div>
                </div>
                <div>
                  <div className="text-xl md:text-3xl font-bold text-blue-400">Tactical</div>
                  <div className="text-white/70 text-xs md:text-sm">Style</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Masks Grid */}
      <section className="relative z-10 py-4 md:py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
            {skiMasks.map((mask, index) => {
              const isSelected = selectedMasks.has(mask.id)
              return (
                <motion.div
                  key={mask.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -5 }}
                >
                  <Card
                    className={`backdrop-blur-md bg-white/10 border-white/20 hover:bg-white/20 transition-all duration-300 overflow-hidden group h-full ${isSelected ? "ring-2 ring-yellow-400 bg-white/20" : ""}`}
                  >
                    <div className="relative">
                      <div className="aspect-square bg-gradient-to-br from-gray-500/20 to-black/20 flex items-center justify-center relative overflow-hidden">
                        <img
                          src={mask.image || "/placeholder.svg"}
                          alt={mask.name}
                          className="w-full h-full object-contain p-2 md:p-4 group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <Badge className="absolute top-2 right-2 bg-gray-500 text-white text-xs">
                          <Shield className="w-2 h-2 md:w-3 md:h-3 mr-1" />
                          Ski
                        </Badge>
                        {isSelected && (
                          <div className="absolute top-2 left-2 bg-yellow-400 text-black rounded-full p-1">
                            <Check className="w-3 h-3 md:w-4 md:h-4" />
                          </div>
                        )}
                        <button
                          onClick={() => toggleMaskSelection(mask.id)}
                          className="absolute inset-0 bg-transparent"
                          aria-label={`${isSelected ? "Deselect" : "Select"} ${mask.name}`}
                        />
                      </div>
                    </div>
                    <CardContent className="p-3 md:p-6 flex flex-col h-full">
                      <div className="flex-1">
                        <h3 className="text-sm md:text-lg font-bold text-white mb-1 md:mb-2 line-clamp-2">
                          {mask.name}
                        </h3>
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
                        <div className="flex gap-1 md:gap-2">
                          <Button
                            size="sm"
                            className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-full text-xs"
                            onClick={() => orderViaWhatsApp(mask)}
                          >
                            <ShoppingCart className="w-2 h-2 md:w-3 md:h-3 mr-1" />
                            Order
                          </Button>
                          <Button
                            size="sm"
                            className={`rounded-full px-2 md:px-3 text-xs ${
                              isSelected
                                ? "bg-yellow-400 text-black hover:bg-yellow-500"
                                : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
                            }`}
                            onClick={() => toggleMaskSelection(mask.id)}
                          >
                            {isSelected ? <Check className="w-2 h-2 md:w-3 md:h-3" /> : "+"}
                          </Button>
                        </div>
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
          <h3 className="text-xl md:text-2xl font-bold text-white mb-4">SKI MASK COLLECTION</h3>
          <p className="text-white/70 mb-6 text-sm md:text-base">Tactical and winter face coverings</p>
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
