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
      <section className="gradient-hero text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-heading font-bold mb-6">
            Delicious Food,<br />Delivered Fast
          </h2>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Fresh, restaurant-quality meals prepared in our cloud kitchen and delivered 
            to your doorstep in under 30 minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/menu">
              <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-100">
                Order Now
              </Button>
            </Link>
            <div className="flex items-center space-x-2 text-sm">
              <i className="fas fa-clock"></i>
              <span>30-45 min delivery</span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-heading font-bold text-center mb-12">
            Browse Categories
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {mockCategories.map((category) => (
              <Link key={category.id} href={`/menu?category=${category.id}`}>
                <Card className="text-center cursor-pointer card-hover">
                  <CardContent className="p-6">
                    <img
                      src={category.image || "/placeholder-category.jpg"}
                      alt={category.name}
                      className="w-16 h-16 mx-auto mb-4 rounded-full object-cover"
                    />
                    <h4 className="font-semibold text-lg font-heading">
                      {category.name}
                    </h4>
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
          <h3 className="text-3xl font-heading font-bold text-center mb-12">
            Today's Specials
          </h3>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-clock text-primary text-2xl"></i>
              </div>
              <h4 className="text-xl font-heading font-semibold mb-2">Fast Delivery</h4>
              <p className="text-gray-600">Fresh food delivered in 30-45 minutes</p>
            </div>
            <div className="text-center">
              <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-leaf text-secondary text-2xl"></i>
              </div>
              <h4 className="text-xl font-heading font-semibold mb-2">Fresh Ingredients</h4>
              <p className="text-gray-600">Made with the finest, freshest ingredients</p>
            </div>
            <div className="text-center">
              <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-star text-accent text-2xl"></i>
              </div>
              <h4 className="text-xl font-heading font-semibold mb-2">Quality Assured</h4>
              <p className="text-gray-600">5-star rated meals from our cloud kitchen</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
