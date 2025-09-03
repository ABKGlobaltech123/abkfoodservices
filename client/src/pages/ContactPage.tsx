export function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Contact <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">ABK Food Services</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get in touch with us for orders, inquiries, or feedback. We're here to serve you!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Get In Touch</h2>
            
            <div className="space-y-6">
              {/* Phone */}
              <div className="flex items-start space-x-4 p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xl">📞</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Call Us</h3>
                  <p className="text-green-600 font-semibold text-lg mb-1">+91 8341051124</p>
                  <p className="text-gray-600">Available: 10:00 AM - 11:00 PM</p>
                  <p className="text-sm text-gray-500 mt-1">For orders and inquiries</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-4 p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xl">✉️</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Email Us</h3>
                  <p className="text-blue-600 font-semibold text-lg mb-1">sales@abkfoodservices.com</p>
                  <p className="text-gray-600">We'll respond within 2-4 hours</p>
                  <p className="text-sm text-gray-500 mt-1">For business inquiries and feedback</p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start space-x-4 p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xl">📍</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Visit Our Kitchen</h3>
                  <p className="text-red-600 font-semibold text-lg mb-1">H501 Indis VB City</p>
                  <p className="text-gray-600">Kompally, Hyderabad</p>
                  <p className="text-sm text-gray-500 mt-1">Pickup orders available</p>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="mt-8 p-6 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl text-white">
              <h3 className="text-2xl font-bold mb-4">Business Hours</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Monday - Sunday</span>
                  <span className="font-semibold">10:00 AM - 11:00 PM</span>
                </div>
                <p className="text-orange-100 text-sm mt-3">
                  We're open every day to serve you fresh, delicious food!
                </p>
              </div>
            </div>
          </div>

          {/* Quick Order Section */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Quick Order</h2>
            
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Ready to Order?</h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3 text-gray-700">
                  <span className="text-green-500">✓</span>
                  <span>Call us directly for the fastest service</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-700">
                  <span className="text-green-500">✓</span>
                  <span>Browse our full menu online</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-700">
                  <span className="text-green-500">✓</span>
                  <span>Pickup ready in 10-15 minutes</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-700">
                  <span className="text-green-500">✓</span>
                  <span>Fresh ingredients, made to order</span>
                </div>
              </div>

              <div className="space-y-4">
                <a
                  href="tel:+918341051124"
                  className="block w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 px-6 rounded-full text-center transition-all duration-300 shadow-lg hover:shadow-green-500/25"
                >
                  📞 Call Now: +91 8341051124
                </a>
                
                <a
                  href="/menu"
                  className="block w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-4 px-6 rounded-full text-center transition-all duration-300 shadow-lg hover:shadow-orange-500/25"
                >
                  🍽️ View Full Menu
                </a>
              </div>
            </div>

            {/* Feedback Section */}
            <div className="mt-8 bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">We Value Your Feedback</h3>
              <p className="text-gray-600 mb-4">
                Your experience matters to us. Let us know how we can serve you better!
              </p>
              <a
                href="mailto:sales@abkfoodservices.com"
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200"
              >
                <span className="mr-2">💌</span>
                Send Feedback via Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}