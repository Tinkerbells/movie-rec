import { genres } from "@/consts";
import Select, {
  components,
  type DropdownIndicatorProps,
  type ClearIndicatorProps,
  type MultiValueRemoveProps,
  type OptionProps,
} from "react-select";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import { type FC, useState } from "react";
import { type OptionType } from "./GenreQueryMenu";

interface MultiSelectProps {
  options: OptionType[];
  setOptions: (options: OptionType[]) => void;
}
export const MultiSelect: FC<MultiSelectProps> = ({ options, setOptions }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const DropdownIndicator = (props: DropdownIndicatorProps<OptionType>) => {
    return (
      <components.DropdownIndicator {...props}>
        {isOpen ? <ChevronUp /> : <ChevronDown />}
      </components.DropdownIndicator>
    );
  };
  const ClearIndicator = (props: ClearIndicatorProps<OptionType>) => {
    return (
      <components.ClearIndicator {...props}>
        <X className="h-5 w-5 hover:text-muted-foreground" />
      </components.ClearIndicator>
    );
  };

  const MultiValueRemove = (props: MultiValueRemoveProps<OptionType>) => {
    return (
      <components.MultiValueRemove {...props}>
        <X className="hover:text-muted-foreground" />
      </components.MultiValueRemove>
    );
  };

  const Option = (props: OptionProps<OptionType>) => {
    return (
      <components.Option {...props}>
        <div className="h-full w-full cursor-pointer rounded-lg p-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground">
          {props.children}
        </div>
      </components.Option>
    );
  };

  return (
    <Select
      onChange={(options) => setOptions(options as OptionType[])}
      onMenuOpen={() => setIsOpen(true)}
      onMenuClose={() => setIsOpen(false)}
      closeMenuOnSelect={false}
      options={options}
      isMulti
      unstyled
      components={{
        DropdownIndicator,
        ClearIndicator,
        MultiValueRemove,
        Option,
      }}
      placeholder="Pick genre..."
      classNames={{
        control: ({ isFocused }) =>
          cn(
            isFocused && "ring-ring ring-2 ring-offset-2",
            "rounded-lg border px-3 py-2"
          ),
        menu: () =>
          "border mt-2 bg-card rounded-lg pl-2 py-2 cursor-pointer pr-0.5",
        indicatorSeparator: () => "bg-red",
        multiValue: () =>
          "flex items-center justify-between py-0.5 px-2 bg-accent rounded-lg m-1",
        multiValueLabel: () => "text-sm font-medium",
        multiValueRemove: () => "w-4 h-4 ml-2",
        input: () => "max-w-sm text-sm font-medium",
        clearIndicator: () => "cursor-pointer",
        dropdownIndicator: () => "cursor-pointer",
        placeholder: () => "text-sm font-medium text-muted-foreground",
      }}
    />
  );
};
