// useCategoryChoose.ts
import { createPlanTable, getTodoPlans } from "../controllers/PlanControllers";
import { Plans } from "../models/Plans";
import { useCallback, useEffect, useState } from "react";
import { getDBConnection } from "../controllers/connectDB";

interface CateChoose {
  label: string;
  value: string;
}

export const useCategoryChoose = () => {
  const initialCateChooses: CateChoose[] = [
    { label: "", value: "" },
  ];

  const [plans, setPlans] = useState<Plans[]>([]);
  const [cateChoose, setCateChoose] = useState(initialCateChooses);

  const loadPlanCallback = useCallback(async () => {
    try {
      const db = await getDBConnection();
      await createPlanTable(db);
      const storedPlanItems = await getTodoPlans(db);
      if (storedPlanItems.length) {
        setPlans(storedPlanItems);
      } else {
        setPlans([]);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    loadPlanCallback();
  }, [loadPlanCallback]);

  useEffect(() => {
    // Update cateChoose state only after plans state is updated
    const initialCateChooses = plans.map((plan) => ({
      label: plan.category,
      value: plan.category,
    }));
    // Set the state
    setCateChoose(initialCateChooses);
  }, [plans]);

  return cateChoose;
};
