declare module "react-resizable-panels" {
  import * as React from "react";
  export const Group: React.ForwardRefExoticComponent<
    React.PropsWithoutRef<React.HTMLAttributes<HTMLDivElement>> &
      React.RefAttributes<HTMLDivElement>
  >;
  export const Panel: React.ForwardRefExoticComponent<
    React.PropsWithoutRef<React.HTMLAttributes<HTMLDivElement>> &
      React.RefAttributes<HTMLDivElement>
  >;
  export const Separator: React.ForwardRefExoticComponent<
    React.PropsWithoutRef<React.HTMLAttributes<HTMLDivElement>> & {
      withHandle?: boolean;
    } & React.RefAttributes<HTMLDivElement>
  >;
}

// Fallback for input-otp if its types are not resolved by bundler
declare module "input-otp" {
  import * as React from "react";
  export const OTPInput: React.ForwardRefExoticComponent<
    React.PropsWithoutRef<
      React.InputHTMLAttributes<HTMLInputElement> & {
        containerClassName?: string;
        maxLength?: number;
        value?: string;
        onChange?: (value: string) => void;
      }
    > &
      React.RefAttributes<HTMLInputElement>
  >;
  export const OTPInputContext: React.Context<{
    slots: Array<{ char: string | null; hasFakeCaret: boolean; isActive: boolean }>;
  }>;
}
