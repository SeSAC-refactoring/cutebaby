// import styles from "../../styles/Modal.module.scss";
// import { VaccinationData } from "../types";

// interface VaccinationModalBtnsProps {
//   vaccinationid: number;
//   setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
//   setNewVaccinationData: React.Dispatch<
//     React.SetStateAction<VaccinationData[]>
//   >;
// }

// export const VaccinationModalBtns: React.FC<VaccinationModalBtnsProps> = ({
//   vaccinationid,
//   setIsOpen,
//   setNewVaccinationData,
// }) => {
//   return (
//     <div >
//       {/* 인플루엔자의 경우 (vaccinationid === 17) */}
//       {vaccinationid === 17 ? (
//         <button
//           }
//           onClick={() => setIsOpen(false)}
//         >
//           확인
//         </button>
//       ) : (
//         <>
//           <button
//             }
//             onClick={() => {
//               setIsOpen(false);
//             }}
//           >
//             확인
//           </button>
//         </>
//       )}
//     </div>
//   );
// };
