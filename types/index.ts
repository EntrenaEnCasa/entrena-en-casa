export {};

declare global {

  interface APIResponse {
    success: boolean;
    message: string;
  }

  interface Professional extends User {
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
    format: "Personalizado" | "Grupal";
    modality: "Online" | "Presencial";
    link: string | null;
    actual_assistant: number;
    professional: Professional;
  }

  interface User {
    user_id: number;
    email: string;
    user_type: 0 | 1 | 2;
    verified: boolean;
  }

  interface StudentUser extends User {
    user_type: 1;
  }
  
  interface Student extends StudentUser {
    location?: {
      lat: number;
      lng: number;
    };
    region?: number;
    info: StudentInfo | null;
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
    scrollToTop: () => void;
    scrollToBottom: () => void;
  }

}
