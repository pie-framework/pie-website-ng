export interface ElementExample {
	title: string;
	description: string;
	model: Record<string, unknown>;
	session: Record<string, unknown>;
	configuration: Record<string, unknown>;
	source: string;
	commit: string;
}
export interface SchemaField {
	name: string;
	type: string;
	required: boolean;
	description: string;
	defaultValue: string;
	values: string;
}
export interface ElementReference {
	version: string;
	contracts: {
		kind: string;
		url: string;
		fields: SchemaField[];
		definitions: { name: string; fields: SchemaField[] }[];
	}[];
}
