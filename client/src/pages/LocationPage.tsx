export function LocationPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">Location</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Visit our kitchen in Kompally, Hyderabad for fresh pickup orders and experience our quality firsthand.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Location Details */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Find Us Here</h2>
            
            {/* Address Card */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xl">📍</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">ABK Food Services</h3>
                  <p className="text-lg font-semibold text-red-600 mb-1">H501 Indis VB City</p>
                  <p className="text-gray-700 mb-1">Kompally, Hyderabad</p>
                  <p className="text-gray-600">Telangana, India</p>
                </div>
              </div>

              <div className="border-t pt-6">
                <h4 className="text-lg font-bold text-gray-900 mb-4">Getting Here</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-blue-500">🚗</span>
                    <span className="text-gray-700">Ample parking available</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-green-500">🚌</span>
                    <span className="text-gray-700">Well-connected by public transport</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-orange-500">🏪</span>
                    <span className="text-gray-700">Located in Indis VB City complex</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Operating Hours */}
            <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-8 text-white mb-8">
              <h3 className="text-2xl font-bold mb-4">Operating Hours</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Monday - Sunday</span>
                  <span className="font-semibold">10:00 AM - 11:00 PM</span>
                </div>
                <div className="border-t border-white/20 pt-3 mt-4">
                  <p className="text-orange-100">
                    <strong>Pickup Service:</strong> Orders ready in 10-15 minutes
                  </p>
                  <p className="text-orange-100 mt-1">
                    <strong>Call ahead:</strong> +91 8341051124 for faster service
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-4">
              <a
                href="tel:+918341051124"
                className="block w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-full text-center transition-all duration-300 shadow-lg hover:shadow-green-600/25"
              >
                📞 Call for Directions: +91 8341051124
              </a>
              
              <a
                href="https://maps.google.com/?q=H501+Indis+VB+City+Kompally+Hyderabad"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-full text-center transition-all duration-300 shadow-lg hover:shadow-blue-600/25"
              >
                🗺️ Open in Google Maps
              </a>
            </div>
          </div>

          {/* Map and Nearby Landmarks */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Area Information</h2>
            
            {/* Map Placeholder */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <div className="w-full h-64 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl flex items-center justify-center mb-6">
                <div className="text-center">
                  <span className="text-6xl mb-4 block">🗺️</span>
                  <p className="text-gray-600 font-medium">Interactive Map</p>
                  <p className="text-sm text-gray-500">Click "Open in Google Maps" for detailed directions</p>
                </div>
              </div>
              
              <div className="text-center">
                <a
                  href="https://maps.google.com/?q=H501+Indis+VB+City+Kompally+Hyderabad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full transition-all duration-300"
                >
                  <span className="mr-2">🗺️</span>
                  Get Directions
                </a>
              </div>
            </div>

            {/* Nearby Landmarks */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Nearby Landmarks</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <span className="text-2xl">🏢</span>
                  <div>
                    <p className="font-semibold text-gray-900">Indis VB City</p>
                    <p className="text-sm text-gray-600">Commercial Complex</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <span className="text-2xl">🏫</span>
                  <div>
                    <p className="font-semibold text-gray-900">Kompally</p>
                    <p className="text-sm text-gray-600">Residential Area</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <span className="text-2xl">🚌</span>
                  <div>
                    <p className="font-semibold text-gray-900">Public Transport</p>
                    <p className="text-sm text-gray-600">Bus stops nearby</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <span className="text-2xl">🅿️</span>
                  <div>
                    <p className="font-semibold text-gray-900">Parking Available</p>
                    <p className="text-sm text-gray-600">Free parking space</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Visit Us?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Experience the ABK Food Services difference in person. Call ahead to place your order 
            and have it ready for pickup when you arrive!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
            <a
              href="tel:+918341051124"
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-green-500/25"
            >
              📞 Call to Order
            </a>
            <a
              href="/menu"
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-orange-500/25"
            >
              🍽️ View Menu
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}