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
import { useMultipleSelection, useSelect } from "downshift";
import { cn } from "@/lib/utils";
import { ScrollArea } from "./ui/scroll-area";
import { genres } from "@/consts";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import { useMemo } from "react";
import { useForm } from "@/hooks";
import { toast } from "./ui/use-toast";
import { generateGenrePrompt } from "@/helpers";
import { useMessageStore } from "@/store/messagesStore";
import { useRouter } from "next/router";
interface GenreQueryFormValues {
  query: string;
  selectedGenres: string[];
}
export const GenreQueryMenu = () => {
  const router = useRouter();
  const setMessages = useMessageStore((state) => state.setMessages);
  const { values, setFieldValue, handleSumbit } = useForm<GenreQueryFormValues>(
    {
      defaultValues: { query: "", selectedGenres: [] },
      onSubmit: (values) => {
        if (!!values) {
          const content = generateGenrePrompt(
            values.selectedGenres,
            values.query
          );
          setMessages([{ role: "user", content: content }]);
          router.push("/recommendations");
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
    }
  );
  const {
    getSelectedItemProps,
    getDropdownProps,
    addSelectedItem,
    removeSelectedItem,
    selectedItems,
  } = useMultipleSelection({
    initialSelectedItems: values.selectedGenres,
    onSelectedItemsChange: ({ selectedItems }) => {
      selectedItems && setFieldValue("selectedGenres", selectedItems);
    },
  });

  const items = useMemo(
    () => genres.filter((genre) => selectedItems.indexOf(genre) < 0),
    [selectedItems]
  );
  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
  } = useSelect({
    selectedItem: null,
    defaultHighlightedIndex: 0, // after selection, highlight the first item.
    items,
    stateReducer: (_, actionAndChanges) => {
      const { changes, type } = actionAndChanges;
      switch (type) {
        case useSelect.stateChangeTypes.ToggleButtonKeyDownEnter:
        case useSelect.stateChangeTypes.ToggleButtonKeyDownSpaceButton:
        case useSelect.stateChangeTypes.ItemClick:
          return {
            ...changes,
            isOpen: true, // keep the menu open after selection.
            highlightedIndex: 0, // with the first option highlighted.
          };
      }
      return changes;
    },
    onStateChange: ({ type, selectedItem: newSelectedItem }) => {
      switch (type) {
        case useSelect.stateChangeTypes.ToggleButtonKeyDownEnter:
        case useSelect.stateChangeTypes.ToggleButtonKeyDownSpaceButton:
        case useSelect.stateChangeTypes.ItemClick:
        case useSelect.stateChangeTypes.ToggleButtonBlur:
          if (newSelectedItem) {
            addSelectedItem(newSelectedItem);
          }
          break;
        default:
          break;
      }
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
                <div className="flex flex-col gap-2">
                  <Label {...getLabelProps()}>Pick your favorite genres:</Label>
                  <div className="inline-flex flex-wrap items-center gap-2 rounded-lg border p-1.5 shadow-sm">
                    {selectedItems.map(function renderSelectedItem(
                      selectedItemForRender,
                      index
                    ) {
                      return (
                        <span
                          className="flex rounded-lg bg-accent px-2 py-0.5 text-sm font-medium"
                          key={`selected-item-${index}`}
                          {...getSelectedItemProps({
                            selectedItem: selectedItemForRender,
                            index,
                          })}
                        >
                          {selectedItemForRender}
                          <span
                            className="group -mr-2 grid cursor-pointer place-items-center"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeSelectedItem(selectedItemForRender);
                            }}
                          >
                            <X
                              className="max-h-4 font-bold group-hover:text-primary-foreground"
                              strokeWidth={2}
                            />
                          </span>
                        </span>
                      );
                    })}
                    <Button
                      variant={"outline"}
                      className="w-full"
                      type="button"
                      {...getToggleButtonProps(
                        getDropdownProps({ preventKeyAction: isOpen })
                      )}
                    >
                      Pick genre
                      {isOpen ? (
                        <ChevronUp className="max-h-5" />
                      ) : (
                        <ChevronDown className="max-h-5" />
                      )}{" "}
                    </Button>
                  </div>
                </div>
                <ScrollArea
                  className={`mt-1 h-72 w-full rounded-md border ${
                    !(isOpen && items.length) && "hidden"
                  }`}
                  {...getMenuProps()}
                >
                  {isOpen &&
                    items.map((item, index) => (
                      <div
                        className={cn(
                          highlightedIndex === index &&
                            "cursor-pointer bg-accent",
                          "flex flex-col px-3 py-2 shadow-sm"
                        )}
                        key={`${item}${index}`}
                        {...getItemProps({ item, index })}
                      >
                        <span className="text-sm font-bold leading-none tracking-tight">
                          {item}
                        </span>
                      </div>
                    ))}
                </ScrollArea>
              </div>
              <div className="flex flex-col gap-3">
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
            <Button variant={"outline"} className="w-full" type="submit">
              Get recommendations
            </Button>
          </CardFooter>
        </Card>
      </form>
    </TabsContent>
  );
};
