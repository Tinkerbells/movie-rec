import { useMultipleSelection, useSelect } from "downshift";
import { cn } from "@/lib/utils";
import { ScrollArea } from "./ui/scroll-area";
import { buttonVariants } from "@/components/ui/button";
import { genres } from "@/consts";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import { Label } from "./ui/label";

export const GenreMultiSelect = () => {
  function MultipleSelect() {
    const {
      getSelectedItemProps,
      getDropdownProps,
      addSelectedItem,
      removeSelectedItem,
      selectedItems,
    } = useMultipleSelection({ initialSelectedItems: [genres[0], genres[1]] });
    const items = genres.filter((genre) => selectedItems.indexOf(genre) < 0);
    const {
      isOpen,
      selectedItem,
      getToggleButtonProps,
      getLabelProps,
      getMenuProps,
      highlightedIndex,
      getItemProps,
    } = useSelect({
      selectedItem: null,
      defaultHighlightedIndex: 0, // after selection, highlight the first item.
      items,
      stateReducer: (state, actionAndChanges) => {
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
                  {selectedItemForRender?.label}
                  <span
                    className="group grid cursor-pointer place-items-center pl-1"
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
            <button
              className={buttonVariants({
                variant: "outline",
                className: "w-full",
              })}
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
            </button>
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
                  highlightedIndex === index && "cursor-pointer bg-accent",
                  selectedItem === item && "font-bold",
                  "flex flex-col px-3 py-2 shadow-sm"
                )}
                key={`${item.label}${index}`}
                {...getItemProps({ item, index })}
              >
                <span>{item.label}</span>
              </div>
            ))}
        </ScrollArea>
      </div>
    );
  }
  return <MultipleSelect />;
};
