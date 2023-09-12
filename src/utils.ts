export function snake_case(name: string) {
  return name.replaceAll(/[A-Z-1-9]/g, (letter) => `_${letter.toLowerCase()}`);
}

export function camelCase(name: string) {
  return name.replaceAll(/([-_][a-z])/g, (letter) =>
    letter.toUpperCase().replace("-", "").replace("_", "")
  );
}

export function circularJSONResolver<T extends Record<string, any>>(
  json: T,
  transformer: (str: string) => string
) {
  let result = {};
  let current = result;

  const resolver = (json: Record<string, any>) => {
    for (const key of Object.keys(json)) {
      let value = json[key];
      if (Array.isArray(value)) {
        const newValue: {}[] = [];
        for (const item of value) {
          newValue.push(circularJSONResolver(item, transformer));
        }

        value = newValue;
      } else if (typeof value === "object") {
        current[transformer(key)] = circularJSONResolver(value, transformer);
        continue;
      }

      current[transformer(key)] =
        typeof value === "number" ? String(value) : value;
    }

    result = Object.assign(result, current);
  };

  resolver(json);

  return result;
}