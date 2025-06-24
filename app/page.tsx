"use client"
import { motion, useScroll, useTransform } from "framer-motion"
import { Star, Sparkles, Crown, Zap, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useState, useEffect } from "react"

const whatsappNumber = "+254719338534"

// Floating mask animation component - SSR Safe
const FloatingMask = ({ src, delay, duration, x, y, rotate }: any) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <motion.div
      className="absolute pointer-events-none opacity-20"
      initial={{
        x: x,
        y: y + 100,
        rotate: rotate,
        opacity: 0,
      }}
      animate={{
        x: x + Math.sin(Date.now() * 0.001 + delay) * 50,
        y: y + Math.cos(Date.now() * 0.001 + delay) * 30,
        rotate: rotate + Math.sin(Date.now() * 0.002 + delay) * 10,
        opacity: 0.3,
      }}
      transition={{
        duration: duration,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
        ease: "easeInOut",
        delay: delay,
      }}
    >
      <img
        src={src || "/placeholder.svg"}
        alt="Floating mask"
        className="w-16 h-16 md:w-24 md:h-24 object-contain filter blur-sm"
      />
    </motion.div>
  )
}

// Falling mask rain component - SSR Safe
const FallingMask = ({ src, delay }: any) => {
  const [mounted, setMounted] = useState(false)
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 })

  useEffect(() => {
    setMounted(true)
    if (typeof window !== "undefined") {
      setDimensions({ width: window.innerWidth, height: window.innerHeight })
    }
  }, [])

  if (!mounted) return null

  return (
    <motion.div
      className="absolute pointer-events-none opacity-10"
      initial={{
        x: Math.random() * dimensions.width,
        y: -100,
        rotate: Math.random() * 360,
      }}
      animate={{
        y: dimensions.height + 100,
        rotate: Math.random() * 360 + 180,
      }}
      transition={{
        duration: Math.random() * 3 + 5,
        delay: delay,
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear",
      }}
    >
      <img src={src || "/placeholder.svg"} alt="Falling mask" className="w-8 h-8 md:w-12 md:h-12 object-contain" />
    </motion.div>
  )
}

