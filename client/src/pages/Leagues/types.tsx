import { User } from "../../api/users/types";

interface LeaguesProps {
  currentUser: User;
}

interface LeagueType {
  id: number;
  group_id: number;
  name: string;
  description: string;
  created_at: Date;
  updated_at: Date;
}

interface EditModalProps {
  leagueName: string;
  leagueDescription: string;
  isEditOpen: () => void;
}

export type { LeaguesProps, LeagueType, EditModalProps };
