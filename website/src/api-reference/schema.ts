export type PropType = "string" | "number" | "boolean" | "enum" | "function" | "object";

export type PropSchema = {
	default?: any;
	type: PropType;
	description: string;
	required?: boolean;
    enumValues?: string[];
};

export type PropObj<T> = {
	[K in keyof T]-?: PropSchema;
};

export type APISchema<T = Record<string, unknown>> = {
	title: string;
	description: string;
	type: "x-data" | "x-ref";
	props?: PropObj<T>;
};

export function createBooleanProp(description: string, defaultValue: boolean): PropSchema {
    return { type: "boolean", description, default: defaultValue };
}

export function createNumberProp(description: string, defaultValue: number): PropSchema {
    return { type: "number", description, default: defaultValue };
}

export function createStringProp(description: string, defaultValue: string): PropSchema {
    return { type: "string", description, default: defaultValue };
}

export function createEnumProp(description: string, enumValues: string[], defaultValue: string): PropSchema {
    return { type: "enum", description, enumValues, default: defaultValue };
}

export function createFunctionProp(description: string, defaultValue: null): PropSchema {
    return { type: "function", description, default: defaultValue };
}

export function createObjectProp(description: string, defaultValue: Record<string, unknown>): PropSchema {
    return { type: "object", description, default: defaultValue };
}