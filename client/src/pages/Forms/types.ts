export interface WelcomeScreen {
  id: string;
  ref: string;
  title: string;
  properties: {
    show_button: boolean;
    button_text: string;
    description: string;
  };
}

export interface Form {
  _id: string;
  created_by: {
    id: string;
    first_name: string;
    last_name: string;
  };
  updated_by: {
    id: string;
    first_name: string;
    last_name: string;
  };
  createdAt: Date;
  updatedAt: Date;
  form_data: {
    id: string;
    title: string;
    _links: {
      display: string;
      responses: string;
    };
  };
}
