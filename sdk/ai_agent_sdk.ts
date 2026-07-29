export abstract class BaseCustomAgent {
  abstract agentName: string;

  abstract plan(goal: string, context: Record<string, any>): Promise<string[]>;
  abstract executeStep(step: string, context: Record<string, any>): Promise<Record<string, any>>;
}
