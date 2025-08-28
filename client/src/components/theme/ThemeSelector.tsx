import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Palette } from "lucide-react";

interface Theme {
  id: string;
  name: string;
  className: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  description: string;
}

const themes: Theme[] = [
  {
    id: "premium",
    name: "Premium Purple",
    className: "theme-premium",
    colors: {
      primary: "hsl(258 90% 66%)",
      secondary: "hsl(263 70% 50%)",
      accent: "hsl(270 81% 56%)",
    },
    description: "Elegant and sophisticated",
  },
  {
    id: "gold",
    name: "Elegant Gold",
    className: "theme-gold",
    colors: {
      primary: "hsl(45 100% 55%)",
      secondary: "hsl(35 90% 50%)",
      accent: "hsl(25 85% 58%)",
    },
    description: "Luxurious and premium",
  },
  {
    id: "royal",
    name: "Royal Blue",
    className: "theme-royal",
    colors: {
      primary: "hsl(220 90% 56%)",
      secondary: "hsl(230 85% 50%)",
      accent: "hsl(210 88% 58%)",
    },
    description: "Trust and reliability",
  },
  {
    id: "fresh",
    name: "Fresh Green",
    className: "theme-fresh",
    colors: {
      primary: "hsl(140 85% 45%)",
      secondary: "hsl(150 75% 42%)",
      accent: "hsl(160 80% 48%)",
    },
    description: "Natural and healthy",
  },
  {
    id: "sunset",
    name: "Sunset Orange",
    className: "theme-sunset",
    colors: {
      primary: "hsl(25 95% 58%)",
      secondary: "hsl(15 90% 55%)",
      accent: "hsl(35 88% 60%)",
    },
    description: "Warm and inviting",
  },
  {
    id: "rose",
    name: "Rose Pink",
    className: "theme-rose",
    colors: {
      primary: "hsl(330 85% 60%)",
      secondary: "hsl(320 80% 55%)",
      accent: "hsl(340 88% 62%)",
    },
    description: "Sweet and charming",
  },
  {
    id: "teal",
    name: "Deep Teal",
    className: "theme-teal",
    colors: {
      primary: "hsl(180 85% 45%)",
      secondary: "hsl(190 80% 42%)",
      accent: "hsl(170 88% 48%)",
    },
    description: "Modern and clean",
  },
  {
    id: "luxury",
    name: "Luxurious Black",
    className: "theme-luxury",
    colors: {
      primary: "hsl(0 0% 15%)",
      secondary: "hsl(0 0% 25%)",
      accent: "hsl(45 100% 55%)",
    },
    description: "Bold and sophisticated",
  },
];

interface ThemeSelectorProps {
  onThemeChange?: (theme: Theme) => void;
  className?: string;
}

export function ThemeSelector({ onThemeChange, className }: ThemeSelectorProps) {
  const [selectedTheme, setSelectedTheme] = useState<Theme>(themes[0]);
  const [isOpen, setIsOpen] = useState(false);

  const handleThemeSelect = (theme: Theme) => {
    setSelectedTheme(theme);
    setIsOpen(false);
    
    // Apply theme to document body
    document.body.className = document.body.className
      .replace(/theme-\w+/g, '')
      .concat(` ${theme.className}`);
    
    // Update CSS custom properties
    const root = document.documentElement;
    root.style.setProperty('--primary', theme.colors.primary);
    root.style.setProperty('--secondary', theme.colors.secondary);
    root.style.setProperty('--accent', theme.colors.accent);
    root.style.setProperty('--ring', theme.colors.primary);
    
    onThemeChange?.(theme);
  };

  return (
    <div className={`relative ${className}`}>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="outline"
        size="sm"
        className="flex items-center space-x-2"
      >
        <Palette className="h-4 w-4" />
        <span className="hidden sm:inline">Themes</span>
      </Button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Theme Selector Panel */}
          <div className="absolute right-0 top-full mt-2 z-50 w-80 max-h-96 overflow-y-auto">
            <Card className="shadow-2xl border-2">
              <CardContent className="p-4">
                <h3 className="font-heading font-semibold text-lg mb-4 flex items-center">
                  <Palette className="h-5 w-5 mr-2" />
                  Choose Your Theme
                </h3>
                
                <div className="grid grid-cols-2 gap-3">
                  {themes.map((theme) => (
                    <div
                      key={theme.id}
                      className={`relative cursor-pointer rounded-lg p-3 border-2 transition-all duration-200 hover:scale-105 ${
                        selectedTheme.id === theme.id 
                          ? 'border-primary ring-2 ring-primary/20' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => handleThemeSelect(theme)}
                      style={{
                        background: `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.accent} 100%)`,
                      }}
                    >
                      {selectedTheme.id === theme.id && (
                        <div className="absolute top-1 right-1 bg-white rounded-full p-1">
                          <Check className="h-3 w-3 text-green-600" />
                        </div>
                      )}
                      
                      <div className="text-white">
                        <div className="font-medium text-sm mb-1">{theme.name}</div>
                        <div className="text-xs opacity-90">{theme.description}</div>
                        
                        {/* Color palette preview */}
                        <div className="flex space-x-1 mt-2">
                          <div 
                            className="w-3 h-3 rounded-full border border-white/30"
                            style={{ backgroundColor: theme.colors.primary }}
                          />
                          <div 
                            className="w-3 h-3 rounded-full border border-white/30"
                            style={{ backgroundColor: theme.colors.secondary }}
                          />
                          <div 
                            className="w-3 h-3 rounded-full border border-white/30"
                            style={{ backgroundColor: theme.colors.accent }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 text-xs text-gray-500 text-center">
                  Choose a theme that matches your brand personality
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}