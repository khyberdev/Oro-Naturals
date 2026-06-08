import * as React from "react";

export type ToastProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
};

export type ToastActionElement = React.ReactElement;
