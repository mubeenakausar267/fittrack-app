import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Sparkles, RefreshCw, UtensilsCrossed, Dumbbell, Lightbulb, Globe, Search, Clock, Users } from "lucide-react";

interface Suggestion {
  category: string;
  title: string;
  description: string;
  icon: any;
  color: string;
  cuisine?: string;
  ingredients?: string[];
  fullIngredients?: string[];
  steps?: string[];
  prepTime?: string;
  cookTime?: string;
  servings?: string;
}

export function AISuggestions() {
  const [loading, setLoading] = useState(false);
  const [mealType, setMealType] = useState<"general" | "american" | "indian" | "search">("general");
  const [ingredientInput, setIngredientInput] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState<Suggestion | null>(null);
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
        "Crispy chicken wings or tenders coated in buffalo sauce served with celery, carrots, and ranch dip.",
      icon: UtensilsCrossed,
      color: "from-red-500 to-orange-500",
      cuisine: "American",
      ingredients: ["chicken", "buffalo sauce", "celery", "carrots", "ranch"],
      prepTime: "10 min",
      cookTime: "20 min",
      servings: "4",
      fullIngredients: [
        "1.5 lbs chicken wings or tenders",
        "¾ cup buffalo sauce",
        "2 tbsp butter",
        "3 celery stalks, cut into sticks",
        "3 carrots, cut into sticks",
        "½ cup ranch dip",
        "Salt and pepper to taste",
      ],
      steps: [
        "Preheat oven to 400°F. Pat chicken dry with paper towels.",
        "Season chicken with salt and pepper. Bake for 15-18 minutes until cooked through.",
        "In a bowl, mix buffalo sauce with melted butter.",
        "Toss baked chicken in buffalo sauce mixture until well coated.",
        "Return to oven for 2-3 minutes to caramelize.",
        "Serve with celery, carrots, and ranch dip.",
      ],
    },
    {
      category: "Dinner",
      title: "Southern Fried Chicken",
      description:
        "Golden-fried chicken breast with buttermilk coating, served with collard greens.",
      icon: UtensilsCrossed,
      color: "from-amber-600 to-yellow-500",
      cuisine: "American",
      ingredients: ["chicken", "buttermilk", "flour", "collard greens", "cornbread"],
      prepTime: "15 min",
      cookTime: "25 min",
      servings: "4",
      fullIngredients: [
        "4 chicken breasts",
        "1 cup buttermilk",
        "1 cup all-purpose flour",
        "1 tsp paprika",
        "1 tsp garlic powder",
        "Salt and pepper",
        "Oil for frying",
        "4 cups collard greens",
      ],
      steps: [
        "Marinate chicken in buttermilk for at least 30 minutes (or overnight).",
        "Mix flour with paprika, garlic powder, salt, and pepper in a shallow bowl.",
        "Heat oil in a deep skillet to 350°F.",
        "Coat each chicken piece in flour mixture, shaking off excess.",
        "Fry for 6-7 minutes per side until golden brown and internal temp reaches 165°F.",
        "Drain on paper towels. Serve with collard greens.",
      ],
    },
    {
      category: "Lunch",
      title: "Grilled Chicken Sandwich",
      description:
        "Grilled chicken breast on whole wheat bread with lettuce, tomato, and avocado.",
      icon: UtensilsCrossed,
      color: "from-green-600 to-emerald-500",
      cuisine: "American",
      ingredients: ["chicken", "bread", "lettuce", "tomato", "avocado"],
      prepTime: "5 min",
      cookTime: "10 min",
      servings: "2",
      fullIngredients: [
        "2 chicken breasts (½ lb)",
        "2 tbsp olive oil",
        "1 tsp Italian seasoning",
        "2 whole wheat bread slices",
        "2 lettuce leaves",
        "1 tomato, sliced",
        "½ avocado, sliced",
        "1 tbsp mayo",
        "Salt and pepper",
      ],
      steps: [
        "Season chicken breasts with Italian seasoning, salt, and pepper.",
        "Heat olive oil in a grill pan over medium-high heat.",
        "Grill chicken for 5-6 minutes per side until cooked through.",
        "Let rest for 2 minutes, then slice into strips.",
        "Toast bread lightly. Spread mayo on bread.",
        "Layer lettuce, tomato, chicken, and avocado.",
        "Close sandwich and serve immediately.",
      ],
    },
    {
      category: "Dinner",
      title: "Chicken Fried Rice",
      description:
        "Stir-fried chicken with brown rice, mixed vegetables, eggs, and soy sauce.",
      icon: UtensilsCrossed,
      color: "from-amber-500 to-orange-600",
      cuisine: "American",
      ingredients: ["chicken", "rice", "eggs", "vegetables", "soy sauce"],
      prepTime: "10 min",
      cookTime: "15 min",
      servings: "4",
      fullIngredients: [
        "1 lb chicken breast, diced",
        "3 cups cooked brown rice (day old)",
        "2 eggs, beaten",
        "1 cup mixed vegetables (peas, carrots, corn)",
        "3 tbsp low-sodium soy sauce",
        "2 tbsp vegetable oil",
        "2 cloves garlic, minced",
        "½ tsp ginger",
        "Green onions for garnish",
      ],
      steps: [
        "Heat 1 tbsp oil in a wok or large skillet over high heat.",
        "Cook diced chicken until golden, about 5-7 minutes. Remove and set aside.",
        "Add remaining oil, scramble eggs, and set aside.",
        "Stir-fry garlic and ginger for 30 seconds.",
        "Add rice, breaking up clumps, and stir-fry for 3 minutes.",
        "Add vegetables, chicken, and eggs back in.",
        "Pour soy sauce over and toss well for 2 minutes.",
        "Garnish with green onions and serve hot.",
      ],
    },
  ];

  // Indian Chicken Meals
  const indianChickenSuggestions: Suggestion[] = [
    {
      category: "Dinner",
      title: "Butter Chicken (Murgh Makhani)",
      description:
        "Tender chicken in a creamy tomato-based sauce with butter and cream. Serve with brown rice or naan.",
      icon: UtensilsCrossed,
      color: "from-orange-500 to-red-600",
      cuisine: "Indian",
      ingredients: ["chicken", "butter", "cream", "tomato", "rice", "naan"],
      prepTime: "15 min",
      cookTime: "30 min",
      servings: "4",
      fullIngredients: [
        "1.5 lbs chicken breast, cubed",
        "4 tbsp butter",
        "½ cup heavy cream",
        "1 can (15 oz) tomato sauce",
        "2 tbsp tomato paste",
        "1 tbsp garam masala",
        "1 tsp turmeric",
        "1 tbsp paprika",
        "3 cloves garlic, minced",
        "1 tbsp ginger, minced",
        "1 onion, diced",
        "Salt and pepper to taste",
      ],
      steps: [
        "Heat 2 tbsp butter in a large pan. Sauté onion, garlic, and ginger until fragrant.",
        "Add chicken cubes and cook until golden on all sides (about 8 minutes). Remove chicken.",
        "Add remaining butter and tomato paste to the pan. Cook for 1 minute.",
        "Add tomato sauce, garam masala, turmeric, and paprika. Stir well.",
        "Return chicken to the pan. Simmer for 15 minutes until cooked through.",
        "Stir in heavy cream and cook for 2 more minutes.",
        "Season with salt and pepper. Serve over rice or with naan.",
      ],
    },
    {
      category: "Dinner",
      title: "Chicken Tikka Masala",
      description:
        "Marinated chicken cooked in tandoor-style, served in a smooth coconut curry sauce.",
      icon: UtensilsCrossed,
      color: "from-red-500 to-pink-600",
      cuisine: "Indian",
      ingredients: ["chicken", "yogurt", "coconut", "cumin", "garam masala", "tomato"],
      prepTime: "20 min",
      cookTime: "25 min",
      servings: "4",
      fullIngredients: [
        "1.5 lbs chicken breast, cut into chunks",
        "1 cup Greek yogurt",
        "2 tbsp garam masala",
        "1 tbsp cumin",
        "1 tsp chili powder",
        "1 can (14 oz) coconut milk",
        "1 can (15 oz) tomato sauce",
        "3 cloves garlic, minced",
        "1 tbsp ginger, minced",
        "2 tbsp oil",
        "Salt to taste",
      ],
      steps: [
        "Mix yogurt with 1 tbsp garam masala, cumin, chili powder. Marinate chicken for 15 minutes.",
        "Heat oil in a large pan. Sauté garlic and ginger for 30 seconds.",
        "Add marinated chicken and cook for 8-10 minutes until cooked through.",
        "Add tomato sauce and remaining garam masala. Simmer for 5 minutes.",
        "Stir in coconut milk and simmer for 5 more minutes.",
        "Adjust seasonings and serve with rice.",
      ],
    },
    {
      category: "Lunch",
      title: "Tandoori Grilled Chicken",
      description:
        "Chicken marinated in yogurt and tandoori spices, then grilled to perfection.",
      icon: UtensilsCrossed,
      color: "from-amber-600 to-orange-500",
      cuisine: "Indian",
      ingredients: ["chicken", "yogurt", "tandoori spice", "cucumber", "lime"],
      prepTime: "15 min",
      cookTime: "15 min",
      servings: "4",
      fullIngredients: [
        "4 chicken breasts (1.5 lbs)",
        "1 cup Greek yogurt",
        "2 tbsp tandoori spice mix",
        "1 tbsp lemon juice",
        "1 tbsp ginger-garlic paste",
        "1 tsp turmeric",
        "Salt to taste",
        "Oil for grilling",
        "1 cucumber, sliced (for raita)",
        "Fresh cilantro",
      ],
      steps: [
        "Mix yogurt with tandoori spice, lemon juice, ginger-garlic paste, and turmeric.",
        "Coat chicken with marinade. Let sit for at least 15 minutes (or up to 4 hours).",
        "Preheat grill to medium-high. Oil the grates.",
        "Grill chicken for 6-7 minutes per side until fully cooked and charred.",
        "Let rest for 5 minutes. Serve with cucumber raita and lime wedges.",
      ],
    },
    {
      category: "Dinner",
      title: "Spiced Chicken Curry",
      description:
        "Tender chicken cooked in a rich curry sauce with turmeric and coriander.",
      icon: UtensilsCrossed,
      color: "from-yellow-600 to-orange-600",
      cuisine: "Indian",
      ingredients: ["chicken", "turmeric", "coriander", "rice", "onion", "garlic"],
      prepTime: "10 min",
      cookTime: "25 min",
      servings: "4",
      fullIngredients: [
        "1.5 lbs chicken breast, cut into bite-size pieces",
        "2 tbsp oil",
        "2 onions, diced",
        "4 cloves garlic, minced",
        "1 tbsp ginger, minced",
        "2 tsp turmeric",
        "1 tsp coriander",
        "1 tsp cumin",
        "1 can (14 oz) coconut milk",
        "1 cup chicken broth",
        "2 tomatoes, diced",
        "Salt and pepper to taste",
      ],
      steps: [
        "Heat oil in a large pot. Sauté onions until golden.",
        "Add garlic and ginger, cook for 1 minute.",
        "Add turmeric, coriander, and cumin. Toast spices for 30 seconds.",
        "Add chicken and cook until no longer pink (5-7 minutes).",
        "Pour in coconut milk and broth. Add tomatoes.",
        "Simmer for 15 minutes until chicken is tender. Season with salt and pepper.",
        "Serve with basmati rice or naan.",
      ],
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
              <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
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
                  <p className="text-gray-600 text-sm mb-4">{suggestion.description}</p>
                  {suggestion.prepTime && (
                    <div className="flex gap-4 text-xs text-gray-600 mb-4">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{suggestion.prepTime} prep</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{suggestion.cookTime} cook</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{suggestion.servings} servings</span>
                      </div>
                    </div>
                  )}
                  <Button
                    onClick={() => setSelectedRecipe(suggestion)}
                    variant="outline"
                    className="w-full"
                  >
                    View Full Recipe
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Recipe Detail Modal */}
      {selectedRecipe && (
        <Card className="bg-gradient-to-br from-slate-50 to-slate-100 border-2 border-blue-300">
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-lg bg-gradient-to-br ${selectedRecipe.color} flex items-center justify-center`}
                >
                  <UtensilsCrossed className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl">{selectedRecipe.title}</CardTitle>
                  <p className="text-sm text-gray-600">{selectedRecipe.cuisine} Cuisine</p>
                </div>
              </div>
              <Button
                onClick={() => setSelectedRecipe(null)}
                variant="outline"
                className="text-lg"
              >
                ✕
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Quick Info */}
            <div className="flex gap-6 bg-white p-4 rounded-lg">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-xs text-gray-600">Prep Time</p>
                  <p className="font-semibold">{selectedRecipe.prepTime}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-xs text-gray-600">Cook Time</p>
                  <p className="font-semibold">{selectedRecipe.cookTime}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="text-xs text-gray-600">Servings</p>
                  <p className="font-semibold">{selectedRecipe.servings}</p>
                </div>
              </div>
            </div>

            {/* Ingredients */}
            {selectedRecipe.fullIngredients && (
              <div className="bg-white p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-3 text-gray-900">Ingredients</h3>
                <ul className="space-y-2">
                  {selectedRecipe.fullIngredients.map((ingredient, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-gray-700">
                      <input
                        type="checkbox"
                        className="mt-1 w-4 h-4 cursor-pointer"
                        id={`ingredient-${idx}`}
                      />
                      <label htmlFor={`ingredient-${idx}`} className="cursor-pointer flex-1">
                        {ingredient}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Cooking Steps */}
            {selectedRecipe.steps && (
              <div className="bg-white p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-3 text-gray-900">Cooking Steps</h3>
                <ol className="space-y-3">
                  {selectedRecipe.steps.map((step, idx) => (
                    <li key={idx} className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-semibold">
                        {idx + 1}
                      </span>
                      <p className="text-gray-700 pt-1">{step}</p>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            <Button
              onClick={() => setSelectedRecipe(null)}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Close Recipe
            </Button>
          </CardContent>
        </Card>
      )}

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
