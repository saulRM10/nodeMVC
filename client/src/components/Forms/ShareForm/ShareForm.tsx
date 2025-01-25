import React, { useRef, useState } from "react";
import styles from "../Form.module.css";
import { ShareFormProps } from "./types";
import { sendEmail } from "../../../api/forms/service";

const ShareForm: React.FC<ShareFormProps> = ({ afterClose, formLink }) => {
  const textBoxRef = useRef<HTMLInputElement>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");

  const handleEmail = async (formLink: string, email: string) => {
    await sendEmail(formLink, email);
  };

  const handleCopy = () => {
    if (textBoxRef.current) {
      const text = textBoxRef.current.innerText;
      navigator.clipboard
        .writeText(text)
        .then(() => {
          setCopied(true);
          setTimeout(() => {
            setCopied(false);
          }, 5000);
        })
        .catch((err) => {
          console.error("Failed to copy text: ", err);
        });
    }
  };

  return (
    <div className={styles.form}>
      <hr />
      <div>
        <label className={styles.boldLabel}>Form Link</label>
        {copied && <p className={styles.copiedMessage}>Copied to clipboard!</p>}
        <div className={styles.shareContainer}>
          <p ref={textBoxRef}>{formLink}</p>
          <button
            className={`${styles.btn} ${styles.copyBtn}`}
            onClick={handleCopy}>
            copy
          </button>
        </div>
      </div>
      <hr />
      <div>
        <label className={styles.boldLabel}>Share Link</label>
        <div className={styles.shareContainer}>
          <input
            type="text"
            value={email}
            placeholder="Enter email address"
            onChange={(e) => setEmail(e.target.value)}
            className={styles.inputShare}
          />
          <button
            className={`${styles.btn} ${styles.sendBtn}`}
            onClick={() => handleEmail(formLink, email)}>
            send
          </button>
        </div>
      </div>

      <div className={styles.formBtnContainer}>
        <button
          className={`${styles.btn} ${styles.cancelBtn}`}
          onClick={afterClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default ShareForm;
