interface StripeAccountFormProps {
  //Use to set open state from true to false after form submission
  afterSave: () => void | null;
  requestType?: "POST" | "PATCH" | "DELETE";
  leagueId?: number;
}

export type { StripeAccountFormProps };
