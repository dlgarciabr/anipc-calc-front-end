import { Simulation } from "@/types";

export const postInitialize = async (tenantId: string, simulation: Simulation) => {
  try {
    const initializatorModule = await import(`./tenant/${tenantId}`);
    initializatorModule.default(simulation);
  } catch {
    console.log(`Initializator for tenant ${tenantId}: not found, skipping initialize function.`);
  }
};