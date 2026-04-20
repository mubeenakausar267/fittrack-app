import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Plus, Trash2, Save, CheckCircle2, Circle, ShoppingCart } from "lucide-react";
import { toast } from "sonner";

interface GroceryItem {
  id: string;
  name: string;
  quantity: string;
  category: string;
  completed: boolean;
}

interface GroceryListData {
  items: GroceryItem[];
}

const CATEGORIES = ["Proteins", "Vegetables", "Fruits", "Dairy", "Grains", "Spices", "Other"];

export function GroceryList() {
  const [items, setItems] = useState<GroceryItem[]>([]);
  const [newItem, setNewItem] = useState("");
  const [newQuantity, setNewQuantity] = useState("");
  const [newCategory, setNewCategory] = useState("Other");

  useEffect(() => {
    // Load grocery list from localStorage
    const saved = localStorage.getItem("groceryList");
    if (saved) {
      const data: GroceryListData = JSON.parse(saved);
      setItems(data.items);
    }
  }, []);

  const handleAddItem = () => {
    if (!newItem.trim()) {
      toast.error("Please enter an item name");
      return;
    }

    const item: GroceryItem = {
      id: Date.now().toString(),
      name: newItem,
      quantity: newQuantity || "1",
      category: newCategory,
      completed: false,
    };

    const updatedItems = [...items, item];
    setItems(updatedItems);
    localStorage.setItem("groceryList", JSON.stringify({ items: updatedItems }));

    setNewItem("");
    setNewQuantity("");
    setNewCategory("Other");
    toast.success("Item added to grocery list!");
  };

  const handleToggleItem = (id: string) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setItems(updatedItems);
    localStorage.setItem("groceryList", JSON.stringify({ items: updatedItems }));
  };

  const handleDeleteItem = (id: string) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
    localStorage.setItem("groceryList", JSON.stringify({ items: updatedItems }));
    toast.success("Item removed!");
  };

  const handleClearCompleted = () => {
    const updatedItems = items.filter((item) => !item.completed);
    setItems(updatedItems);
    localStorage.setItem("groceryList", JSON.stringify({ items: updatedItems }));
    toast.success("Completed items cleared!");
  };

  const handleSave = () => {
    localStorage.setItem("groceryList", JSON.stringify({ items }));
    toast.success("Grocery list saved!");
  };

  const groupedItems = CATEGORIES.reduce(
    (acc, category) => {
      acc[category] = items.filter((item) => item.category === category);
      return acc;
    },
    {} as { [key: string]: GroceryItem[] }
  );

  const completedCount = items.filter((item) => item.completed).length;
  const totalCount = items.length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold mb-2">Weekly Grocery List</h1>
          <p className="text-gray-600">Organize and track your grocery shopping</p>
        </div>
        <div className="flex gap-2">
          {completedCount > 0 && (
            <Button onClick={handleClearCompleted} variant="outline" className="gap-2">
              Clear Completed ({completedCount})
            </Button>
          )}
          <Button onClick={handleSave} className="gap-2">
            <Save className="w-4 h-4" />
            Save
          </Button>
        </div>
      </div>

      {/* Progress Overview */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-0">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 mb-2">Shopping Progress</p>
              <p className="text-2xl font-semibold">
                {completedCount}/{totalCount} items checked
              </p>
            </div>
            <ShoppingCart className="w-12 h-12 text-blue-500 opacity-20" />
          </div>
          <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all"
              style={{ width: `${totalCount > 0 ? (completedCount / totalCount) * 100 : 0}%` }}
            ></div>
          </div>
        </CardContent>
      </Card>

      {/* Add New Item */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add New Item
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="item-name" className="text-sm font-medium">
                  Item Name
                </Label>
                <Input
                  id="item-name"
                  placeholder="e.g., Chicken breast"
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleAddItem()}
                />
              </div>

              <div>
                <Label htmlFor="quantity" className="text-sm font-medium">
                  Quantity
                </Label>
                <Input
                  id="quantity"
                  placeholder="e.g., 2 lbs"
                  value={newQuantity}
                  onChange={(e) => setNewQuantity(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleAddItem()}
                />
              </div>

              <div>
                <Label htmlFor="category" className="text-sm font-medium">
                  Category
                </Label>
                <select
                  id="category"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-end">
                <Button onClick={handleAddItem} className="w-full gap-2">
                  <Plus className="w-4 h-4" />
                  Add Item
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Grocery Items by Category */}
      <div className="space-y-6">
        {CATEGORIES.map((category) => {
          const categoryItems = groupedItems[category];
          if (categoryItems.length === 0) return null;

          return (
            <Card key={category}>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  {category}
                  <span className="text-sm font-normal text-gray-500">
                    ({categoryItems.filter((i) => !i.completed).length}/{categoryItems.length})
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {categoryItems.map((item) => (
                    <div
                      key={item.id}
                      className={`flex items-center justify-between p-3 rounded-lg border transition-colors ${
                        item.completed
                          ? "bg-gray-50 border-gray-200"
                          : "bg-white border-gray-200 hover:border-blue-300"
                      }`}
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <button
                          onClick={() => handleToggleItem(item.id)}
                          className="flex-shrink-0 text-gray-400 hover:text-blue-600 transition-colors"
                        >
                          {item.completed ? (
                            <CheckCircle2 className="w-6 h-6 text-green-600" />
                          ) : (
                            <Circle className="w-6 h-6" />
                          )}
                        </button>
                        <div className="flex-1">
                          <p
                            className={`font-medium ${
                              item.completed ? "line-through text-gray-400" : "text-gray-900"
                            }`}
                          >
                            {item.name}
                          </p>
                          <p className="text-sm text-gray-500">{item.quantity}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteItem(item.id)}
                        className="text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}

        {items.length === 0 && (
          <Card>
            <CardContent className="pt-12 pb-12">
              <div className="text-center">
                <ShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No items added yet</p>
                <p className="text-gray-400">Start adding items to your grocery list above</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
