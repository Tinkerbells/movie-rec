import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Label } from "./ui/label";
import { TabsContent } from "./ui/tabs";
import { Textarea } from "./ui/textarea";
import { type FC } from "react";
import { useForm } from "@/hooks";
import { generateGenrePrompt } from "@/helpers";
import { type MenuProps } from "./RecommendationMenu";
import { genres } from "@/consts";
import { MultiSelect } from "./MultiSelect";
import { Toggle } from "./ui/toggle";
import { toast } from "react-hot-toast";
import { AlertCircle } from "lucide-react";

export type OptionType = {
  label: string;
  value: string;
};
interface GenreQueryFormValues {
  query: string;
  selectedGenres: OptionType[];
  isMovies: boolean;
}
export const GenreQueryMenu: FC<MenuProps> = ({ setMessage, isLoading }) => {
  const { setFieldValue, handleSumbit, values } = useForm<GenreQueryFormValues>(
    {
      defaultValues: {
        query: "",
        selectedGenres: [],
        isMovies: true,
      },
      onSubmit: (values) => {
        if (!!values) {
          const content = generateGenrePrompt(
            values.selectedGenres.map((value) => value.value),
            values.isMovies,
            values.query
          );
          setMessage(content);
        }
      },
      validate: (values) => {
        if (values.selectedGenres.length === 0 && values.query.length === 0) {
          toast("Genres or query are required!", {
            icon: <AlertCircle />,
            duration: 1000,
          });
          return { selectedGenres: "Genres or query are required" };
        }
        return;
      },
    }
  );
  console.log(values.isMovies);
  return (
    <TabsContent value="genres">
      <form onSubmit={handleSumbit}>
        <Card>
          <CardHeader>
            <CardTitle>Genre recommendations</CardTitle>
            <CardDescription>
              Get recommendations using genres or query
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
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
            <div className="grid w-full max-w-lg items-center gap-4">
              <div className="flex flex-col gap-3">
                <MultiSelect
                  setOptions={(options: OptionType[]) =>
                    setFieldValue("selectedGenres", options)
                  }
                  options={genres}
                />
                <Label>Write specifications here (not necessary)</Label>
                <Textarea
                  maxLength={256}
                  className="max-h-72"
                  placeholder="Type a short description of what you want to see in the film..."
                  onChange={(event) =>
                    setFieldValue("query", event.target.value)
                  }
                />
              </div>
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
