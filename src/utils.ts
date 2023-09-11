import { Endpoints } from "../src/constants";

export function resolvePropName(name: string) {
  return name.replaceAll(/[A-Z-1-9]/g, (letter) => `_${letter.toLowerCase()}`);
}

export function circularJSONResolver<T extends Record<string, any>>(json: T) {
  let result = {};
  let current = result;

  const resolver = (json: Record<string, any>) => {
    for (const key of Object.keys(json)) {
      let value = json[key];
      if (Array.isArray(value)) {
        const newValue: {}[] = [];
        for (const item of value) {
          newValue.push(circularJSONResolver(item));
        }

        value = newValue;
      } else if (typeof value === "object") {
        current[resolvePropName(key)] = circularJSONResolver(value);
        continue;
      }

      current[resolvePropName(key)] =
        typeof value === "number" ? String(value) : value;
    }

    result = Object.assign(result, current);
  };

  resolver(json);

  return result;
}

export function buildUrl(
  base: string,
  endpoint: (typeof Endpoints)[keyof typeof Endpoints]
) {
  return (base.endsWith("/") ? base : base + "/") + endpoint;
}
