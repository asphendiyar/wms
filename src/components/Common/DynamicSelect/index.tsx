import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { PropsWithChildren, useEffect } from "react";
import Select from "react-select";
import { ReactSelectValues } from "../../../app/commonTypes";
import { customStyles, customTheme } from "../../../app/helpers";
import { useAppDispatch } from "../../../app/hooks";
import SelectMenuButton, { CustomValueContainer } from "../rscc";

type MenuListProps = {
  total_pages: number;
  number: number;
  onClick: () => void;
};

type DynamicSelectProps<PayloadAction> = {
  options: ReactSelectValues[];
  value: ReactSelectValues | undefined;
  onChange: (option: ReactSelectValues | null) => void;
  payload: PayloadAction;
  editMode: boolean;
  placeholder: string;
  action: ActionCreatorWithPayload<PayloadAction>;
  menuListProps?: MenuListProps;
  isMultiple?: boolean;
  isClearable?: boolean;
};

function DynamicSelect<PayloadAction>({
  options,
  value,
  onChange,
  payload,
  editMode,
  placeholder,
  action,
  menuListProps,
  isMultiple,
  isClearable,
}: PropsWithChildren<DynamicSelectProps<PayloadAction>>): JSX.Element {
  const dispatch = useAppDispatch();

  const handleMenuOpen = () => {
    !options.length && dispatch(action(payload));
  };

  useEffect(() => {
    editMode && !options.length && dispatch(action(payload));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editMode]);
  return (
    <Select
      options={options}
      placeholder={placeholder}
      theme={customTheme}
      components={{
        ValueContainer: CustomValueContainer,
        MenuList: (props) => (
          <SelectMenuButton
            total_pages={menuListProps?.total_pages}
            number={menuListProps?.number}
            onClick={menuListProps?.onClick}
            {...props}
          />
        ),
      }}
      styles={customStyles()}
      value={value}
      //@ts-ignore
      onChange={onChange}
      onMenuOpen={handleMenuOpen}
      isMulti={isMultiple}
      isClearable={isClearable}
    />
  );
}
export default DynamicSelect;
