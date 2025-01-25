import React, { useEffect, useState } from "react";
import styles from "../Form.module.css";
import Modal from "../../Modal/Modal";
import {
  CreateNewDivisionData,
  DeleteDivisionData,
  DivisionFormProps,
  UpdateDivisionData,
} from "./types";
import {
  useCreateDivision,
  useUpdateDivision,
  useDeleteDivision,
} from "../../../api/divisions/mutations";
import { useAuth0 } from "@auth0/auth0-react";
import DeleteForm from "../DeleteForm/DeleteForm";
import Cookies from "js-cookie";
import { fetchUser } from "../../../api/users/service";
import { User } from "../../../api/users/types";
import { useTranslation } from "react-i18next";

const DivisionForm: React.FC<DivisionFormProps> = ({
  afterSave,
  divisionId,
  requestType,
  seasonId,
}) => {
  const { t } = useTranslation("Divisions");
  const [divisionName, setDivisionName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { getAccessTokenSilently } = useAuth0();
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    (async () => {
      const token = await getAccessTokenSilently();
      const email = Cookies.get("email") || "";
      const user = await fetchUser(email, token);
      setCurrentUser(user);
    })();
  }, []);

  const createDivisionMutation = useCreateDivision();
  const updateDivisionMutation = useUpdateDivision();
  const deleteDivisionMutation = useDeleteDivision();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const { divisionName } = Object.fromEntries(
      new FormData(event.currentTarget),
    );

    const data = {
      formData: {
        name: divisionName,
        group_id: currentUser?.group_id,
        season_id: seasonId,
      },
    };

    switch (requestType) {
      case "POST":
        createDivisionMutation.mutate(data as CreateNewDivisionData);
        break;
      case "PATCH":
        updateDivisionMutation.mutate({
          id: divisionId,
          ...data,
        } as UpdateDivisionData);
        break;
      case "DELETE":
        deleteDivisionMutation.mutate({
          id: divisionId ? divisionId : 0,
        } as DeleteDivisionData);
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
          className={styles.form}
          destructBtnLabel={t("formContent.delete")}
          onSubmit={handleSubmit}>
          <p>{t("formContent.deleteMessage")}</p>
        </DeleteForm>
      ) : (
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputContainer}>
            <label className={styles.label} htmlFor="seasonName">
              {t("formContent.name")}
            </label>
            <input
              className={styles.input}
              required
              placeholder={t("formContent.namePlaceholder")}
              id="divisionName"
              name="divisionName"
              value={divisionName}
              onChange={(event) =>
                setDivisionName(event.target.value.replaceAll("/", ""))
              }
            />
          </div>

          <div className={styles.formBtnContainer}>
            <Modal.Close className={`${styles.btn} ${styles.cancelBtn}`}>
              {t("formContent.cancel")}
            </Modal.Close>

            <button
              type="submit"
              className={`${styles.btn} ${styles.submitBtn}`}>
              {isLoading === true
                ? t("formContent.submitting")
                : t("formContent.submit")}
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default DivisionForm;
