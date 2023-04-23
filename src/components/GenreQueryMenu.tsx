import { GenreMultiSelect } from "./GenreMultiSelect";
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

export const GenreQueryMenu = () => {
  return (
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
  );
};
