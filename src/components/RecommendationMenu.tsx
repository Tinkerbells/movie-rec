"use client";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GenreMultiSelect } from "./GenreMultiSelect";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Plus, XCircle } from "lucide-react";
import { useState } from "react";
export const RecommendationMenu = () => {
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
  console.log(favorites);
  return (
    <Tabs defaultValue="query" className="w-[500px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="query">By genres and query</TabsTrigger>
        <TabsTrigger value="similar">By similarity</TabsTrigger>
      </TabsList>
      <TabsContent value="query">
        <Card>
          <CardHeader>
            <CardTitle>Query and genre recommendations</CardTitle>
            <CardDescription>
              Get recommendation using genres and query
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid w-full max-w-lg items-center gap-4">
              <GenreMultiSelect />
              <div className="flex flex-col gap-3">
                <Label htmlFor="email-2">
                  Write specifications here. (not necessary)
                </Label>
                <Textarea />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant={"outline"} className="w-full" type="submit">
              Get recommendation
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="similar">
        <Card>
          <CardHeader>
            <CardTitle>Similarity recommendation</CardTitle>
            <CardDescription>
              Get a recommendation by typing related movies
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
                      className="pr-9"
                      placeholder="Type your favorite movie..."
                      onChange={(e) => {
                        changeFavorite(e, index);
                      }}
                    />
                    <button
                      type="button"
                      className="group -ml-7"
                      onClick={() => removeFavorite(index)}
                    >
                      <XCircle className="h-5 w-5 text-accent group-hover:text-primary" />
                    </button>
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
    </Tabs>
  );
};
