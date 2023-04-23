import { useMultipleSelection, useSelect } from "downshift";
import { cn } from "@/lib/utils";
import { ScrollArea } from "./ui/scroll-area";
import { buttonVariants } from "@/components/ui/button";
import { genres } from "@/consts";

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
          <label className="w-fit" {...getLabelProps()}>
            Pick your favorite genres:
          </label>
          <div className="inline-flex flex-wrap items-center gap-2 rounded-lg border p-1.5 shadow-sm">
            {selectedItems.map(function renderSelectedItem(
              selectedItemForRender,
              index
            ) {
              return (
                <span
                  className="rounded-lg bg-accent px-1"
                  key={`selected-item-${index}`}
                  {...getSelectedItemProps({
                    selectedItem: selectedItemForRender,
                    index,
                  })}
                >
                  {selectedItemForRender?.label}
                  <span
                    className="cursor-pointer px-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeSelectedItem(selectedItemForRender);
                    }}
                  >
                    &#10005;
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
              Pick genre &#8595;
            </button>
          </div>
        </div>
        <ScrollArea
          className={`h-72 w-full rounded-md border ${
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
