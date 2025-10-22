// src/components/Menu.tsx
import React from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import styles from './Menu.module.css';

/**
 * A reusable, accessible popover menu built on Radix UI.
 * This file exports composable, styled parts for maximum flexibility.
 */

export const MenuRoot = DropdownMenu.Root;
export const MenuTrigger = DropdownMenu.Trigger;

// A wrapper for the content that includes the portal and custom styling
export const MenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenu.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenu.Content>
>(({ children, ...props }, forwardedRef) => (
  <DropdownMenu.Portal>
    <DropdownMenu.Content
      {...props}
      ref={forwardedRef}
      className={`${styles.menuContent} ${props.className || ''}`}
      sideOffset={5}
      align="end"
    >
      {children}
    </DropdownMenu.Content>
  </DropdownMenu.Portal>
));
MenuContent.displayName = DropdownMenu.Content.displayName;


// Expose Radix sub-components for direct use, they will inherit styles from menu.css
export const MenuItem = DropdownMenu.Item;
export const MenuSeparator = DropdownMenu.Separator;