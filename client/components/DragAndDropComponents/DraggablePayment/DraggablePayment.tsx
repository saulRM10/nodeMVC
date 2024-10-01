import React, { useEffect, useRef, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Draggable } from "react-beautiful-dnd";
import { DraggablePaymentProps } from "./types";
import styles from "./DraggablePayment.module.css";
import DraggableSubMenu from "../DraggableSubMenu/DraggableSubMenu";
import Switch from "react-switch";
import { useTranslation } from "react-i18next";
import { SMALL_DRAGGABLE_CONTAINER_WIDTH } from "../constants";
import { formatPayment } from "../../../util/formatPayment";
import { calculateStripeFee } from "../../../util/calculateStripeFee";

const DraggablePayment: React.FC<DraggablePaymentProps> = ({
  id,
  index,
  title,
  control,
  validations,
  properties,
  onDelete,
  onCopy,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useTranslation("DraggableFields");
  const containerRef = useRef<HTMLDivElement>(null);
  const [isContainerWidthMaxed, setIsContainerWidthMaxed] = useState(false);
  const [paymentFee, setPaymentFee] = useState(
    properties?.price?.feeValue ?? "",
  );
  const { setValue } = useFormContext();
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setIsContainerWidthMaxed(
          containerRef.current.offsetWidth < SMALL_DRAGGABLE_CONTAINER_WIDTH,
        );
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // TODO: Get All Stripe Accounts from our API
  const getStripeAccounts = () => {
    const accounts = [
      {
        id: "1",
        stripe_account_id: "acct_1Pwrm0R4osRmT1sy",
        name: "Raul",
      },
    ];
    return accounts.map((account) => (
      <option
        key={account.id}
        value={JSON.stringify({
          id: account.id,
          stripe_account_id: account.stripe_account_id,
        })}>
        {account.name}&apos;s Account
      </option>
    ));
  };

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={provided.draggableProps.style}
          onClick={handleClick}>
          <div style={{ position: "relative" }} ref={containerRef}>
            <p className={styles.textElementTypeText}>{t("payment")}</p>
            <div className={styles.draggableContainer}>
              <Controller
                key={index}
                name={`fields.${index}.title`}
                control={control}
                defaultValue={title} // Ensure the default value is set
                render={({ field }) => (
                  <input
                    {...field}
                    placeholder={t("title")}
                    className={styles.question}
                  />
                )}
              />
              {properties?.description != null && (
                <Controller
                  name={`fields.${index}.properties.description`}
                  control={control}
                  defaultValue={properties?.description}
                  render={({ field }) => (
                    <input
                      {...field}
                      placeholder={t("description")}
                      className={styles.question}
                    />
                  )}
                />
              )}
              <hr />
              {properties?.price != null && (
                <div className={styles.paymentGroup}>
                  <div className={styles.payment}>
                    <p className={styles.paymentText}>{t("paymentAmount")}: </p>
                    <div className={styles.paymentInputGroup}>
                      <p className={styles.currencySymbol}>$</p>
                      <Controller
                        key={index}
                        name={`fields.${index}.properties.price.value`}
                        control={control}
                        defaultValue={properties.price.value}
                        render={({ field }) => (
                          <input
                            {...field}
                            value={formatPayment(field.value)}
                            onChange={(e) => {
                              const newFee = formatPayment(
                                calculateStripeFee(+e.target.value).toString(),
                              );
                              setPaymentFee(newFee);
                              setValue(
                                `fields.${index}.properties.price.feeValue`,
                                newFee,
                              );
                              field.onChange(e.target.value);
                            }}
                            placeholder={"0.00"}
                            className={styles.paymentInput}
                          />
                        )}
                      />
                    </div>
                    <p className={styles.currency}>
                      {properties.price?.currency}
                    </p>
                  </div>
                  <div className={styles.payment}>
                    <p className={styles.paymentText}>{t("feeAmount")}: </p>
                    <div className={styles.paymentInputGroup}>
                      <p className={styles.currencySymbol}>$</p>
                      <div className={styles.paymentDisplay}>
                        <Controller
                          name={`fields.${index}.properties.price.feeValue`}
                          control={control}
                          defaultValue={properties.price.feeValue}
                          render={({ field }) => (
                            <input
                              {...field}
                              value={paymentFee}
                              placeholder={"0.00"}
                              className={styles.paymentInput}
                              readOnly
                            />
                          )}
                        />
                      </div>
                    </div>
                    <p className={styles.currency}>
                      {properties.price?.currency}
                    </p>
                  </div>
                </div>
              )}
              {properties?.stripe_account != null && (
                <div className={styles.stripeGroup}>
                  <p className={styles.flexCenter}>
                    <b>{t("stripeAccount")}: </b>
                  </p>
                  <Controller
                    name={`fields.${index}.properties.stripe_account`}
                    control={control}
                    defaultValue={properties.stripe_account} // need to default the first option
                    render={({ field }) => (
                      <select
                        {...field}
                        className={styles.accountList}
                        onChange={(e) =>
                          field.onChange(JSON.parse(e.target.value))
                        }
                        value={JSON.stringify(field.value)}>
                        {getStripeAccounts()}
                      </select>
                    )}
                  />
                </div>
              )}
              <div
                className={`${styles.extraOptions} ${
                  isContainerWidthMaxed ? styles.containerSmall : ""
                }`}>
                {validations?.required != null && (
                  <>
                    <p className={styles.requiredText}>{t("requiredText")}</p>
                    <Controller
                      name={`fields.${index}.validations.required`}
                      control={control}
                      defaultValue={validations.required}
                      render={({ field }) => (
                        <Switch
                          checked={field.value}
                          onChange={(checked) => field.onChange(checked)}
                          offColor="#DFE5EE"
                          onColor="#DFE5EE"
                          offHandleColor="#AAAAAA"
                          onHandleColor="#B01254"
                          handleDiameter={24}
                          uncheckedIcon={false}
                          checkedIcon={false}
                          height={16}
                          width={44}
                        />
                      )}
                    />
                  </>
                )}
              </div>
            </div>
            {isMenuOpen && (
              <DraggableSubMenu
                onDelete={onDelete}
                onCopy={onCopy}
                onClose={handleClick}
              />
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default DraggablePayment;
