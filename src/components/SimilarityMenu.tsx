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
import { api } from "@/utils/api";
import { Recommendations } from "./Recommendations";

interface SimilarityMenuFormValues {
  favorites: string[];
}
export const SimilarityMenu = () => {
  const { values, errors, setFieldValue, handleSumbit } =
    useForm<SimilarityMenuFormValues>({
      defaultValues: { favorites: [""] },
      onSubmit: (values) => {
        if (!!values) refetch();
      },
      validate: (values) => {
        const isEmpty = values.favorites.some((el) => el.length === 0);
        if (isEmpty) {
          return { favorites: "No favorite movies are provided!" };
        }
        return;
      },
    });

  const { data, isFetching, refetch } = api.recommendation.similar.useQuery(
    { favorites: values.favorites },
    { enabled: false }
  );
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
      {data ? (
        <Recommendations recommendations={data} />
      ) : (
        <form onSubmit={handleSumbit}>
          <Card>
            <CardHeader>
              <CardTitle>Similarity recommendations</CardTitle>
              <CardDescription>
                Get a recommendations by typing your favorite movie titles
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center gap-4 rounded-lg border border-accent p-4">
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
                        className={`${values.favorites.length > 1 && "pr-9"}`}
                        placeholder="Type your favorite movie..."
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
                          <XCircle className="h-5 w-5 text-accent group-hover:text-primary" />
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
                isLoading={isFetching}
              >
                Get recommendation
              </Button>
            </CardFooter>
          </Card>
        </form>
      )}
    </TabsContent>
  );
};
