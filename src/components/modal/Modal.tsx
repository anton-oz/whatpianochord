import { MouseEvent } from "react";
import Settings from "./content/Settings";
import { X } from "lucide-react";
export default function Modal({
  showModal,
  modalName,
  toggleModal,
}: {
  showModal: boolean;
  modalName: string;
  toggleModal: () => void;
}) {
  const handleClickAway = (e: MouseEvent<HTMLDivElement>) => {
    if (!(e.target instanceof HTMLDivElement)) return;
    const name = e.target.dataset.name;
    if (name === "modal-backdrop") toggleModal();
  };

  return (
    <>
      <div
        className={`absolute flex justify-center items-center h-full w-full bg-[rgb(0,0,0,0.3)] text-white
                    transition-all duration-200 ${showModal ? "z-[1000]  opacity-100" : "opacity-0 -z-50"}`}
        style={{
          backgroundColor: "rgb(0,0,0,0.3)",
        }}
        data-name="modal-backdrop"
        onClick={handleClickAway}
      >
        <div
          className="relative w-[20%] min-h-fit h-[20%] flex-col p-4 bg-white border-2 border-black rounded-lg text-black"
          data-name="modal"
        >
          <div className="flex justify-between items-center mb-1">
            <div className="flex justify-center items-center">
              <h3 className="font-bold text-2xl pr-2 py-1 w-fit">
                {modalName}
              </h3>
            </div>
            <X
              size={30}
              onClick={toggleModal}
              className="z-50 cursor-pointer hover:scale-125 transition-all duration-200"
            />
          </div>
          {modalName === "Settings" ? <Settings /> : <div>login shtuff</div>}
        </div>
      </div>
    </>
  );
}
