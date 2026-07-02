import styles from "./tax-report-export.module.css";
import { TaxReportHeader } from "~/blocks/tax-report-export/tax-report-header";
import { ReportGenerator } from "~/blocks/tax-report-export/report-generator";
import { ReportPreview } from "~/blocks/tax-report-export/report-preview";
import { ExportOptions } from "~/blocks/tax-report-export/export-options";
import { ReportHistory } from "~/blocks/tax-report-export/report-history";

export default function TaxReportExportPage() {
  return (
    <div className={styles.page}>
      <TaxReportHeader />
      <ReportGenerator />
      <ReportPreview />
      <ExportOptions />
      <ReportHistory />
    </div>
  );
}
