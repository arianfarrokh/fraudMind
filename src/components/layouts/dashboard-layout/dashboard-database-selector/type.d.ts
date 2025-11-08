type SchemaType = {
  id: number;
  name: string;
  description: string;
};

interface UseMutationAlertProps {
  loading?: boolean;
  data: any;
  error: any;
  successMessage: string;
  errorMessage: string;
  show: (options: any) => void;
}
