import { Simulation } from "@/types";

export const postInitialize = async (tenantId: string | undefined, simulation: Simulation) => {
  try {
    if(!tenantId){
      throw new Error();
    }
    const initializatorModule = await import(`./tenant/${tenantId}`);
    console.log("Initializator found, executing...");
    initializatorModule.default(simulation);
  } catch {
    console.log(`Initializator not found, skipping...`);
  }
};