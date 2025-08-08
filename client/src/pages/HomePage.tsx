import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MenuItemCard } from "@/components/menu/MenuItemCard";
import { mockCategories, mockMenuItems } from "@/data/mockData";

export function HomePage() {
  const featuredItems = mockMenuItems.slice(0, 3);

  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <section className="relative gradient-hero text-white py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-full text-sm font-medium mb-8 backdrop-blur-sm border border-white/20">
            <svg className="w-5 h-5 mr-2 text-green-300 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
            </svg>
            🎉 Now Open! Fresh Kitchen, Fast Delivery
          </div>
          
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold mb-6 leading-tight">
            Your New Favorite <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
              Cloud Kitchen
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90 leading-relaxed">
            We're excited to introduce CloudBite - your brand new cloud kitchen! 
            Fresh, restaurant-quality meals prepared with love and delivered to your doorstep in under 30 minutes.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="/menu">
              <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300 text-lg px-8 py-4">
                Order Now
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                </svg>
              </Button>
            </Link>
            
            <div className="flex items-center space-x-4 text-white/90">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span className="font-medium">30-45 min delivery</span>
              </div>
              <div className="w-1 h-1 bg-white/50 rounded-full"></div>
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
                <span className="font-medium">4.8★ rated</span>
              </div>
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
              Fresh from our new kitchen! These handpicked favorites showcase what makes CloudBite special
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
            <h3 className="text-3xl font-heading font-bold mb-4">Why Choose CloudBite?</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experience the perfect blend of taste, quality, and convenience with our cloud kitchen service
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-xl font-heading font-semibold mb-3">Fast Delivery</h4>
              <p className="text-gray-600">Fresh food delivered to your doorstep in 30-45 minutes with real-time tracking</p>
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
              <div className="text-gray-300">Average Rating</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">30min</div>
              <div className="text-gray-300">Avg Delivery Time</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
