export function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">ABK Food Services</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Serving authentic, fresh, and fast food to Hyderabad with passion and quality since our inception.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <p className="text-gray-600 mb-4">
              ABK Food Services was born from a simple vision: to bring authentic, high-quality fast food 
              to the people of Hyderabad. Located in the heart of Kompally, we've built our reputation 
              on fresh ingredients, authentic flavors, and lightning-fast service.
            </p>
            <p className="text-gray-600 mb-4">
              Every dish we serve reflects our commitment to quality and our passion for food. 
              From juicy burgers to crispy pizzas, from spicy wings to fresh wraps, 
              we ensure every bite is a delightful experience.
            </p>
            <p className="text-gray-600">
              Our kitchen operates with the highest standards of hygiene and quality control, 
              ensuring that every order meets our rigorous standards before it reaches your hands.
            </p>
          </div>
          <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Why Choose ABK?</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <span className="mr-3">🍔</span>
                Fresh ingredients sourced daily
              </li>
              <li className="flex items-center">
                <span className="mr-3">⚡</span>
                Quick preparation and pickup
              </li>
              <li className="flex items-center">
                <span className="mr-3">🏆</span>
                Authentic flavors and recipes
              </li>
              <li className="flex items-center">
                <span className="mr-3">💯</span>
                Quality guaranteed on every order
              </li>
              <li className="flex items-center">
                <span className="mr-3">🧑‍🍳</span>
                Experienced chef team
              </li>
            </ul>
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Quality First</h3>
              <p className="text-gray-600">
                We never compromise on the quality of ingredients and preparation methods.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Speed & Efficiency</h3>
              <p className="text-gray-600">
                Fast service without compromising on taste or quality of our food.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">❤️</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Customer Satisfaction</h3>
              <p className="text-gray-600">
                Every customer leaves happy and satisfied with their food experience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}