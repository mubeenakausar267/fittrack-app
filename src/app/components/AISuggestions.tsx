import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Sparkles, RefreshCw, UtensilsCrossed, Dumbbell, Lightbulb, Globe, Search } from "lucide-react";

interface Suggestion {
  category: string;
  title: string;
  description: string;
  icon: any;
  color: string;
  cuisine?: string;
  ingredients?: string[];
}

export function AISuggestions() {
  const [loading, setLoading] = useState(false);
  const [mealType, setMealType] = useState<"general" | "american" | "indian" | "search">("general");
  const [ingredientInput, setIngredientInput] = useState("");
  const [suggestedRecipes, setSuggestedRecipes] = useState<Suggestion[]>([]);

  // Mock AI suggestions - General meals
  const generalMealSuggestions: Suggestion[] = [
    {
      category: "Breakfast",
      title: "Protein-Packed Morning",
      description:
        "Try Greek yogurt parfait with granola, berries, and a drizzle of honey. Rich in protein and antioxidants to start your day strong.",
      icon: UtensilsCrossed,
      color: "from-orange-500 to-red-500",
    },
    {
      category: "Lunch",
      title: "Mediterranean Bowl",
      description:
        "Quinoa bowl with grilled chicken, chickpeas, cucumber, tomatoes, feta cheese, and tahini dressing. Balanced macros for sustained energy.",
      icon: UtensilsCrossed,
      color: "from-green-500 to-emerald-500",
    },
    {
      category: "Dinner",
      title: "Lean & Green",
      description:
        "Baked salmon with roasted Brussels sprouts and sweet potato. High in omega-3s and fiber for optimal recovery and health.",
      icon: UtensilsCrossed,
      color: "from-blue-500 to-cyan-500",
    },
    {
      category: "Snack",
      title: "Smart Snacking",
      description:
        "Apple slices with almond butter and a handful of walnuts. Perfect combination of complex carbs, healthy fats, and protein.",
      icon: UtensilsCrossed,
      color: "from-purple-500 to-pink-500",
    },
  ];

  // American Chicken Meals
  const americanChickenSuggestions: Suggestion[] = [
    {
      category: "Lunch",
      title: "Spicy Buffalo Chicken",
      description:
        "Crispy chicken wings or tenders coated in buffalo sauce served with celery, carrots, and ranch dip. High in protein with bold flavors. Pairs well with sweet potato fries.",
      icon: UtensilsCrossed,
      color: "from-red-500 to-orange-500",
      cuisine: "American",
      ingredients: ["chicken", "buffalo sauce", "celery", "carrots", "ranch"],
    },
    {
      category: "Dinner",
      title: "Southern Fried Chicken",
      description:
        "Golden-fried chicken breast with buttermilk coating, served with collard greens and cornbread. A classic comfort meal that's protein-rich and satisfying.",
      icon: UtensilsCrossed,
      color: "from-amber-600 to-yellow-500",
      cuisine: "American",
      ingredients: ["chicken", "buttermilk", "flour", "collard greens", "cornbread"],
    },
    {
      category: "Lunch",
      title: "Grilled Chicken Sandwich",
      description:
        "Grilled chicken breast on whole wheat bread with lettuce, tomato, and avocado. Light yet filling option with healthy fats and lean protein.",
      icon: UtensilsCrossed,
      color: "from-green-600 to-emerald-500",
      cuisine: "American",
      ingredients: ["chicken", "bread", "lettuce", "tomato", "avocado"],
    },
    {
      category: "Dinner",
      title: "Chicken Fried Rice",
      description:
        "Stir-fried chicken with brown rice, mixed vegetables, eggs, and low-sodium soy sauce. Quick to prepare and loaded with balanced macros.",
      icon: UtensilsCrossed,
      color: "from-amber-500 to-orange-600",
      cuisine: "American",
      ingredients: ["chicken", "rice", "eggs", "vegetables", "soy sauce"],
    },
    {
      category: "Dinner",
      title: "BBQ Grilled Chicken",
      description:
        "Marinated chicken breast grilled to perfection with sugar-free BBQ sauce. Serve with quinoa and roasted vegetables for a complete meal.",
      icon: UtensilsCrossed,
      color: "from-orange-600 to-red-600",
      cuisine: "American",
      ingredients: ["chicken", "bbq sauce", "quinoa", "vegetables"],
    },
    {
      category: "Snack",
      title: "Chicken Tenders with Hummus",
      description:
        "Baked chicken tenders (healthier than fried) served with hummus or Greek yogurt dip. Great high-protein snack or meal prep option.",
      icon: UtensilsCrossed,
      color: "from-blue-500 to-cyan-500",
      cuisine: "American",
      ingredients: ["chicken", "hummus", "yogurt"],
    },
  ];

  // Indian Chicken Meals
  const indianChickenSuggestions: Suggestion[] = [
    {
      category: "Dinner",
      title: "Butter Chicken (Murgh Makhani)",
      description:
        "Tender chicken in a creamy tomato-based sauce with butter and cream. Serve with brown rice or naan. Rich in flavor with moderate spice levels.",
      icon: UtensilsCrossed,
      color: "from-orange-500 to-red-600",
      cuisine: "Indian",
      ingredients: ["chicken", "butter", "cream", "tomato", "rice", "naan"],
    },
    {
      category: "Dinner",
      title: "Chicken Tikka Masala",
      description:
        "Marinated chicken cooked in tandoor-style oven, served in a smooth coconut curry sauce. High protein with aromatic Indian spices like cumin and garam masala.",
      icon: UtensilsCrossed,
      color: "from-red-500 to-pink-600",
      cuisine: "Indian",
      ingredients: ["chicken", "yogurt", "coconut", "cumin", "garam masala", "tomato"],
    },
    {
      category: "Lunch",
      title: "Tandoori Grilled Chicken",
      description:
        "Chicken marinated in yogurt and tandoori spices, then grilled to perfection. Lean protein option with bold Indian flavors. Serve with cucumber raita.",
      icon: UtensilsCrossed,
      color: "from-amber-600 to-orange-500",
      cuisine: "Indian",
      ingredients: ["chicken", "yogurt", "tandoori spice", "cucumber", "lime"],
    },
    {
      category: "Dinner",
      title: "Spiced Chicken Curry",
      description:
        "Tender chicken cooked in a rich curry sauce with turmeric, coriander, and fenugreek. Serve with basmati rice or roti. Packed with anti-inflammatory spices.",
      icon: UtensilsCrossed,
      color: "from-yellow-600 to-orange-600",
      cuisine: "Indian",
      ingredients: ["chicken", "turmeric", "coriander", "rice", "onion", "garlic"],
    },
    {
      category: "Lunch",
      title: "Chicken Biryani",
      description:
        "Aromatic rice layered with spiced chicken, then slow-cooked together. Complete meal with carbs and protein in one dish. Flavored with saffron and cardamom.",
      icon: UtensilsCrossed,
      color: "from-amber-500 to-yellow-600",
      cuisine: "Indian",
      ingredients: ["chicken", "rice", "saffron", "cardamom", "onion", "yogurt"],
    },
    {
      category: "Dinner",
      title: "Chettinad Chicken Pepper Fry",
      description:
        "Chicken cooked with black pepper, coconut, and Indian spices. Dry preparation with intense flavors and minimal sauce. High protein, low carb option.",
      icon: UtensilsCrossed,
      color: "from-gray-700 to-orange-700",
      cuisine: "Indian",
      ingredients: ["chicken", "black pepper", "coconut", "curry leaves", "onion"],
    },
  ];

  const workoutSuggestions: Suggestion[] = [
    {
      category: "Strength",
      title: "Upper Body Power",
      description:
        "Focus on compound movements: Bench press (4×8), Pull-ups (3×10), Overhead press (3×10), Dumbbell rows (3×12). Rest 90 seconds between sets.",
      icon: Dumbbell,
      color: "from-red-500 to-orange-500",
    },
    {
      category: "Cardio",
      title: "HIIT Session",
      description:
        "20-minute high-intensity interval training: 30 seconds sprint, 30 seconds rest. Repeat 20 times. Great for fat burning and cardiovascular health.",
      icon: Dumbbell,
      color: "from-yellow-500 to-orange-500",
    },
    {
      category: "Recovery",
      title: "Active Recovery Day",
      description:
        "Light yoga or stretching for 30 minutes, followed by a 20-minute walk. Focus on mobility and flexibility to prevent injury.",
      icon: Dumbbell,
      color: "from-teal-500 to-green-500",
    },
    {
      category: "Lower Body",
      title: "Leg Day Strength",
      description:
        "Squats (4×10), Romanian deadlifts (3×12), Lunges (3×10 each leg), Leg press (3×15). Build strong foundation with progressive overload.",
      icon: Dumbbell,
      color: "from-indigo-500 to-purple-500",
    },
  ];

  const lifestyleTips: Suggestion[] = [
    {
      category: "Hydration",
      title: "Water Intake Goal",
      description:
        "Aim for 8-10 glasses of water daily. Start your day with a glass of water and keep a bottle with you during workouts.",
      icon: Lightbulb,
      color: "from-blue-400 to-cyan-400",
    },
    {
      category: "Sleep",
      title: "Recovery Through Rest",
      description:
        "Target 7-9 hours of quality sleep. Establish a bedtime routine: no screens 1 hour before bed, keep room cool and dark.",
      icon: Lightbulb,
      color: "from-purple-400 to-indigo-400",
    },
    {
      category: "Consistency",
      title: "Weekly Planning",
      description:
        "Plan your meals and workouts on Sunday. Prep ingredients in advance to save time and stay on track throughout the week.",
      icon: Lightbulb,
      color: "from-green-400 to-emerald-400",
    },
  ];

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  // Get meals based on selected type
  const getMealSuggestions = () => {
    switch (mealType) {
      case "american":
        return americanChickenSuggestions;
      case "indian":
        return indianChickenSuggestions;
      default:
        return generalMealSuggestions;
    }
  };

  // Search recipes by ingredients
  const searchRecipesByIngredients = (ingredientStr: string) => {
    if (!ingredientStr.trim()) {
      setSuggestedRecipes([]);
      return;
    }

    const ingredients = ingredientStr
      .toLowerCase()
      .split(",")
      .map((ing) => ing.trim())
      .filter((ing) => ing.length > 0);

    // Combine all recipes
    const allRecipes = [...americanChickenSuggestions, ...indianChickenSuggestions];

    // Find matching recipes
    const matchedRecipes = allRecipes.filter((recipe) => {
      if (!recipe.ingredients) return false;
      return ingredients.some((ing) =>
        recipe.ingredients!.some((recipeIng) => recipeIng.toLowerCase().includes(ing))
      );
    });

    // Separate by cuisine
    const americanMatches = matchedRecipes.filter((r) => r.cuisine === "American");
    const indianMatches = matchedRecipes.filter((r) => r.cuisine === "Indian");

    // Take 2 from each cuisine
    const suggestions = [...americanMatches.slice(0, 2), ...indianMatches.slice(0, 2)];
    setSuggestedRecipes(suggestions);
  };

  const currentMeals = mealType === "search" ? suggestedRecipes : getMealSuggestions();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold mb-2">AI Suggestions</h1>
          <p className="text-gray-600">Personalized recommendations for your fitness journey</p>
        </div>
        <Button onClick={handleRefresh} variant="outline" className="gap-2" disabled={loading}>
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {/* Meal Suggestions */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <UtensilsCrossed className="w-5 h-5" />
            Meal Suggestions
          </h2>
        </div>

        {/* Meal Type Selector */}
        <div className="flex gap-2 mb-6 flex-wrap">
          <Button
            onClick={() => setMealType("general")}
            variant={mealType === "general" ? "default" : "outline"}
            className="gap-2"
          >
            General Meals
          </Button>
          <Button
            onClick={() => setMealType("american")}
            variant={mealType === "american" ? "default" : "outline"}
            className="gap-2"
          >
            <Globe className="w-4 h-4" />
            American Chicken
          </Button>
          <Button
            onClick={() => setMealType("indian")}
            variant={mealType === "indian" ? "default" : "outline"}
            className="gap-2"
          >
            <Globe className="w-4 h-4" />
            Indian Chicken
          </Button>
          <Button
            onClick={() => setMealType("search")}
            variant={mealType === "search" ? "default" : "outline"}
            className="gap-2"
          >
            <Search className="w-4 h-4" />
            Search by Ingredients
          </Button>
        </div>

        {/* Ingredient Search */}
        {mealType === "search" && (
          <Card className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardContent className="pt-6">
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700">
                  Enter ingredients (comma-separated)
                </label>
                <div className="flex gap-2">
                  <Input
                    placeholder="e.g., chicken, rice, tomato, yogurt"
                    value={ingredientInput}
                    onChange={(e) => setIngredientInput(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    onClick={() => searchRecipesByIngredients(ingredientInput)}
                    className="gap-2"
                  >
                    <Search className="w-4 h-4" />
                    Search
                  </Button>
                </div>
                <p className="text-xs text-gray-600">
                  💡 Tip: Returns 2 Indian + 2 American recipes based on your ingredients
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentMeals.map((suggestion, index) => {
            const Icon = suggestion.icon;
            return (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className={`w-10 h-10 rounded-lg bg-gradient-to-br ${suggestion.color} flex items-center justify-center`}
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <span className="text-xs text-gray-500 uppercase tracking-wide">
                        {suggestion.category}
                        {suggestion.cuisine && ` • ${suggestion.cuisine}`}
                      </span>
                      <CardTitle className="text-lg">{suggestion.title}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">{suggestion.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Workout Suggestions */}
      <div>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Dumbbell className="w-5 h-5" />
          Workout Suggestions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {workoutSuggestions.map((suggestion, index) => {
            const Icon = suggestion.icon;
            return (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className={`w-10 h-10 rounded-lg bg-gradient-to-br ${suggestion.color} flex items-center justify-center`}
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <span className="text-xs text-gray-500 uppercase tracking-wide">
                        {suggestion.category}
                      </span>
                      <CardTitle className="text-lg">{suggestion.title}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">{suggestion.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Lifestyle Tips */}
      <div>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5" />
          Lifestyle Tips
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {lifestyleTips.map((tip, index) => {
            const Icon = tip.icon;
            return (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className={`w-10 h-10 rounded-lg bg-gradient-to-br ${tip.color} flex items-center justify-center`}
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <span className="text-xs text-gray-500 uppercase tracking-wide">
                        {tip.category}
                      </span>
                      <CardTitle className="text-base">{tip.title}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">{tip.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Info Card */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-blue-600 mt-1" />
            <div>
              <h3 className="font-medium text-gray-900 mb-1">
                AI-Powered Personalization
              </h3>
              <p className="text-sm text-gray-600">
                These suggestions are generated based on common fitness and nutrition best
                practices. For truly personalized recommendations, consider connecting to a backend
                service that can analyze your specific goals, preferences, and progress over time.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
