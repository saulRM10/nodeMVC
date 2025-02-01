export interface GroupType {
  id: number;
  name: string | null;
  street_address: string | null;
  city: string | null;
  state: string | null;
  zip_code: string | null;
  logo_url: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface CreateNewGroupData {
  formData: GroupType;
  token: string;
}
