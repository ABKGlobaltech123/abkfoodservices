import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MenuItemCard } from "@/components/menu/MenuItemCard";
import { mockCategories, mockMenuItems } from "@/data/mockData";
import heroBackground from "@assets/generated_images/appetizing_Indian_food_hero_background_35225fd3.png";
import { useState, useEffect } from "react";

export function HomePage() {
  const featuredItems = mockMenuItems.slice(0, 3);
  
  // Hero food carousel images
  const heroFoodImages = [
    "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    "https://images.unsplash.com/photo-1527477396000-e27163b481c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    "https://images.unsplash.com/photo-1546793665-c74683f339c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    "https://images.unsplash.com/photo-1562967914-608f82629710?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
  ];
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Auto-scroll images every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroFoodImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [heroFoodImages.length]);

  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <section className="relative text-white min-h-screen flex items-center overflow-hidden">
        {/* Hero Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBackground})` }}
        ></div>
        
        {/* Dark Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-primary/40 to-black/80"></div>
        
        {/* Floating Shapes */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-yellow-400/20 rounded-full blur-xl animate-bounce"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-orange-400/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-red-400/20 rounded-full blur-xl animate-pulse"></div>
        
        {/* Floating Food Images Carousel */}
        <div className="absolute right-10 top-1/2 transform -translate-y-1/2 hidden lg:block">
          <div className="relative w-80 h-80">
            {heroFoodImages.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                  index === currentImageIndex
                    ? 'opacity-100 scale-100 rotate-0'
                    : index === (currentImageIndex - 1 + heroFoodImages.length) % heroFoodImages.length
                    ? 'opacity-60 scale-90 rotate-12 translate-x-8 translate-y-8'
                    : index === (currentImageIndex + 1) % heroFoodImages.length
                    ? 'opacity-60 scale-90 -rotate-12 -translate-x-8 translate-y-8'
                    : 'opacity-0 scale-75'
                }`}
              >
                <img
                  src={image}
                  alt="Delicious food"
                  className="w-full h-full object-cover rounded-3xl shadow-2xl border-4 border-white/20"
                />
              </div>
            ))}
            
            {/* Floating animation elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full animate-bounce opacity-80"></div>
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-red-400 rounded-full animate-pulse opacity-80"></div>
            <div className="absolute top-1/2 -left-8 w-4 h-4 bg-green-400 rounded-full animate-ping opacity-60"></div>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 py-20 lg:text-left lg:max-w-3xl">
          {/* Status Badge */}
          <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-500/30 to-blue-500/30 rounded-full text-sm font-medium mb-12 backdrop-blur-md border border-white/30 shadow-2xl hover:scale-105 transition-transform duration-300">
            <div className="w-3 h-3 bg-green-400 rounded-full mr-3 animate-pulse"></div>
            <span className="text-lg font-semibold">🍔 NOW OPEN • Fresh Kitchen • Ready for Pickup</span>
          </div>
          
          {/* Main Heading with Enhanced Typography */}
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-black mb-4 leading-tight">
              <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-300 to-red-400 drop-shadow-2xl">
                ABK Food Services
              </span>
            </h1>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white/95 tracking-wide">
              <span className="inline-block hover:scale-105 transition-transform duration-300">Authentic Flavors,</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300 inline-block hover:scale-105 transition-transform duration-300">
                Fresh & Fast
              </span>
            </h2>
          </div>
          

          
          {/* Enhanced CTA Section */}
          <div className="flex flex-col lg:flex-row gap-8 justify-center lg:justify-start items-center mb-16">
            <Link href="/menu">
              <Button 
                size="lg" 
                className="group bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold text-xl px-12 py-6 rounded-2xl shadow-2xl hover:shadow-orange-500/25 transform hover:-translate-y-1 transition-all duration-300 border-2 border-white/20"
              >
                <span className="mr-3">🍽️</span>
                Order Now
                <svg className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                </svg>
              </Button>
            </Link>
            
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => window.open('tel:+918341051124', '_self')}
              className="group bg-white/10 backdrop-blur-md border-2 border-white/30 text-white hover:bg-white/20 font-semibold text-lg px-10 py-6 rounded-2xl transition-all duration-300 cursor-pointer"
            >
              <span className="mr-2">📞</span>
              Call to Order
            </Button>
          </div>
          
          {/* Modern Contact Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="group bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
              <div className="flex items-center justify-center mb-3">
                <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
              </div>
              <h3 className="font-bold text-lg mb-1">Call Us Now</h3>
              <p className="text-yellow-300 font-semibold text-lg">+91 8341051124</p>
              <p className="text-sm text-white/70 mt-1">Available 10 AM - 11 PM</p>
            </div>
            
            <div className="group bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
              <div className="flex items-center justify-center mb-3">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <h3 className="font-bold text-lg mb-1">Email Us</h3>
              <p className="text-blue-300 font-semibold text-lg break-all">sales@abkfoodservices.com</p>
              <p className="text-sm text-white/70 mt-1">Quick Response Guaranteed</p>
            </div>
            
            <div className="group bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
              <div className="flex items-center justify-center mb-3">
                <div className="w-12 h-12 bg-gradient-to-r from-red-400 to-orange-500 rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="font-bold text-lg mb-1">Visit Us</h3>
              <p className="text-orange-300 font-semibold text-lg">H501 Indis VB City</p>
              <p className="text-sm text-white/70 mt-1">Kompally, Hyderabad</p>
            </div>
          </div>
        </div>
      </section>

      {/* Grand Opening Banner */}
      <section className="py-8 bg-gradient-to-r from-orange-500 to-red-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
            <div className="flex items-center space-x-3">
              <span className="text-2xl animate-bounce">🎉</span>
              <h3 className="text-2xl font-bold font-heading">GRAND OPENING SPECIAL!</h3>
              <span className="text-2xl animate-bounce">🎉</span>
            </div>
            <div className="flex items-center space-x-4 text-lg">
              <span className="bg-white text-orange-500 px-4 py-2 rounded-full font-bold">25% OFF</span>
              <span>your first order with code: WELCOME25</span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-heading font-bold mb-4">Explore Our Fresh Menu</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Brand new recipes crafted with the finest ingredients in our newly opened cloud kitchen
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {mockCategories.map((category) => (
              <Link key={category.id} href={`/menu?category=${category.id}`}>
                <Card className="text-center cursor-pointer card-hover group border-2 border-transparent hover:border-primary/20 transition-all duration-300">
                  <CardContent className="p-4 md:p-6">
                    <div className="relative mb-4">
                      <img
                        src={category.image || "/placeholder-category.jpg"}
                        alt={category.name}
                        className="w-16 h-16 md:w-20 md:h-20 mx-auto rounded-full object-cover shadow-lg group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <h4 className="font-semibold text-base md:text-lg font-heading text-gray-800 group-hover:text-primary transition-colors">
                      {category.name}
                    </h4>
                    <p className="text-sm text-gray-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {category.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Items Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-primary font-medium mb-4">
              <span className="mr-2">✨</span>
              Opening Week Specials
              <span className="ml-2">✨</span>
            </div>
            <h3 className="text-3xl font-heading font-bold mb-4">Try Our Signature Dishes</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Fresh from our new kitchen! These handpicked favorites showcase what makes ABK Food Services special
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredItems.map((item) => (
              <MenuItemCard key={item.id} item={item} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/menu">
              <Button size="lg">View Full Menu</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-heading font-bold mb-4">Why Choose ABK Food Services?</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experience the perfect blend of taste, quality, and convenience with our fast food pickup service
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-xl font-heading font-semibold mb-3">Quick Pickup</h4>
              <p className="text-gray-600">Fresh food prepared fast and ready for pickup in 10-20 minutes at our Hyderabad location</p>
            </div>
            <div className="text-center group">
              <div className="bg-secondary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-secondary/20 transition-colors">
                <svg className="w-10 h-10 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h4 className="text-xl font-heading font-semibold mb-3">Fresh Ingredients</h4>
              <p className="text-gray-600">Made with the finest, freshest ingredients sourced daily from local suppliers</p>
            </div>
            <div className="text-center group">
              <div className="bg-accent/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/20 transition-colors">
                <svg className="w-10 h-10 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <h4 className="text-xl font-heading font-semibold mb-3">Quality Assured</h4>
              <p className="text-gray-600">5-star rated meals prepared in our state-of-the-art cloud kitchen</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">NEW</div>
              <div className="text-gray-300">Fresh Kitchen</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">50+</div>
              <div className="text-gray-300">Menu Items</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">4.8</div>
              <div className="text-gray-300">Target Rating</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">15min</div>
              <div className="text-gray-300">Pickup Ready</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section for New Opening */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-heading font-bold mb-6">Get In Touch</h3>
          <p className="text-xl mb-8 opacity-90">
            We're excited to serve you delicious fast food! Contact ABK Food Services for fresh, quality meals ready for quick pickup in Hyderabad.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="text-center">
              <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold mb-2">Call Us</h4>
              <p className="opacity-90">+91 8341051124</p>
              <p className="text-sm opacity-75 mt-1">Mon-Sun: 10 AM - 11 PM</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold mb-2">Email Us</h4>
              <p className="opacity-90">sales@abkfoodservices.com</p>
              <p className="text-sm opacity-75 mt-1">We reply within 2 hours</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold mb-2">Our Location</h4>
              <p className="opacity-90">H501 Indis VB City</p>
              <p className="text-sm opacity-75 mt-1">Kompally, Hyderabad, India</p>
            </div>
          </div>

          <div className="inline-flex items-center px-6 py-3 bg-white text-primary rounded-full text-sm font-medium">
            <span className="mr-2">🎉</span>
            Opening Special: Use code WELCOME25 for 25% off your first order!
          </div>
        </div>
      </section>
    </div>
  );
}
