/**
 * String Utilities - Shared across all bounded contexts
 * These utilities provide common string operations
 */

export class StringUtil {
  /**
   * Check if string is empty
   */
  static isEmpty(value: string): boolean {
    return !value || value.trim().length === 0;
  }

  /**
   * Check if string is not empty
   */
  static isNotEmpty(value: string): boolean {
    return !this.isEmpty(value);
  }

  /**
   * Capitalize first letter
   */
  static capitalize(value: string): string {
    if (this.isEmpty(value)) return value;
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }

  /**
   * Convert to camelCase
   */
  static toCamelCase(value: string): string {
    return value.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
  }

  /**
   * Convert to kebab-case
   */
  static toKebabCase(value: string): string {
    return value.replace(/([A-Z])/g, "-$1").toLowerCase();
  }

  /**
   * Convert to snake_case
   */
  static toSnakeCase(value: string): string {
    return value.replace(/([A-Z])/g, "_$1").toLowerCase();
  }

  /**
   * Convert to PascalCase
   */
  static toPascalCase(value: string): string {
    return value.replace(/(?:^|[-_])(\w)/g, (_, c) => c.toUpperCase());
  }

  /**
   * Generate random string
   */
  static random(length: number = 10): string {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  /**
   * Generate slug from string
   */
  static slugify(value: string): string {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  /**
   * Truncate string
   */
  static truncate(
    value: string,
    length: number,
    suffix: string = "..."
  ): string {
    if (value.length <= length) return value;
    return value.substring(0, length - suffix.length) + suffix;
  }

  /**
   * Remove HTML tags
   */
  static stripHtml(value: string): string {
    return value.replace(/<[^>]*>/g, "");
  }

  /**
   * Escape HTML
   */
  static escapeHtml(value: string): string {
    const map: { [key: string]: string } = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return value.replace(/[&<>"']/g, (m) => map[m]);
  }

  /**
   * Unescape HTML
   */
  static unescapeHtml(value: string): string {
    const map: { [key: string]: string } = {
      "&amp;": "&",
      "&lt;": "<",
      "&gt;": ">",
      "&quot;": '"',
      "&#39;": "'",
    };
    return value.replace(/&amp;|&lt;|&gt;|&quot;|&#39;/g, (m) => map[m]);
  }

  /**
   * Check if string contains only letters
   */
  static isAlpha(value: string): boolean {
    return /^[a-zA-Z]+$/.test(value);
  }

  /**
   * Check if string contains only numbers
   */
  static isNumeric(value: string): boolean {
    return /^\d+$/.test(value);
  }

  /**
   * Check if string contains only alphanumeric
   */
  static isAlphanumeric(value: string): boolean {
    return /^[a-zA-Z0-9]+$/.test(value);
  }

  /**
   * Check if string is valid email
   */
  static isEmail(value: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  /**
   * Check if string is valid URL
   */
  static isUrl(value: string): boolean {
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  }
}
