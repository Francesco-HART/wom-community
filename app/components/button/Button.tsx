import { Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
import { createContext, PropsWithChildren, useContext } from "react";
import { clsx } from "clsx";
import React from "react";

type Variant = "solid" | "ghost" | "link";
type Size = "sm" | "md";
type Type = "primary" | "destructive" | "secondary";

export type ButtonProps = PropsWithChildren<
  {
    variant?: Variant;
    size?: Size;
    type?: Type;
  } & TouchableHighlight["props"]
>;

type ButtonContextType = {
  variant: Variant;
  type: Type;
  disabled: boolean;
};

const ButtonContext = createContext<ButtonContextType>({
  variant: "solid",
  type: "primary",
  disabled: false,
});

export default function Button({
  children,
  className,
  variant = "solid",
  size = "md",
  type = "primary",
  ...props
}: ButtonProps) {
  return (
    <TouchableOpacity
      {...props}
      activeOpacity={1}
      className={clsx(
        props.disabled && "opacity-50",

        variant == "solid" &&
          "bg-royal-blue-500 rounded-full active:bg-royal-blue-700 flex-row justify-center",
        variant == "solid" &&
          type == "destructive" &&
          "bg-red-500 active:bg-red-700",
        variant == "solid" && size == "md" && "p-4",
        variant == "solid" && size == "sm" && "px-2",

        variant == "ghost" &&
          "active:bg-neutral-100 dark:active:bg-neutral-800 rounded-xl p-2",
        variant == "ghost" &&
          type == "secondary" &&
          "dark:active:bg-neutral-900",
        variant == "link" && "active:opacity-40",
        className
      )}
    >
      <ButtonContext.Provider
        value={{ variant, disabled: props.disabled ?? false, type }}
      >
        <View
          className={clsx(
            "flex-row items-center space-x-2",
            size == "sm" && "space-x-1"
          )}
        >
          {children}
        </View>
      </ButtonContext.Provider>
    </TouchableOpacity>
  );
}

Button.Text = ({ children, ...props }: PropsWithChildren<Text["props"]>) => {
  const { variant, type } = useContext(ButtonContext);
  return (
    <Text
      {...props}
      className={clsx(
        "text-center",
        variant == "link" && "text-royal-blue-500",
        variant == "ghost" && "dark:text-white",
        type == "destructive" && "text-red-500",
        variant == "solid" && "text-white"
      )}
    >
      {children}
    </Text>
  );
};

Button.Icon = ({ children, ...props }: PropsWithChildren<View["props"]>) => {
  const { variant, type } = useContext(ButtonContext);
  return (
    <Text
      {...props}
      className={clsx(
        variant == "link" && "text-royal-blue-500",
        variant == "ghost" && "dark:text-white",
        type == "destructive" && "text-red-500",
        variant == "solid" && "text-white"
      )}
    >
      {children}
    </Text>
  );
};
