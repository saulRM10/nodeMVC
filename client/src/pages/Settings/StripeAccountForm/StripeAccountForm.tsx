import React, { useState } from "react";
import styles from "./StripeAccountForm.module.css";
import Modal from "../../../components/Modal/Modal";
import { StripeLogoIcon } from "../../../assets/Icons";
import { StripeAccountFormProps } from "./types";
import DeleteForm from "../../../components/Forms/DeleteForm/DeleteForm";
import PrimaryButton from "../../../components/PrimaryButton/PrimaryButton";
import { useTranslation } from "react-i18next";

const StripeAccountForm: React.FC<StripeAccountFormProps> = ({
  afterSave,
  requestType,
}) => {
  const { t } = useTranslation("Settings");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    afterSave();
  };

  return (
    <>
      {requestType === "DELETE" ? (
        <DeleteForm
          destructBtnLabel={t("payment.formContent.delete")}
          onSubmit={handleSubmit}
          className={styles.form}>
          <p>{t("payment.formContent.deleteMessage")}</p>
        </DeleteForm>
      ) : (
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputContainer}>
            <label className={styles.label} htmlFor="name">
              {t("payment.formContent.name")}
            </label>
            <input
              className={styles.input}
              required
              placeholder={t("payment.formContent.namePlaceholder")}
              id="name"
              name="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>

          <div className={`${styles.inputContainer}`}>
            <label className={styles.label} htmlFor="description">
              {t("payment.formContent.description")}
            </label>
            <input
              className={styles.input}
              placeholder={t("payment.formContent.descriptionPlaceholder")}
              id="description"
              name="description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </div>

          <div className={styles.inputContainer}>
            <div className={styles.stripeContainer}>
              <PrimaryButton
                className={styles.stripeBtn}
                //TODO: We need to hook up with endpoint, temporary console log for now
                onClick={() => console.log("Stripe Button Pressed")}>
                {t("payment.formContent.connectStripe")}
                <StripeLogoIcon
                  className={styles.stripeLogo}
                  style={{
                    fill: "#FFFFFF",
                    width: "50px",
                  }}
                />
              </PrimaryButton>

              <p>
                {t("payment.formContent.noAccount")}{" "}
                <a href="#" className={styles.link}>
                  {t("payment.formContent.create")}
                </a>
              </p>
            </div>
          </div>

          <div className={styles.formBtnContainer}>
            <Modal.Close className={`${styles.btn} ${styles.cancelBtn}`}>
              {t("payment.formContent.cancel")}
            </Modal.Close>

            <div>
              <button
                type="submit"
                className={`${styles.btn} ${styles.submitBtn}`}>
                {t("payment.formContent.submit")}
              </button>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default StripeAccountForm;
