/**
 * @steward-apps/icons
 * Church ministry and operations icons for the Steward ecosystem.
 *
 * Design standard: 1.5px stroke, consistent optical padding in viewBox,
 * rounded line caps. All icons use currentColor — apply color via className.
 *
 * Usage:
 *   import { GivingIcon } from '@steward-apps/icons'
 *   <GivingIcon aria-label="Giving" size={24} className="text-primary" />
 *
 * Accessibility: always provide aria-label for interactive icon-only buttons.
 */

import React from "react";

export interface IconProps {
  size?: number;
  className?: string;
  "aria-label"?: string;
  "aria-hidden"?: boolean;
}

function icon(
  displayName: string,
  children: React.ReactNode
): React.FC<IconProps> {
  const Icon = ({
    size = 24,
    className,
    "aria-label": ariaLabel,
    "aria-hidden": ariaHidden,
  }: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-label={ariaLabel}
      aria-hidden={ariaHidden ?? (ariaLabel ? undefined : true)}
      role={ariaLabel ? "img" : undefined}
    >
      {children}
    </svg>
  );
  Icon.displayName = displayName;
  return Icon;
}

export const GivingIcon = icon(
  "GivingIcon",
  <>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
    <path d="M12 6v2M12 16v2M8.5 9.5C8.5 8.12 10.07 7 12 7s3.5 1.12 3.5 2.5c0 1.38-1.57 2.5-3.5 2.5S8.5 13.38 8.5 14.5 10.07 17 12 17s3.5-1.12 3.5-2.5" />
  </>
);

export const KidsCheckinIcon = icon(
  "KidsCheckinIcon",
  <>
    <circle cx="12" cy="7" r="3.5" />
    <path d="M6 20v-2a6 6 0 0 1 12 0v2" />
    <path d="M16 11l2 2 4-4" />
  </>
);

export const MinistryIcon = icon(
  "MinistryIcon",
  <>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  </>
);

export const WorshipIcon = icon(
  "WorshipIcon",
  <>
    <path d="M9 18V5l12-2v13" />
    <circle cx="6" cy="18" r="3" />
    <circle cx="18" cy="16" r="3" />
  </>
);

export const AttendanceIcon = icon(
  "AttendanceIcon",
  <>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
    <path d="M9 16l2 2 4-4" />
  </>
);

export const PrayerIcon = icon(
  "PrayerIcon",
  <>
    <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
    <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
    <line x1="6" y1="1" x2="6" y2="4" />
    <line x1="10" y1="1" x2="10" y2="4" />
    <line x1="14" y1="1" x2="14" y2="4" />
  </>
);

export const EventsIcon = icon(
  "EventsIcon",
  <>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </>
);

export const BulletinIcon = icon(
  "BulletinIcon",
  <>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </>
);

export const VolunteerIcon = icon(
  "VolunteerIcon",
  <>
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </>
);

export const CampusIcon = icon(
  "CampusIcon",
  <>
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </>
);