const MasqueradeCatalogue = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [screenDimensions, setScreenDimensions] = useState({ width: 1200, height: 800 })

  const { scrollYProgress } = useScroll()
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
  const heroImageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])

  useEffect(() => {
    setMounted(true)
    if (typeof window !== "undefined") {
      setScreenDimensions({ width: window.innerWidth, height: window.innerHeight })

      const handleResize = () => {
        setScreenDimensions({ width: window.innerWidth, height: window.innerHeight })
      }

      window.addEventListener("resize", handleResize)
      return () => window.removeEventListener("resize", handleResize)
    }
  }, [])

  const maskCategories = [
    {
      id: "black-lace",
      name: "Black Lace",
      price: 500,
      items: ["BL-01", "BL-02", "BL-03", "BL-04", "BL-05", "BL-06", "BL-07", "BL-08", "BL-09", "BL-10"],
      description: "Elegant black lace masquerade masks for Ladies",
      hasSubPage: true,
      image: "/images/black-lace/spider-web.jpg",
      gradient: "from-gray-600 to-black",
    },
    {
      id: "phoenix-men",
      name: "Phoenix Men",
      price: 500,
      items: ["PM-01", "PM-02", "PM-03", "PM-04", "PM-05", "PM-06"],
      description: "Majestic phoenix-inspired masks for men",
      hasSubPage: true,
      image: "/images/phoenix-men/golden-crown.jpg",
      gradient: "from-orange-600 to-yellow-600",
    },
    {
      id: "phantom-half-face",
      name: "Phantom Half Face",
      price: 600,
      items: ["PH-01", "PH-02", "PH-03", "PH-04", "PH-05", "PH-06", "PH-07", "PH-08", "PH-09"],
      description: "Classic phantom half-face masks",
      hasSubPage: true,
      image: "/images/phantom-half-face/black-phantom.jpg",
      gradient: "from-purple-600 to-gray-600",
    },
    {
      id: "men-women",
      name: "Men/Women",
      price: 500,
      items: ["MW-01", "MW-02", "MW-03", "MW-04", "MW-05", "MW-06"],
      description: "Unisex masquerade masks",
      hasSubPage: true,
      image: "/images/men-women/black-white-swirl.jpg",
      gradient: "from-blue-600 to-purple-600",
    },
    {
      id: "ancient-masquerade",
      name: "Ancient Masquerade",
      price: 500,
      items: [
        "AM-01",
        "AM-02",
        "AM-03",
        "AM-04",
        "AM-05",
        "AM-06",
        "AM-07",
        "AM-08",
        "AM-09",
        "AM-10",
        "AM-11",
        "AM-12",
      ],
      description: "Vintage-inspired ancient masquerade masks",
      hasSubPage: true,
      image: "/images/ancient-masquerade/ornate-silver.jpg",
      gradient: "from-yellow-600 to-orange-600",
    },
    {
      id: "colored-lace",
      name: "Colored Lace Mask",
      price: 600,
      items: ["CL-01", "CL-02", "CL-03", "CL-04", "CL-05", "CL-06", "CL-07", "CL-08", "CL-09", "CL-10"],
      description: "Vibrant colored lace masks",
      hasSubPage: true,
      image: "/images/colored-lace/golden-ornate-lace.jpg",
      gradient: "from-pink-600 to-purple-600",
    },
    {
      id: "led-masks",
      name: "LED Masks",
      price: 1200,
      items: ["LED-01"],
      description: "Available in Purple, Pink, Blue, Orange, Green, Yellow",
      special: true,
      hasSubPage: true,
      image: "/images/led-masks/led-collection.jpg",
      gradient: "from-cyan-600 to-blue-600",
    },
    {
      id: "skull-mask",
      name: "Skull Mask",
      price: 500,
      items: ["SK-01", "SK-02", "SK-03", "SK-04", "SK-05", "SK-06", "SK-07", "SK-08", "SK-09", "SK-10"],
      description: "Spooky skull-themed masks",
      hasSubPage: true,
      image: "/images/skull-mask/golden-skull.jpg",
      gradient: "from-gray-600 to-red-600",
    },
    {
      id: "lower-face",
      name: "Lower Face Mask",
      price: 500,
      items: ["LF-01", "LF-02", "LF-03", "LF-04", "LF-05", "LF-06"],
      description: "Stylish lower face masks with fangs and jaw designs",
      hasSubPage: true,
      image: "/images/lower-face/golden-skull-jaw.jpg",
      gradient: "from-orange-600 to-red-600",
    },
    {
      id: "basic-masks",
      name: "Basic Masks",
      price: 500,
      items: ["BM-01", "BM-02", "BM-03", "BM-04"],
      description: "Simple colored masks for casual events",
      hasSubPage: true,
      image: "/images/basic-masks/red-mask.jpg",
      gradient: "from-red-600 to-pink-600",
    },
    {
      id: "money-heist",
      name: "Money Heist",
      price: 500,
      items: ["MH-01"],
      description: "Popular money heist Salvador Dali mask",
      hasSubPage: true,
      image: "/images/money-heist/salvador-dali-mask.jpg",
      gradient: "from-red-600 to-yellow-600",
      featured: true,
    },
    {
      id: "batman",
      name: "Batman & Batwoman",
      price: 500,
      items: ["BT-01", "BT-02", "BT-03"],
      description: "Superhero Batman and Batwoman masks",
      hasSubPage: true,
      image: "/images/batman/black-batman-mask.jpg",
      gradient: "from-gray-800 to-black",
    },
  ]

  const filteredMaskCategories = maskCategories.filter((category) => category.items.length > 0)

  // Mask images for animations
  const maskImages = [
    "/images/black-lace/spider-web.jpg",
    "/images/phoenix-men/golden-crown.jpg",
    "/images/phantom-half-face/black-phantom.jpg",
    "/images/skull-mask/golden-skull.jpg",
    "/images/batman/black-batman-mask.jpg",
    "/images/money-heist/salvador-dali-mask.jpg",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background with Floating Masks */}
      <motion.div className="absolute inset-0 opacity-20" style={{ y: backgroundY }}>
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-40 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
      </motion.div>

      {/* Floating Masks Animation - Automatic */}
      {mounted && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Floating masks */}
          {maskImages.map((src, index) => (
            <FloatingMask
              key={`floating-${index}`}
              src={src}
              delay={index * 0.5}
              duration={4 + index}
              x={Math.random() * screenDimensions.width}
              y={Math.random() * screenDimensions.height}
              rotate={Math.random() * 360}
            />
          ))}

          {/* Falling mask rain */}
          {maskImages.map((src, index) => (
            <FallingMask key={`falling-${index}`} src={src} delay={index * 2} />
          ))}
        </div>
      )}

      {/* Hero Section - Fixed Layout */}
      <motion.section
        className="relative min-h-screen flex items-center justify-center px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text Content - Fixed z-index */}
          <motion.div
            className="text-center lg:text-left relative z-20"
            style={{ y: textY }}
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <motion.div
              className="backdrop-blur-md bg-white/10 rounded-3xl p-8 border border-white/20 shadow-2xl"
              whileHover={{ scale: 1.02, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <Crown className="w-12 h-12 md:w-16 md:h-16 mx-auto lg:mx-0 mb-6 text-yellow-400" />

                <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent leading-tight">
                  MASQUERADE
                </h1>

                <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white/90 mb-6">& MASKS KENYA</h2>

                <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                  Discover our premium collection of masquerade masks, from elegant lace to futuristic LED designs.
                  Transform your events with our handcrafted masterpieces.
                </p>

                <div className="flex justify-center lg:justify-start">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg rounded-full shadow-lg border-0"
                      onClick={() => document.getElementById("catalogue")?.scrollIntoView({ behavior: "smooth" })}
                    >
                      <Sparkles className="w-5 h-5 mr-2" />
                      Explore Collection
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Side - Artistic Mask Image - Fixed z-index */}
          <motion.div
            className="relative z-10"
            style={{ y: heroImageY }}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <motion.div
              className="relative"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {/* Glowing background effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-3xl blur-3xl"></div>

              {/* Main artistic image */}
              <div className="relative backdrop-blur-sm bg-white/5 rounded-3xl p-4 border border-white/20 shadow-2xl overflow-hidden">
                <img
                  src="/images/hero-masks-art.png"
                  alt="Artistic Masquerade Masks"
                  className="w-full h-auto rounded-2xl shadow-xl"
                />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 via-transparent to-transparent rounded-2xl"></div>

                {/* Floating elements around the image */}
                <motion.div
                  className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />

                <motion.div
                  className="absolute -bottom-4 -left-4 w-6 h-6 bg-pink-400 rounded-full"
                  animate={{
                    scale: [1, 1.3, 1],
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <section className="py-20 px-4 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="backdrop-blur-md bg-white/10 rounded-3xl p-8 border border-white/20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <motion.div whileHover={{ scale: 1.1 }}>
                <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">12+</div>
                <div className="text-white/70 text-sm">Collections</div>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }}>
                <div className="text-3xl md:text-4xl font-bold text-pink-400 mb-2">100+</div>
                <div className="text-white/70 text-sm">Unique Masks</div>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }}>
                <div className="text-3xl md:text-4xl font-bold text-purple-400 mb-2">500+</div>
                <div className="text-white/70 text-sm">Happy Customers</div>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }}>
                <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">24/7</div>
                <div className="text-white/70 text-sm">Support</div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Catalogue Section - Enhanced */}
      <section id="catalogue" className="py-20 px-4">
        <motion.div
          className="max-w-7xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-16">
            <motion.h2
              className="text-4xl md:text-6xl font-bold text-white mb-4 bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent"
              whileInView={{ scale: [0.9, 1.1, 1] }}
              transition={{ duration: 0.6 }}
            >
              Our Collection
            </motion.h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Premium masks starting from KSH 500 - Handcrafted with attention to detail
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredMaskCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -15, scale: 1.02 }}
                className="group"
              >
                <Card
                  className={`backdrop-blur-md bg-white/10 border-white/20 hover:bg-white/20 transition-all duration-500 overflow-hidden h-full ${category.featured ? "ring-2 ring-yellow-400 shadow-2xl" : ""}`}
                >
                  <div className="relative">
                    <div
                      className={`aspect-square bg-gradient-to-br ${category.gradient}/20 flex items-center justify-center relative overflow-hidden`}
                    >
                      <img
                        src={category.image || "/placeholder.svg"}
                        alt={category.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {category.special && (
                        <Badge className="absolute top-4 right-4 bg-yellow-500 text-black animate-pulse">
                          <Zap className="w-3 h-3 mr-1" />
                          LED
                        </Badge>
                      )}

                      {category.featured && (
                        <Badge className="absolute top-4 left-4 bg-red-500 text-white animate-bounce">
                          <Star className="w-3 h-3 mr-1" />
                          Popular
                        </Badge>
                      )}

                      {/* Hover overlay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Button
                          size="sm"
                          className="bg-white/90 text-black hover:bg-white font-medium rounded-full"
                          onClick={() => (window.location.href = `/${category.id}`)}
                        >
                          View Collection
                        </Button>
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-bold text-white group-hover:text-yellow-400 transition-colors">
                        {category.name}
                      </h3>
                      <span className="text-sm text-white/60 bg-white/10 px-2 py-1 rounded-full">
                        {category.items.length} items
                      </span>
                    </div>

                    <p className="text-white/70 text-sm mb-4 line-clamp-2">{category.description}</p>

                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold text-yellow-400">KSH {category.price}</span>
                      <div className="flex items-center text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                    </div>

                    <Button
                      className={`w-full bg-gradient-to-r ${category.gradient} hover:shadow-lg text-white rounded-full font-medium transition-all duration-300`}
                      onClick={() => (window.location.href = `/${category.id}`)}
                    >
                      <Crown className="w-4 h-4 mr-2" />
                      Explore Collection
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Features Section - Enhanced */}
      <section className="py-20 px-4">
        <motion.div
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Why Choose Our Masks?</h2>
            <p className="text-xl text-white/80">Experience the difference with our premium quality masks</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Crown,
                title: "Premium Quality",
                description: "Handcrafted with attention to detail using the finest materials",
                color: "text-yellow-400",
                gradient: "from-yellow-400 to-orange-500",
              },
              {
                icon: Zap,
                title: "Fast Delivery",
                description: "Quick delivery across Kenya with secure packaging",
                color: "text-purple-400",
                gradient: "from-purple-400 to-pink-500",
              },
              {
                icon: Star,
                title: "Affordable Prices",
                description: "Starting from just KSH 500 with unbeatable value",
                color: "text-pink-400",
                gradient: "from-pink-400 to-red-500",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="backdrop-blur-md bg-white/10 rounded-3xl p-8 border border-white/20 text-center group hover:bg-white/20 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -10 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div
                  className={`w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r ${feature.gradient} p-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className="w-full h-full text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4 group-hover:text-yellow-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-white/70 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Footer - Enhanced */}
      <footer className="py-16 px-4 border-t border-white/20 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-white mb-4 bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent">
              MASQUERADE & MASKS KENYA
            </h3>
            <p className="text-white/70 mb-8 text-lg">Your premier destination for quality masquerade masks</p>

            <div className="backdrop-blur-md bg-white/10 rounded-3xl p-8 border border-white/20 inline-block">
              <div className="flex items-center justify-center gap-6 mb-6">
                <motion.img
                  src="/images/eltek-logo.jpg"
                  alt="Eltek Logo"
                  className="w-16 h-16 rounded-xl shadow-lg"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                />
                <div className="text-left">
                  <p className="text-white/90 font-medium text-lg">
                    Designed and Developed by <span className="text-yellow-400 font-bold">ELTEK</span>
                  </p>
                  <p className="text-white/60 text-sm">Premium Web Solutions</p>
                </div>
              </div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-medium px-8 py-3 rounded-full shadow-lg"
                  onClick={() => window.open("https://eltek.netlify.app", "_blank")}
                >
                  Visit Eltek Website
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  )
}

export default MasqueradeCatalogue
