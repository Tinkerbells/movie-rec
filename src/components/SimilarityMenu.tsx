"use client";
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
import { useForm } from "@/hooks";
import { generateSimilarPrompt } from "@/helpers";
import { type FC } from "react";
import { type MenuProps } from "./RecommendationMenu";
import { Toggle } from "./ui/toggle";

interface SimilarityMenuFormValues {
  favorites: string[];
  isMovies: boolean;
}
export const SimilarityMenu: FC<MenuProps> = ({ setMessage, isLoading }) => {
  const { values, errors, setFieldValue, handleSumbit } =
    useForm<SimilarityMenuFormValues>({
      defaultValues: { favorites: [""], isMovies: true },
      onSubmit: (values) => {
        if (!!values) {
          const content = generateSimilarPrompt(
            values.favorites,
            values.isMovies
          );
          setMessage(content);
        }
      },
      validate: (values) => {
        const isEmpty = values.favorites.some((el) => el.length === 0);
        if (isEmpty) {
          return { favorites: "No favorite are provided!" };
        }
        return;
      },
    });

  const favoriteNumbers = ["First", "Second", "Third", "Fourth", "Fifth"];
  const changeFavorite = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const temp = values.favorites;
    temp[index] = event.target.value;
    setFieldValue("favorites", temp);
  };
  const removeFavorite = (index: number) => {
    if (values.favorites.length > 1) {
      setFieldValue(
        "favorites",
        values.favorites.filter((_, i) => i !== index)
      );
    }
  };

  return (
    <TabsContent value="similar">
      <form onSubmit={handleSumbit}>
        <Card>
          <CardHeader>
            <CardTitle>Similarity recommendations</CardTitle>
            <CardDescription>
              Get a recommendations by typing your favorites titles
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <Label htmlFor="search-type" className="flex items-center">
                Search for (choose one)
              </Label>
              <div className="flex justify-between gap-4">
                <Toggle
                  pressed={values.isMovies}
                  defaultPressed
                  onPressedChange={(pressed) =>
                    setFieldValue("isMovies", pressed)
                  }
                  className="w-full"
                >
                  Movies
                  <p className="sr-only">Movies</p>
                </Toggle>
                <Toggle
                  pressed={!values.isMovies}
                  className="w-full"
                  onPressedChange={(pressed) =>
                    setFieldValue("isMovies", !pressed)
                  }
                >
                  Series
                  <p className="sr-only">Series</p>
                </Toggle>
              </div>
            </div>
            <div className="mt-2 flex flex-col items-center gap-4 rounded-lg border border-accent p-4">
              {values.favorites.map((el, index) => (
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
                      className={`${values.favorites.length > 1 && "pr-9"}`} // eslint-disable-line
                      placeholder={`Type your favorite ${
                        values.isMovies ? "movies" : "series"
                      }...`}
                      onChange={(e) => {
                        changeFavorite(e, index);
                      }}
                    />
                    {values.favorites.length > 1 ? (
                      <button
                        type="button"
                        className="group -ml-7"
                        onClick={() => removeFavorite(index)}
                      >
                        <XCircle className="h-5 w-5 text-primary group-hover:text-muted-foreground" />
                      </button>
                    ) : null}
                  </div>
                  {!!errors && el.length === 0 ? (
                    <p className="text-sm text-destructive">
                      {errors.favorites}
                    </p>
                  ) : null}
                </div>
              ))}
              {/* Set max count of favorites movies to 5 */}
              {values.favorites.length <= 4 ? (
                <Button
                  variant="outline"
                  className="w-10 rounded-full p-0"
                  type="button"
                  onClick={() =>
                    setFieldValue("favorites", [...values.favorites, ""])
                  }
                >
                  <Plus className="h-4 w-4" />
                  <span className="sr-only">Open popover</span>
                </Button>
              ) : null}
            </div>
          </CardContent>
          <CardFooter>
            <Button
              variant={"outline"}
              className="w-full"
              type="submit"
              isLoading={isLoading}
            >
              Get recommendations
            </Button>
          </CardFooter>
        </Card>
      </form>
    </TabsContent>
  );
};
