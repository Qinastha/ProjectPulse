import React from "react";
import { useTranslation } from "react-i18next";

export const PageNotFound: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div>
      <h1>{t("error.noPage")}</h1>
    </div>
  );
};
