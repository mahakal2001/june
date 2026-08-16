

// ======================================================
// WEEKLY DOCTOR PERFORMANCE DATA
// ======================================================

export interface MonthlyDoctorPerformanceData {
  name: string | undefined;
  id: number;
  doctor: string;
  avatar: string;
  department: string;
  patients: number;
  revenue: number;
  growth: number;
  rating: number;
  image: string;
}


// ======================================================
// DATA
// ======================================================

export const MonthlyDoctorPerformanceData: Record<
  string,
  MonthlyDoctorPerformanceData[]
> = {

  // ====================================================
  // May, 2026
  // ====================================================

  "May, 2026": [

    {
        id: 1,
        doctor: "Dr. Amit Verma",
        avatar: "https://i.pravatar.cc/100?img=12",
        department: "Cardiology",
        patients: 286,
        revenue: 285000,
        growth: 20.8,
        rating: 4.8,
        image: "/doctors/amit-verma.jpg",
        name: undefined
    },

    {
        id: 2,
        doctor: "Dr. Neha Sharma",
        avatar: "https://i.pravatar.cc/100?img=32",
        department: "Orthopedics",
        patients: 254,
        revenue: 2410000,
        growth: 18.4,
        rating: 4.7,
        image: "/doctors/neha-sharma.jpg",
        name: undefined
    },

    {
        id: 3,
        doctor: "Dr. Rajat Gupta",
        avatar: "https://i.pravatar.cc/100?img=15",
        department: "General Medicine",
        patients: 318,
        revenue: 216000,
        growth: 16.2,
        rating: 4.6,
        image: "/doctors/rajat-gupta.jpg",
        name: undefined
    },

    {
        id: 4,
        doctor: "Dr. Pooja Desai",
        avatar: "https://i.pravatar.cc/100?img=25",
        department: "Gynecology",
        patients: 198,
        revenue: 172000,
        growth: 15.1,
        rating: 4.6,
        image: "/doctors/pooja-desai.jpg",
        name: undefined
    },

    {
        id: 5,
        doctor: "Dr. Vikram Singh",
        avatar: "https://i.pravatar.cc/100?img=18",
        department: "Pediatrics",
        patients: 216,
        revenue: 148000,
        growth: 13.7,
        rating: 4.5,
        image: "/doctors/vikram-singh.jpg",
        name: undefined
    },

    {
        id: 6,
        doctor: "Dr. Ananya Roy",
        avatar: "https://i.pravatar.cc/100?img=20",
        department: "Dermatology",
        patients: 44,
        revenue: 356000,
        growth: 7.2,
        rating: 4.5,
        image: "/doctors/ananya-roy.jpg",
        name: undefined
    },

  ],


  // ====================================================
  // April, 2026
  // ====================================================

  "April, 2026": [

    {
        id: 1,
        doctor: "Dr. Amit Verma",
        avatar: "https://i.pravatar.cc/100?img=12",
        department: "Cardiology",
        patients: 68,
        revenue: 621000,
        growth: 9.8,
        rating: 4.8,
        image: "/doctors/amit-verma.jpg",
        name: undefined
    },

    {
        id: 2,
        doctor: "Dr. Neha Sharma",
        avatar: "https://i.pravatar.cc/100?img=32",
        department: "Orthopedics",
        patients: 61,
        revenue: 548000,
        growth: 8.9,
        rating: 4.7,
        image: "/doctors/neha-sharma.jpg",
        name: undefined
    },

    {
        id: 3,
        doctor: "Dr. Rajat Gupta",
        avatar: "https://i.pravatar.cc/100?img=15",
        department: "General Medicine",
        patients: 76,
        revenue: 512000,
        growth: 8.1,
        rating: 4.6,
        image: "/doctors/rajat-gupta.jpg",
        name: undefined
    },

    {
        id: 4,
        doctor: "Dr. Pooja Desai",
        avatar: "https://i.pravatar.cc/100?img=25",
        department: "Gynecology",
        patients: 46,
        revenue: 401000,
        growth: 7.6,
        rating: 4.6,
        image: "/doctors/pooja-desai.jpg",
        name: undefined
    },

    {
        id: 5,
        doctor: "Dr. Vikram Singh",
        avatar: "https://i.pravatar.cc/100?img=18",
        department: "Pediatrics",
        patients: 51,
        revenue: 364000,
        growth: 6.9,
        rating: 4.5,
        image: "/doctors/vikram-singh.jpg",
        name: undefined
    },
    

  ],


  // ====================================================
  // March, 2026
  // ====================================================

  "March, 2026": [

    {
        id: 1,
        doctor: "Dr. Amit Verma",
        avatar: "https://i.pravatar.cc/100?img=12",
        department: "Cardiology",
        patients: 274,
        revenue: 2524000,
        growth: 15.2,
        rating: 4.8,
        image: "/doctors/amit-verma.jpg",
        name: undefined
    },

    {
        id: 2,
        doctor: "Dr. Neha Sharma",
        avatar: "https://i.pravatar.cc/100?img=32",
        department: "Orthopedics",
        patients: 249,
        revenue: 2215000,
        growth: 13.8,
        rating: 4.7,
        image: "/doctors/neha-sharma.jpg",
        name: undefined
    },

    {
        id: 3,
        doctor: "Dr. Rajat Gupta",
        avatar: "https://i.pravatar.cc/100?img=15",
        department: "General Medicine",
        patients: 318,
        revenue: 2098000,
        growth: 12.4,
        rating: 4.6,
        image: "/doctors/rajat-gupta.jpg",
        name: undefined
    },

    {
        id: 4,
        doctor: "Dr. Pooja Desai",
        avatar: "https://i.pravatar.cc/100?img=25",
        department: "Gynecology",
        patients: 198,
        revenue: 1720000,
        growth: 11.6,
        rating: 4.6,
        image: "/doctors/pooja-desai.jpg",
        name: undefined
    },

    {
        id: 5,
        doctor: "Dr. Vikram Singh",
        avatar: "https://i.pravatar.cc/100?img=18",
        department: "Pediatrics",
        patients: 216,
        revenue: 1480000,
        growth: 10.7,
        rating: 4.5,
        image: "/doctors/vikram-singh.jpg",
        name: undefined
    },

  ],
};