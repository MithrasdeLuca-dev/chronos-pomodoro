import type React from "react";
import styles from "./styles.module.css";

// Ou type DefaultButtonProps = { type: "string" | "number" }; //
type DefaultButtonProps = {
  icon: React.ReactNode;
  color?: "green" | "red";
} & React.ComponentProps<"button">;

export function DefaultButton({
  color = "green",
  ...props
}: DefaultButtonProps) {
  return (
    <>
      <button className={`${styles.button} ${styles[color]}`} {...props}>
        {props.icon}
      </button>
    </>
  );
}
