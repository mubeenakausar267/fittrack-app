import { createBrowserRouter } from "react-router";
import { Dashboard } from "./components/Dashboard";
import { WeeklyMenu } from "./components/WeeklyMenu";
import { WorkoutPlans } from "./components/WorkoutPlans";
import { AISuggestions } from "./components/AISuggestions";
import { Layout } from "./components/Layout";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      Component: Layout,
      children: [
        { index: true, Component: Dashboard },
        { path: "menu", Component: WeeklyMenu },
        { path: "workout", Component: WorkoutPlans },
        { path: "suggestions", Component: AISuggestions },
      ],
    },
  ],
  { basename: "/fittrack-app/" }  // Add this line
);