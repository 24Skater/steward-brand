/**
 * Receipt Email Template
 * Used for donation receipts, payment confirmations, etc.
 */

import {
  emailTheme,
  emailWrapperStyles,
  emailContainerStyles,
  emailButtonStyles,
  emailHeaderStyles,
  emailFooterStyles,
  inlineStyles,
} from "./shared/email-theme";

export interface ReceiptEmailProps {
  /** Organization name */
  organizationName: string;
  /** Organization logo URL (optional) */
  logoUrl?: string;
  /** Recipient name */
  recipientName: string;
  /** Receipt/transaction number */
  receiptNumber: string;
  /** Date of the transaction */
  date: string;
  /** Line items on the receipt */
  items: Array<{
    description: string;
    amount: string;
  }>;
  /** Total amount */
  total: string;
  /** Payment method display (e.g., "Visa ****4242") */
  paymentMethod?: string;
  /** Optional note/memo */
  note?: string;
  /** View details URL (optional) */
  viewDetailsUrl?: string;
  /** Organization address for footer */
  organizationAddress?: string;
  /** Support email */
  supportEmail?: string;
}

/**
 * Generate a receipt email HTML string
 */
export function receiptEmail(props: ReceiptEmailProps): string {
  const {
    organizationName,
    logoUrl,
    recipientName,
    receiptNumber,
    date,
    items,
    total,
    paymentMethod,
    note,
    viewDetailsUrl,
    organizationAddress,
    supportEmail,
  } = props;

  const itemRows = items
    .map(
      (item) => `
      <tr>
        <td style="${inlineStyles({ padding: "12px 0", borderBottom: `1px solid ${emailTheme.colors.border}` })}">
          ${item.description}
        </td>
        <td style="${inlineStyles({ padding: "12px 0", borderBottom: `1px solid ${emailTheme.colors.border}`, textAlign: "right" })}">
          ${item.amount}
        </td>
      </tr>
    `
    )
    .join("");

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Receipt from ${organizationName}</title>
</head>
<body style="${emailWrapperStyles}">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="${emailWrapperStyles}">
    <tr>
      <td align="center" style="padding: ${emailTheme.spacing["2xl"]} ${emailTheme.spacing.md};">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="${emailContainerStyles}; border-radius: ${emailTheme.borderRadius.lg};">
          <!-- Header -->
          <tr>
            <td style="${emailHeaderStyles}">
              ${logoUrl ? `<img src="${logoUrl}" alt="${organizationName}" height="40" style="display: block; margin-bottom: 16px;">` : ""}
              <h1 style="${inlineStyles({ margin: "0", fontSize: emailTheme.fontSizes.h2, fontWeight: "600", color: emailTheme.colors.navy })}">
                Receipt
              </h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: ${emailTheme.spacing.md} 0;">
              <p style="margin: 0 0 16px;">
                Hi ${recipientName},
              </p>
              <p style="margin: 0 0 24px;">
                Thank you for your payment. Here's your receipt:
              </p>

              <!-- Receipt Details -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="${inlineStyles({ backgroundColor: emailTheme.colors.subtle, borderRadius: emailTheme.borderRadius.md, padding: emailTheme.spacing.md, marginBottom: emailTheme.spacing.lg })}">
                <tr>
                  <td style="padding: ${emailTheme.spacing.md};">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="${inlineStyles({ fontSize: emailTheme.fontSizes.small, color: emailTheme.colors.muted })}">
                          Receipt #
                        </td>
                        <td style="${inlineStyles({ textAlign: "right", fontWeight: "500" })}">
                          ${receiptNumber}
                        </td>
                      </tr>
                      <tr>
                        <td style="${inlineStyles({ fontSize: emailTheme.fontSizes.small, color: emailTheme.colors.muted, paddingTop: "8px" })}">
                          Date
                        </td>
                        <td style="${inlineStyles({ textAlign: "right", fontWeight: "500", paddingTop: "8px" })}">
                          ${date}
                        </td>
                      </tr>
                      ${
                        paymentMethod
                          ? `
                      <tr>
                        <td style="${inlineStyles({ fontSize: emailTheme.fontSizes.small, color: emailTheme.colors.muted, paddingTop: "8px" })}">
                          Payment Method
                        </td>
                        <td style="${inlineStyles({ textAlign: "right", fontWeight: "500", paddingTop: "8px" })}">
                          ${paymentMethod}
                        </td>
                      </tr>
                      `
                          : ""
                      }
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Line Items -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: ${emailTheme.spacing.lg};">
                <thead>
                  <tr>
                    <th style="${inlineStyles({ textAlign: "left", padding: "12px 0", borderBottom: `2px solid ${emailTheme.colors.border}`, fontSize: emailTheme.fontSizes.small, fontWeight: "600", color: emailTheme.colors.muted })}">
                      Description
                    </th>
                    <th style="${inlineStyles({ textAlign: "right", padding: "12px 0", borderBottom: `2px solid ${emailTheme.colors.border}`, fontSize: emailTheme.fontSizes.small, fontWeight: "600", color: emailTheme.colors.muted })}">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  ${itemRows}
                </tbody>
                <tfoot>
                  <tr>
                    <td style="${inlineStyles({ padding: "16px 0", fontWeight: "600", fontSize: emailTheme.fontSizes.h3 })}">
                      Total
                    </td>
                    <td style="${inlineStyles({ padding: "16px 0", fontWeight: "600", fontSize: emailTheme.fontSizes.h3, textAlign: "right" })}">
                      ${total}
                    </td>
                  </tr>
                </tfoot>
              </table>

              ${
                note
                  ? `
              <p style="${inlineStyles({ margin: `0 0 ${emailTheme.spacing.lg}`, padding: emailTheme.spacing.md, backgroundColor: emailTheme.colors.subtle, borderRadius: emailTheme.borderRadius.sm, fontSize: emailTheme.fontSizes.small })}">
                <strong>Note:</strong> ${note}
              </p>
              `
                  : ""
              }

              ${
                viewDetailsUrl
                  ? `
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding: ${emailTheme.spacing.md} 0;">
                    <a href="${viewDetailsUrl}" style="${emailButtonStyles("primary")}">
                      View Details
                    </a>
                  </td>
                </tr>
              </table>
              `
                  : ""
              }
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="${emailFooterStyles}">
              <p style="margin: 0 0 8px;">
                ${organizationName}
              </p>
              ${organizationAddress ? `<p style="margin: 0 0 8px;">${organizationAddress}</p>` : ""}
              ${supportEmail ? `<p style="margin: 0;">Questions? Contact us at <a href="mailto:${supportEmail}" style="color: ${emailTheme.colors.blue};">${supportEmail}</a></p>` : ""}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

