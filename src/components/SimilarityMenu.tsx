import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { TabsContent } from "./ui/tabs";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Plus, XCircle } from "lucide-react";
import { Button } from "./ui/button";

export const SimilarityMenu = () => {
  const favoriteNumbers = ["First", "Second", "Third", "Fourth", "Fifth"];
  const [favorites, setFavorites] = useState<string[]>([""]);
  const changeFavorite = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const temp = favorites;
    temp[index] = event.target.value;
    setFavorites(temp);
  };
  const removeFavorite = (index: number) => {
    if (favorites.length > 1) {
      setFavorites(favorites.filter((_, i) => i !== index));
    }
  };
  return (
    <TabsContent value="similar">
      <Card>
        <CardHeader>
          <CardTitle>Similarity recommendation</CardTitle>
          <CardDescription>
            Get a recommendation by typing favorite movies
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center gap-4 rounded-lg border border-accent p-4">
            {favorites.map((_, index) => (
              <div
                className="grid w-full max-w-xs items-center gap-1.5"
                key={index}
              >
                <Label htmlFor={`favorite-${index}`}>
                  {favoriteNumbers[index]} favorite
                </Label>
                <div className="flex">
                  <Input
                    type="text"
                    id={`favorite-${index}`}
                    className={`${favorites.length > 1 && "pr-9"}`}
                    placeholder="Type your favorite movie..."
                    onChange={(e) => {
                      changeFavorite(e, index);
                    }}
                  />
                  {favorites.length > 1 ? (
                    <button
                      type="button"
                      className="group -ml-7"
                      onClick={() => removeFavorite(index)}
                    >
                      <XCircle className="h-5 w-5 text-accent group-hover:text-primary" />
                    </button>
                  ) : null}
                </div>
              </div>
            ))}
            {/* Set max count of favorites movies to 5 */}
            {favorites.length <= 4 ? (
              <Button
                variant="outline"
                className="w-10 rounded-full p-0"
                onClick={() => setFavorites([...favorites, ""])}
              >
                <Plus className="h-4 w-4" />
                <span className="sr-only">Open popover</span>
              </Button>
            ) : null}
          </div>
        </CardContent>
        <CardFooter>
          <Button variant={"outline"} className="w-full" type="submit">
            Get recommendation
          </Button>
        </CardFooter>
      </Card>
    </TabsContent>
  );
};
