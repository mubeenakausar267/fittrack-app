import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Save, Plus } from "lucide-react";
import { toast } from "sonner";

interface DayMenu {
  breakfast: string;
  lunch: string;
  dinner: string;
  snacks: string;
}

interface WeeklyMenuData {
  [key: string]: DayMenu;
}

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export function WeeklyMenu() {
  const [menuData, setMenuData] = useState<WeeklyMenuData>({});
  const [activeDay, setActiveDay] = useState("Monday");

  useEffect(() => {
    // Load menu from localStorage
    const saved = localStorage.getItem("weeklyMenu");
    if (saved) {
      setMenuData(JSON.parse(saved));
    } else {
      // Initialize empty menu
      const initialMenu: WeeklyMenuData = {};
      DAYS.forEach((day) => {
        initialMenu[day] = { breakfast: "", lunch: "", dinner: "", snacks: "" };
      });
      setMenuData(initialMenu);
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("weeklyMenu", JSON.stringify(menuData));
    toast.success("Menu saved successfully!");
  };

  const updateMeal = (day: string, meal: keyof DayMenu, value: string) => {
    setMenuData((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [meal]: value,
      },
    }));
  };

  const currentDayMenu = menuData[activeDay] || {
    breakfast: "",
    lunch: "",
    dinner: "",
    snacks: "",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold mb-2">Weekly Menu</h1>
          <p className="text-gray-600">Plan your meals for the week</p>
        </div>
        <Button onClick={handleSave} className="gap-2">
          <Save className="w-4 h-4" />
          Save Menu
        </Button>
      </div>

      {/* Day Selector */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {DAYS.map((day) => (
          <button
            key={day}
            onClick={() => setActiveDay(day)}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
              activeDay === day
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Meal Planning Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Breakfast */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🍳 Breakfast
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="e.g., Oatmeal with berries and nuts"
              value={currentDayMenu.breakfast}
              onChange={(e) => updateMeal(activeDay, "breakfast", e.target.value)}
              className="min-h-[100px]"
            />
          </CardContent>
        </Card>

        {/* Lunch */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🥗 Lunch
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="e.g., Grilled chicken salad with quinoa"
              value={currentDayMenu.lunch}
              onChange={(e) => updateMeal(activeDay, "lunch", e.target.value)}
              className="min-h-[100px]"
            />
          </CardContent>
        </Card>

        {/* Dinner */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🍽️ Dinner
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="e.g., Salmon with roasted vegetables"
              value={currentDayMenu.dinner}
              onChange={(e) => updateMeal(activeDay, "dinner", e.target.value)}
              className="min-h-[100px]"
            />
          </CardContent>
        </Card>

        {/* Snacks */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🍎 Snacks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="e.g., Greek yogurt, almonds, fruit"
              value={currentDayMenu.snacks}
              onChange={(e) => updateMeal(activeDay, "snacks", e.target.value)}
              className="min-h-[100px]"
            />
          </CardContent>
        </Card>
      </div>

      {/* Week Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Week at a Glance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {DAYS.map((day) => {
              const dayMenu = menuData[day] || { breakfast: "", lunch: "", dinner: "", snacks: "" };
              const mealsCount = [
                dayMenu.breakfast,
                dayMenu.lunch,
                dayMenu.dinner,
                dayMenu.snacks,
              ].filter((m) => m.trim()).length;

              return (
                <div
                  key={day}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <span className="font-medium">{day}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">
                      {mealsCount}/4 meals planned
                    </span>
                    <div className="w-24 bg-gray-200 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-blue-600 h-full transition-all"
                        style={{ width: `${(mealsCount / 4) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
