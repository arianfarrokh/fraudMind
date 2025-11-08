type ScenarioType = {
  id: ID;
  name: string;
  description: string;
  sqlText: string;
  fraudMindSchemaId: ID;
};

type ScenarioInputVariable = {
  id: ID;
  name: string;
  description?: string | null;
  sqlText: string;
  fraudMindSchemaId: ID;
  parametersSchema?: string | null;
};

type ExecuteScenarioResult = {
  columns: string[];
  jsonData?: string | null;
  error?: string | null;
};
type ExecuteScenarioVariable = {
  scenarioId: ID;
};

type SchemaType = {
  id: number;
  name: string;
  description: string;
};

interface UseMutationAlertProps {
  loading: boolean;
  data?: any;
  error?: any;
  successMessage: string;
  errorMessage?: string;
  show: (options: any) => void;
}
