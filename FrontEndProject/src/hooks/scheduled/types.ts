export interface ScheduledSchemaProps {
  email: string;
  codLoja: string;
  type: string;
  ticket: string;
  appointmentDate: string;
  appointmentTime: string;
  name: string;
}

export interface ScheduledSchema extends ScheduledSchemaProps {
  id: string;
  createdDate: string;
}
