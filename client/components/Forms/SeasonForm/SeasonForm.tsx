import React from "react";
import styles from "../Form.module.css";
import Modal from "../../Modal/Modal";
import {
  CreateNewSeasonData,
  DeleteSeasonData,
  SeasonFormProps,
  UpdateSeasonData,
} from "./types";
import {
  useCreateSeason,
  useDeleteSeason,
  useUpdateSeason,
} from "./services/mutations";
import DeleteForm from "../DeleteForm/DeleteForm";

const SeasonForm: React.FC<SeasonFormProps> = ({
  afterSave,
  requestType,
  seasonId,
  leagueId,
}) => {
  const [seasonName, setSeasonName] = React.useState("");
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const createSeasonMutation = useCreateSeason();
  const updateSeasonMutation = useUpdateSeason();
  const deleteSeasonMutation = useDeleteSeason();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const { seasonName, startDate, endDate } = Object.fromEntries(
      new FormData(event.currentTarget),
    );

    const data = {
      formData: {
        name: seasonName,
        start_date: startDate,
        end_date: endDate,
        is_active: true,
        league_id: leagueId,
      },
    };

    switch (requestType) {
      case "POST":
        createSeasonMutation.mutate(data as CreateNewSeasonData);
        break;
      case "PATCH":
        updateSeasonMutation.mutate({
          id: seasonId,
          ...data,
        } as UpdateSeasonData);
        break;
      case "DELETE":
        await deleteSeasonMutation.mutateAsync({
          id: seasonId ? seasonId : 0,
        } as DeleteSeasonData);
        break;
      default:
        throw Error("No request type was supplied");
    }

    afterSave();
  };

  return (
    <>
      {requestType === "DELETE" ? (
        <DeleteForm
          destructBtnLabel="Yes, I'm Sure"
          onSubmit={handleSubmit}
          className={styles.form}>
          <p>Are you sure you want to delete this season?</p>
        </DeleteForm>
      ) : (
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputContainer}>
            <label className={styles.label} htmlFor="seasonName">
              Season Name
            </label>
            <input
              className={styles.input}
              required
              placeholder="Season Name"
              id="seasonName"
              name="seasonName"
              value={seasonName}
              onChange={(event) => setSeasonName(event.target.value)}
            />
          </div>

          <div className={styles.inputContainer}>
            <div className={styles.inputContainer}>
              <label className={styles.label} htmlFor="startDate">
                Start Date
              </label>
              <input
                className={styles.input}
                required
                type="date"
                id="startDate"
                name="startDate"
                value={startDate}
                onChange={(event) => setStartDate(event.target.value)}
              />
            </div>
            <div className={styles.inputContainer}>
              <label className={styles.label} htmlFor="endDate">
                End Date
              </label>
              <input
                className={styles.input}
                required
                type="date"
                id="endDate"
                name="endDate"
                value={endDate}
                onChange={(event) => setEndDate(event.target.value)}
              />
            </div>
          </div>

          <div className={styles.formBtnContainer}>
            <Modal.Close className={`${styles.btn} ${styles.cancelBtn}`}>
              Cancel
            </Modal.Close>

            <button
              type="submit"
              className={`${styles.btn} ${styles.submitBtn}`}>
              {isLoading === true ? "Saving..." : "Submit"}
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default SeasonForm;
