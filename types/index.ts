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
    available: boolean;
    confirmed: boolean;
    format: "Individual" | "Grupal";
    modality: "Online" | "Presencial";
    link: string | null;
    credit_type: "bronze" | "silver" | "gold";
    actual_assistant: number;
    professional: Professional;
  }

  interface User {
    user_id: number;
    email: string;
    user_type: 1 | 2 | 3;
  }

  interface Student extends User {
    credits: {
      bronze: number;
      silver: number;
      gold: number;
    };
    location?: {
      lat: number;
      lng: number;
    };
    info: StudentInfo;
  }

  interface StudentInfo {
    user_id: number;
    first_name: string;
    last_name: string;
    gender: string;
    birth_date: string;
    weight: string;
    height: number;
    phone: string;
  }

  interface Modal {
    openModal: () => void;
    closeModal: () => void;
  }
  
}
