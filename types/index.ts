export {};

declare global {

  interface Professional {
    user_id: number;
    first_name: string;
    last_name: string;
    title: string;
    phone: string | null;
  }
  
  interface Session {
    session_id: number;
    date: string;
    time: string;
    available: number;
    format: "Individual" | "Grupal";
    modality: "Online" | "Presencial";
    link: string | null;
    credit_type: "bronze" | "silver" | "gold";
    actual_assistant: number;
    professional: Professional;
  }

  interface Modal {
    openModal: () => void;
    closeModal: () => void;
  }
  
}
