export interface NodeInputSchema {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'json';
  required: boolean;
  description?: string;
}

export abstract class BaseCustomNode {
  abstract nodeType: string;
  abstract name: string;
  abstract category: string;

  abstract execute(inputs: Record<string, any>, context: Record<string, any>): Promise<Record<string, any>>;

  validate(inputs: Record<string, any>): boolean {
    return true;
  }
}
