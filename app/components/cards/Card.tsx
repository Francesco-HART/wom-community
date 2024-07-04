import { PropsWithChildren } from "react";
import { View } from "react-native";
import { clsx } from "clsx";
import React from "react";

type Props = PropsWithChildren<
  View["props"] & { type?: "primary" | "secondary" }
>;

export default function Card({ children, type = "primary", ...props }: Props) {
  return (
    <View
      {...props}
      className={clsx(
        "bg-white shadow-md shadow-neutral-100 dark:shadow-none rounded-xl p-2",
        type === "primary" && "dark:bg-neutral-900",
        type === "secondary" && "dark:bg-neutral-800",
        props.className
      )}
    >
      {children}
    </View>
  );
}

Card.Header = ({ children, ...props }: PropsWithChildren<View["props"]>) => {
  return (
    <View
      {...props}
      className={`flex-row items-center mb-2 ${props.className}`}
    >
      {children}
    </View>
  );
};
