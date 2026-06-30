declare module "cookie" {
  export interface SerializeOptions {
    encode?: (value: string) => string;
    maxAge?: number;
    expires?: Date;
    path?: string;
    domain?: string;
    secure?: boolean;
    httpOnly?: boolean;
    sameSite?: boolean | "lax" | "strict" | "none";
  }

  export function serialize(name: string, value: string, options?: SerializeOptions): string;
  export function parse(str: string): Record<string, string>;
}
