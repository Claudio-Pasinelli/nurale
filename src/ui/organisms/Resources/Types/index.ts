export interface SettingsResource {
  curriculumVitae: string;
  firstName: string;
  lastName: string;
  hourCost: number | undefined;
  hourRevenue: number | undefined;
  dailyCost?: number | undefined;
  dailyRevenue?: number | undefined;
  note: string;
  supplierId: number | undefined;
}
