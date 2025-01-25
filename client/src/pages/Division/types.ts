interface DivisionType {
  id: number;
  name: string;
  // start_date: Date;
  // end_date: Date;
  start_date: string;
  end_date: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
  league_id: number;
}

export type { DivisionType };
