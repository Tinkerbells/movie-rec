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
import { ScrollArea } from "./ui/scroll-area";
import { type FC } from "react";
import { useForm } from "@/hooks";
import { toast } from "./ui/use-toast";
import { generateGenrePrompt } from "@/helpers";
import { type MenuProps } from "./RecommendationMenu";
import { genres } from "@/consts";
import { MultiSelect } from "./MultiSelect";

export type OptionType = {
  label: string;
  value: string;
};
interface GenreQueryFormValues {
  query: string;
  selectedGenres: OptionType[];
}
export const GenreQueryMenu: FC<MenuProps> = ({ setMessage, isLoading }) => {
  const { setFieldValue, handleSumbit } = useForm<GenreQueryFormValues>({
    defaultValues: { query: "", selectedGenres: [] },
    onSubmit: (values) => {
      if (!!values) {
        const content = generateGenrePrompt(
          values.selectedGenres.map((value) => value.value),
          values.query
        );
        setMessage(content);
      }
    },
    validate: (values) => {
      if (values.selectedGenres.length === 0) {
        toast({
          variant: "destructive",
          title: "Genres are required!",
          description:
            "Please provide at least one favorite genre to get recommendations",
        });
        return { selectedGenres: "Genres are required" };
      }
      return;
    },
  });

  return (
    <TabsContent value="genres">
      <form onSubmit={handleSumbit}>
        <Card>
          <CardHeader>
            <CardTitle>Query and genre recommendations</CardTitle>
            <CardDescription>
              Get recommendations using genres and query
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid w-full max-w-lg items-center gap-4">
              <div className="w-full">
                <div className="flex flex-col gap-2"></div>
                <ScrollArea></ScrollArea>
              </div>
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
