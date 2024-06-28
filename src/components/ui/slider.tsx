"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

const generateTicks = (min: number, max: number, step: number) => {
  const ticks = [];
  for (let i = min; i <= max; i += step) {
    ticks.push(
      <div
        key={i}
        className="absolute top-1/2  h-2 w-2 rounded-full -translate-x-1/2 -translate-y-1/2 bg-gray-300"
        style={{ left: `${((i - min) / (max - min)) * 100}%` }}
      >
        <span className="absolute top-3 left-1/2 -translate-x-1/2 text-black">{i}</span>
      </div>
    );
  }
  return ticks;
};

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, max = 100, min = 1, step = 1, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    max={max}
    min={min}
    step={step}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="h-2 w-full grow overflow-hidden rounded-full bg-secondary">
      <SliderPrimitive.Range className="absolute h-full bg-primary" />
      {generateTicks(min, max, step)}
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
