import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Clock, Truck, Home, Search } from "lucide-react";
import type { OrderStatus, OrderStep } from "@/types";

export function OrderTrackingPage() {
  const [orderNumber, setOrderNumber] = useState("");
  const [trackingData, setTrackingData] = useState<OrderStatus | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Mock order tracking data
  const mockOrderStatus: OrderStatus = {
    id: "1",
    status: "preparing",
    estimatedTime: 25,
    currentStep: 1,
    steps: [
      {
        id: "1",
        title: "Order Confirmed",
        description: "Your order has been received and confirmed",
        timestamp: "2:15 PM",
        isCompleted: true,
        isActive: false,
      },
      {
        id: "2", 
        title: "Preparing",
        description: "Your food is being prepared by our chefs",
        timestamp: "",
        isCompleted: false,
        isActive: true,
      },
      {
        id: "3",
        title: "Out for Delivery",
        description: "Your order is on the way",
        timestamp: "",
        isCompleted: false,
        isActive: false,
      },
      {
        id: "4",
        title: "Delivered",
        description: "Order delivered successfully",
        timestamp: "",
        isCompleted: false,
        isActive: false,
      },
    ],
  };

  const handleTrackOrder = async () => {
    if (!orderNumber.trim()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (orderNumber.toLowerCase().includes("cb123")) {
        setTrackingData(mockOrderStatus);
      } else {
        setTrackingData(null);
      }
      setIsLoading(false);
    }, 1000);
  };

  const getStepIcon = (step: OrderStep) => {
    if (step.isCompleted) {
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    }
    if (step.isActive) {
      return <Clock className="h-5 w-5 text-blue-500" />;
    }
    
    switch (step.id) {
      case "3":
        return <Truck className="h-5 w-5 text-gray-400" />;
      case "4":
        return <Home className="h-5 w-5 text-gray-400" />;
      default:
        return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "preparing":
        return "bg-blue-100 text-blue-800";
      case "ready":
        return "bg-yellow-100 text-yellow-800";
      case "out_for_delivery":
        return "bg-purple-100 text-purple-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="py-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-heading font-bold text-center mb-8">
          Track Your Order
        </h1>
        
        {/* Order Input */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Enter Order ID (e.g., CB1234567)"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  className="pl-10"
                  onKeyPress={(e) => e.key === 'Enter' && handleTrackOrder()}
                />
              </div>
              <Button 
                onClick={handleTrackOrder}
                disabled={isLoading || !orderNumber.trim()}
              >
                {isLoading ? "Tracking..." : "Track Order"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Order Status */}
        {trackingData ? (
          <div className="space-y-6">
            {/* Order Header */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Order #{orderNumber}</CardTitle>
                  <Badge className={getStatusColor(trackingData.status)}>
                    {trackingData.status.charAt(0).toUpperCase() + trackingData.status.slice(1).replace('_', ' ')}
                  </Badge>
                </div>
                {trackingData.estimatedTime && (
                  <p className="text-gray-600">
                    Estimated delivery: {trackingData.estimatedTime} minutes
                  </p>
                )}
              </CardHeader>
            </Card>

            {/* Progress Steps */}
            <Card>
              <CardHeader>
                <CardTitle>Order Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  {/* Progress Line */}
                  <div className="absolute left-6 top-8 h-64 w-0.5 bg-gray-200"></div>
                  
                  <div className="space-y-8">
                    {trackingData.steps.map((step, index) => (
                      <div key={step.id} className="flex items-center relative">
                        <div className={`
                          rounded-full p-3 z-10 border-2 
                          ${step.isCompleted 
                            ? 'bg-green-500 border-green-500' 
                            : step.isActive 
                              ? 'bg-blue-500 border-blue-500' 
                              : 'bg-gray-300 border-gray-300'
                          }
                        `}>
                          {getStepIcon(step)}
                        </div>
                        <div className="ml-4">
                          <h4 className={`font-semibold ${
                            step.isCompleted ? 'text-green-600' : 
                            step.isActive ? 'text-blue-600' : 'text-gray-500'
                          }`}>
                            {step.title}
                          </h4>
                          <p className="text-gray-600 text-sm">{step.description}</p>
                          {step.timestamp && (
                            <p className="text-gray-400 text-xs">{step.timestamp}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Details */}
            <Card>
              <CardHeader>
                <CardTitle>Order Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Margherita Pizza × 1</span>
                    <span>₹299</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Classic Burger × 1</span>
                    <span>₹249</span>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>₹548</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery Fee</span>
                      <span>₹30</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span>₹55</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>₹633</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Support */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button variant="outline" className="w-full">
                <i className="fas fa-phone mr-2"></i>
                Call Support
              </Button>
              <Button variant="outline" className="w-full">
                <i className="fas fa-comment mr-2"></i>
                Chat Support
              </Button>
            </div>
          </div>
        ) : orderNumber && !isLoading ? (
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-gray-400 mb-4">
                <i className="fas fa-search text-4xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">Order not found</h3>
              <p className="text-gray-600">
                Please check your order ID and try again. Order IDs typically start with "CB".
              </p>
            </CardContent>
          </Card>
        ) : null}

        {/* Recent Orders */}
        {!trackingData && (
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Order #CB1234567</h4>
                    <p className="text-sm text-gray-500">March 15, 2024</p>
                    <p className="text-sm">Pizza, Burger</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">₹633</p>
                    <Badge className="bg-green-100 text-green-800">Delivered</Badge>
                  </div>
                </div>
                
                <div className="flex justify-between items-center p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Order #CB1234566</h4>
                    <p className="text-sm text-gray-500">March 12, 2024</p>
                    <p className="text-sm">Biryani, Salad</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">₹498</p>
                    <Badge className="bg-green-100 text-green-800">Delivered</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
