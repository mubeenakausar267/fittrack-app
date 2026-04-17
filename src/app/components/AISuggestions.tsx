import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Sparkles, RefreshCw, UtensilsCrossed, Dumbbell, Lightbulb } from "lucide-react";

interface Suggestion {
  category: string;
  title: string;
  description: string;
  icon: any;
  color: string;
}

export function AISuggestions() {
  const [loading, setLoading] = useState(false);

  // Mock AI suggestions
  const mealSuggestions: Suggestion[] = [
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
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <UtensilsCrossed className="w-5 h-5" />
          Meal Suggestions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mealSuggestions.map((suggestion, index) => {
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
