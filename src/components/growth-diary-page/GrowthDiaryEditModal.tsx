export default function VaccinationModal({ setIsOpen }: any) {
  return (
    <div
      onClick={() => {
        setIsOpen(false);
      }}
    >
      <div>
        <div>
          <div>
            <div>기록 수정</div>
            <div
              onClick={() => {
                setIsOpen(false);
              }}
              style={{
                fontSize: "40px",
              }}
            >
              X
            </div>
          </div>
          <input></input>
          <input></input>
          <input></input>
          <div>
            <button>취소</button>
            <button>완료</button>
          </div>
        </div>
      </div>
    </div>
  );
}
