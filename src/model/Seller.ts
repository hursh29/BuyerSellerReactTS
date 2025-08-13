export interface Seller {
  businessName: string;
  description: string;
  reasonForSelling: string;
  industries: string[];
  revenueRange: [number, number];
  profitMargin: [number, number];
  employeeCount: number;
  location: string;
  expectedDealSize: [number, number];
}
