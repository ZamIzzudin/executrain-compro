/** @format */

"use client";

import React, { useEffect, useState } from "react";

// Declare custom element for TypeScript compatibility in React
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "lord-icon": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          src?: string;
          trigger?:
            | "hover"
            | "click"
            | "loop"
            | "loop-on-hover"
            | "morph"
            | "sequence"
            | "in"
            | "never"
            | string;
          delay?: string | number;
          colors?: string;
          stroke?: string | number;
          state?: string;
          target?: string;
          loading?: "lazy" | "eager";
        },
        HTMLElement
      >;
    }
  }
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "lord-icon": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          src?: string;
          trigger?: string;
          delay?: string | number;
          colors?: string;
          stroke?: string | number;
          state?: string;
          target?: string;
          loading?: string;
        },
        HTMLElement
      >;
    }
  }
}

export interface LordIconsProps {
  /**
   * CDN URL or JSON source of the LordIcon (e.g. "https://cdn.lordicon.com/lupuorrc.json")
   * Accepts either `cdn` or `src`.
   */
  cdn?: string;
  src?: string;
  /**
   * Size of the icon in pixels (number) or standard CSS unit string (e.g. 32, 48, "50px", "2rem").
   * Default: 32
   */
  size?: number | string;
  /**
   * Animation trigger: 'hover' | 'click' | 'loop' | 'loop-on-hover' | 'morph' | 'sequence' | 'in' | 'never'
   * Default: 'hover'
   */
  trigger?:
    | "hover"
    | "click"
    | "loop"
    | "loop-on-hover"
    | "morph"
    | "sequence"
    | "in"
    | "never"
    | string;
  /**
   * Color configuration string (e.g. "primary:#121331,secondary:#08a88a")
   * Or specify primaryColor / secondaryColor props individually.
   */
  colors?: string;
  primaryColor?: string;
  secondaryColor?: string;
  /**
   * Animation delay in milliseconds or string
   */
  delay?: number | string;
  /**
   * Stroke weight of the icon
   */
  stroke?: number | string;
  /**
   * Icon state (e.g., "hover-1", "hover-2", etc.)
   */
  state?: string;
  /**
   * Target element selector to trigger animation when hovered over target
   */
  target?: string;
  /**
   * Custom CSS class name
   */
  className?: string;
  /**
   * Custom inline styles
   */
  style?: React.CSSProperties;
  /**
   * Click event handler
   */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

const LORD_ICON_CDN_SCRIPT = "https://cdn.lordicon.com/lordicon.js";

export function LordIcons({
  cdn,
  src,
  size = 32,
  trigger = "hover",
  colors,
  primaryColor,
  secondaryColor,
  delay,
  stroke,
  state,
  target,
  className = "",
  style,
  onClick,
}: Readonly<LordIconsProps>) {
  const [, setIsLoaded] = useState(false);
  const iconRef = React.useRef<HTMLElement | null>(null);

  // Determine final icon CDN URL source (accepts cdn or src)
  const iconSrc = cdn ?? src ?? "";

  // Compute color string if primaryColor or secondaryColor are passed separately
  let colorString = colors;
  if (!colorString && (primaryColor || secondaryColor)) {
    const parts: string[] = [];
    if (primaryColor) parts.push(`primary:${primaryColor}`);
    if (secondaryColor) parts.push(`secondary:${secondaryColor}`);
    colorString = parts.join(",");
  }

  // Format size to valid CSS dimension value
  const formattedSize = typeof size === "number" ? `${size}px` : size;

  // Auto-load LordIcon CDN script dynamically on mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (customElements.get("lord-icon")) {
      setIsLoaded(true);
      return;
    }

    const existingScript = document.querySelector(
      `script[src="${LORD_ICON_CDN_SCRIPT}"]`
    );

    if (existingScript) {
      const handleLoad = () => setIsLoaded(true);
      existingScript.addEventListener("load", handleLoad);
      setIsLoaded(true);
      return () => {
        existingScript.removeEventListener("load", handleLoad);
      };
    }

    const script = document.createElement("script");
    script.src = LORD_ICON_CDN_SCRIPT;
    script.async = true;
    script.onload = () => setIsLoaded(true);
    document.head.appendChild(script);

    return () => {
      script.onload = null;
    };
  }, []);

  // Listen to target element (or parent card) hover and restart animation reliably every time
  useEffect(() => {
    if (typeof window === "undefined") return;

    let targetEl: Element | null = null;
    let cleanupListener: (() => void) | undefined;

    const triggerPlay = () => {
      const iconEl = iconRef.current as any;
      if (!iconEl) return;

      const executePlay = () => {
        const player = iconEl.playerInstance || iconEl.player;
        if (player) {
          if (typeof player.stop === "function") {
            player.stop();
          }
          if (typeof player.play === "function") {
            player.play();
            return;
          } else if (typeof player.goToAndPlay === "function") {
            player.goToAndPlay(0, true);
            return;
          }
        }

        if (typeof iconEl.goToFirstFrame === "function") {
          iconEl.goToFirstFrame();
        }
        if (typeof iconEl.play === "function") {
          iconEl.play();
        }
      };

      executePlay();
      setTimeout(executePlay, 50);
    };

    const setupListener = () => {
      targetEl = target
        ? document.querySelector(target) || iconRef.current?.closest(target)
        : iconRef.current;
      if (!targetEl) return false;

      targetEl.addEventListener("mouseenter", triggerPlay);

      cleanupListener = () => {
        targetEl?.removeEventListener("mouseenter", triggerPlay);
      };
      return true;
    };

    if (!setupListener()) {
      const timer = setTimeout(setupListener, 100);
      return () => clearTimeout(timer);
    }

    return () => {
      if (cleanupListener) cleanupListener();
    };
  }, [target, iconSrc]);

  return (
    <span
      className={`inline-flex items-center justify-center ${className}`}
      style={{
        width: formattedSize,
        height: formattedSize,
        display: "inline-flex",
        ...style,
      }}
      onClick={onClick}
    >
      {iconSrc && (
        <lord-icon
          ref={iconRef}
          src={iconSrc}
          trigger={trigger}
          delay={delay}
          colors={colorString}
          stroke={stroke}
          state={state}
          style={{
            width: formattedSize,
            height: formattedSize,
          }}
        />
      )}
    </span>
  );
}

// Export alias LordIcon for convenience
export const LordIcon = LordIcons;

export default LordIcons;
