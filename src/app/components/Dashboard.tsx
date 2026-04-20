import { Link } from "react-router-dom";
import { UtensilsCrossed, Dumbbell, Sparkles, Calendar, TrendingUp, ShoppingCart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";

interface WeekStats {
  mealsPlanned: number;
  workoutsCompleted: number;
  totalWorkouts: number;
}

export function Dashboard() {
  const [stats, setStats] = useState<WeekStats>({
    mealsPlanned: 0,
    workoutsCompleted: 0,
    totalWorkouts: 0,
  });

  useEffect(() => {
    // Load stats from localStorage
    const menuData = localStorage.getItem("weeklyMenu");
    const workoutData = localStorage.getItem("workoutPlans");

    let mealsPlanned = 0;
    if (menuData) {
      const menu = JSON.parse(menuData);
      Object.values(menu).forEach((day: any) => {
        if (day.breakfast) mealsPlanned++;
        if (day.lunch) mealsPlanned++;
        if (day.dinner) mealsPlanned++;
        if (day.snacks) mealsPlanned++;
      });
    }

    let workoutsCompleted = 0;
    let totalWorkouts = 0;
    if (workoutData) {
      const workouts = JSON.parse(workoutData);
      totalWorkouts = workouts.length;
      workoutsCompleted = workouts.filter((w: any) => w.completed).length;
    }

    setStats({ mealsPlanned, workoutsCompleted, totalWorkouts });
  }, []);

  const quickActions = [
    {
      title: "Plan Your Menu",
      description: "Set up your weekly meal plan",
      icon: UtensilsCrossed,
      link: "/menu",
      color: "from-orange-500 to-red-500",
    },
    {
      title: "Track Workouts",
      description: "Log your exercise routines",
      icon: Dumbbell,
      link: "/workout",
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Get AI Tips",
      description: "Personalized suggestions",
      icon: Sparkles,
      link: "/suggestions",
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Grocery List",
      description: "Organize your weekly shopping",
      icon: ShoppingCart,
      link: "/grocery",
      color: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold mb-2">Dashboard</h1>
        <p className="text-gray-600">Track your fitness and nutrition journey</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Meals Planned
            </CardTitle>
            <Calendar className="w-4 h-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{stats.mealsPlanned}</div>
            <p className="text-xs text-gray-500 mt-1">This week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Workouts
            </CardTitle>
            <TrendingUp className="w-4 h-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">
              {stats.workoutsCompleted}/{stats.totalWorkouts}
            </div>
            <p className="text-xs text-gray-500 mt-1">Completed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Weekly Progress
            </CardTitle>
            <Sparkles className="w-4 h-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">
              {stats.totalWorkouts > 0
                ? Math.round((stats.workoutsCompleted / stats.totalWorkouts) * 100)
                : 0}
              %
            </div>
            <p className="text-xs text-gray-500 mt-1">Completion rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Card key={action.link} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center mb-3`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">{action.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm mb-4">{action.description}</p>
                  <Link to={action.link}>
                    <Button className="w-full">Get Started</Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
