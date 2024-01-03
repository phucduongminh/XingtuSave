// useCategoryChoose.ts
import { createPlanTable, getTodoPlans } from "../controllers/PlanControllers";
import { Plans } from "../models/Plans";
import { useCallback, useEffect, useState } from "react";
import { getDBConnection } from "../controllers/connectDB";

interface CateChoose {
  label: string;
  value: string;
}

// Tạo một type để mô tả tham số num
type NumType = {
  num: number; // Thuộc tính num là một số
};

// Sử dụng kiểu dữ liệu đã định nghĩa khi khai báo hàm useCategoryChoose
export const useCategoryChoose = ({num}: NumType) => {
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
  }, [num]);

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
  }, [plans,num]);

  return cateChoose;
};
