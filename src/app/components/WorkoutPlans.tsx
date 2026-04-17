import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Plus, Trash2, Dumbbell, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

interface Exercise {
  name: string;
  sets: string;
  reps: string;
  notes: string;
}

interface Workout {
  id: string;
  day: string;
  title: string;
  exercises: Exercise[];
  completed: boolean;
}

export function WorkoutPlans() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newWorkout, setNewWorkout] = useState({
    day: "Monday",
    title: "",
    exercises: [{ name: "", sets: "", reps: "", notes: "" }],
  });

  useEffect(() => {
    const saved = localStorage.getItem("workoutPlans");
    if (saved) {
      setWorkouts(JSON.parse(saved));
    }
  }, []);

  const saveWorkouts = (updatedWorkouts: Workout[]) => {
    setWorkouts(updatedWorkouts);
    localStorage.setItem("workoutPlans", JSON.stringify(updatedWorkouts));
  };

  const addWorkout = () => {
    if (!newWorkout.title.trim()) {
      toast.error("Please enter a workout title");
      return;
    }

    const workout: Workout = {
      id: Date.now().toString(),
      day: newWorkout.day,
      title: newWorkout.title,
      exercises: newWorkout.exercises.filter((e) => e.name.trim()),
      completed: false,
    };

    saveWorkouts([...workouts, workout]);
    setNewWorkout({
      day: "Monday",
      title: "",
      exercises: [{ name: "", sets: "", reps: "", notes: "" }],
    });
    setIsDialogOpen(false);
    toast.success("Workout added successfully!");
  };

  const deleteWorkout = (id: string) => {
    saveWorkouts(workouts.filter((w) => w.id !== id));
    toast.success("Workout deleted");
  };

  const toggleComplete = (id: string) => {
    saveWorkouts(
      workouts.map((w) => (w.id === id ? { ...w, completed: !w.completed } : w))
    );
  };

  const addExercise = () => {
    setNewWorkout({
      ...newWorkout,
      exercises: [...newWorkout.exercises, { name: "", sets: "", reps: "", notes: "" }],
    });
  };

  const updateExercise = (index: number, field: keyof Exercise, value: string) => {
    const updatedExercises = [...newWorkout.exercises];
    updatedExercises[index][field] = value;
    setNewWorkout({ ...newWorkout, exercises: updatedExercises });
  };

  const removeExercise = (index: number) => {
    setNewWorkout({
      ...newWorkout,
      exercises: newWorkout.exercises.filter((_, i) => i !== index),
    });
  };

  const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold mb-2">Workout Plans</h1>
          <p className="text-gray-600">Track your weekly exercise routines</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Add Workout
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Workout</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <Label>Day</Label>
                <select
                  value={newWorkout.day}
                  onChange={(e) => setNewWorkout({ ...newWorkout, day: e.target.value })}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
                >
                  {DAYS.map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label>Workout Title</Label>
                <Input
                  placeholder="e.g., Upper Body Strength"
                  value={newWorkout.title}
                  onChange={(e) => setNewWorkout({ ...newWorkout, title: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Exercises</Label>
                  <Button size="sm" variant="outline" onClick={addExercise}>
                    <Plus className="w-4 h-4 mr-1" />
                    Add Exercise
                  </Button>
                </div>

                {newWorkout.exercises.map((exercise, index) => (
                  <Card key={index}>
                    <CardContent className="pt-4">
                      <div className="space-y-3">
                        <div className="flex items-start gap-2">
                          <div className="flex-1">
                            <Label className="text-xs">Exercise Name</Label>
                            <Input
                              placeholder="e.g., Bench Press"
                              value={exercise.name}
                              onChange={(e) => updateExercise(index, "name", e.target.value)}
                              className="mt-1"
                            />
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removeExercise(index)}
                            className="mt-5"
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <Label className="text-xs">Sets</Label>
                            <Input
                              placeholder="3"
                              value={exercise.sets}
                              onChange={(e) => updateExercise(index, "sets", e.target.value)}
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label className="text-xs">Reps</Label>
                            <Input
                              placeholder="10-12"
                              value={exercise.reps}
                              onChange={(e) => updateExercise(index, "reps", e.target.value)}
                              className="mt-1"
                            />
                          </div>
                        </div>
                        <div>
                          <Label className="text-xs">Notes</Label>
                          <Input
                            placeholder="Optional notes"
                            value={exercise.notes}
                            onChange={(e) => updateExercise(index, "notes", e.target.value)}
                            className="mt-1"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Button onClick={addWorkout} className="w-full">
                Add Workout
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Workouts List */}
      {workouts.length === 0 ? (
        <Card className="p-12 text-center">
          <Dumbbell className="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No workouts yet</h3>
          <p className="text-gray-600 mb-4">Start by adding your first workout plan</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {DAYS.map((day) => {
            const dayWorkouts = workouts.filter((w) => w.day === day);
            if (dayWorkouts.length === 0) return null;

            return (
              <div key={day}>
                <h2 className="text-xl font-semibold mb-3">{day}</h2>
                <div className="space-y-3">
                  {dayWorkouts.map((workout) => (
                    <Card
                      key={workout.id}
                      className={workout.completed ? "bg-green-50 border-green-200" : ""}
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <Checkbox
                              checked={workout.completed}
                              onCheckedChange={() => toggleComplete(workout.id)}
                            />
                            <div>
                              <CardTitle
                                className={workout.completed ? "line-through text-gray-500" : ""}
                              >
                                {workout.title}
                              </CardTitle>
                              <p className="text-sm text-gray-600 mt-1">
                                {workout.exercises.length} exercise
                                {workout.exercises.length !== 1 ? "s" : ""}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {workout.completed && (
                              <CheckCircle2 className="w-5 h-5 text-green-600" />
                            )}
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => deleteWorkout(workout.id)}
                            >
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {workout.exercises.map((exercise, index) => (
                            <div
                              key={index}
                              className="p-3 bg-white rounded border border-gray-200"
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-medium">{exercise.name}</span>
                                <span className="text-sm text-gray-600">
                                  {exercise.sets} sets × {exercise.reps} reps
                                </span>
                              </div>
                              {exercise.notes && (
                                <p className="text-sm text-gray-500 mt-1">{exercise.notes}</p>
                              )}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
