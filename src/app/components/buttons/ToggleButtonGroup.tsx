"use client";

import {
  ToggleButtonGroup as AriaToggleButtonGroup,
  ToggleButtonGroupProps,
} from "react-aria-components";

export default function ToggleButtonGroup({
  children,
  ...rest
}: ToggleButtonGroupProps) {
  return <AriaToggleButtonGroup {...rest}>{children}</AriaToggleButtonGroup>;
}
