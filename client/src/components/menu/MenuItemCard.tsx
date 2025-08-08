import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Plus } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import type { MenuItem } from "@/types";

interface MenuItemCardProps {
  item: MenuItem;
  onItemClick?: (item: MenuItem) => void;
}

export function MenuItemCard({ item, onItemClick }: MenuItemCardProps) {
  const [isAdding, setIsAdding] = useState(false);
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering onItemClick
    
    if (!item.isAvailable) return;
    
    setIsAdding(true);
    
    try {
      addItem(item, 1);
      toast({
        title: "Added to cart",
        description: `${item.name} has been added to your cart`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add item to cart",
        variant: "destructive",
      });
    } finally {
      setTimeout(() => setIsAdding(false), 1000);
    }
  };

  return (
    <Card 
      className={`overflow-hidden card-hover cursor-pointer ${!item.isAvailable ? 'opacity-60' : ''}`}
      onClick={() => onItemClick?.(item)}
    >
      <div className="relative">
        <img
          src={item.image || "/placeholder-food.jpg"}
          alt={item.name}
          className="w-full h-48 object-cover"
        />
        {!item.isAvailable && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-semibold">Out of Stock</span>
          </div>
        )}
        <div className="absolute top-3 right-3">
          <Badge variant={item.isVegetarian ? "secondary" : "destructive"}>
            {item.isVegetarian ? "Veg" : "Non-Veg"}
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg font-heading">{item.name}</h3>
        </div>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>
        
        {/* Rating */}
        <div className="flex items-center mb-3">
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{item.rating}</span>
            <span className="text-sm text-gray-500">({item.reviewCount})</span>
          </div>
          <span className="mx-2 text-gray-300">•</span>
          <span className="text-sm text-gray-500">{item.preparationTime} mins</span>
        </div>
        
        {/* Price and Action */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-primary">₹{item.price}</span>
            {item.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ₹{item.originalPrice}
              </span>
            )}
          </div>
          
          <Button
            onClick={handleAddToCart}
            disabled={!item.isAvailable || isAdding}
            className={`transition-all duration-200 ${
              isAdding ? 'bg-green-500 hover:bg-green-600' : ''
            }`}
          >
            {isAdding ? (
              <>
                <Plus className="h-4 w-4 mr-1" />
                Added!
              </>
            ) : (
              "Add to Cart"
            )}
          </Button>
        </div>
        
        {/* Tags */}
        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {item.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
