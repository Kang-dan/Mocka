import { useNavigate } from "react-router-dom";
import { answerInvitation } from "../../apis/invite";
import { useModalStore } from "../../store";

export default function AcceptModal() {
  const navigate = useNavigate();
  const { state, closeModal } = useModalStore();
  const { projectName, projectId, invite } = state;

  return (
    <div className="flex flex-col space-y-5 px-5 pt-5">
      <div className="space-x-1 text-3 leading-normal">
        <span className="text-gray-600">You have been invited to the</span>
        <span className="font-semibold">{projectName}</span>
        <span className="text-gray-600">project.</span>
      </div>
      <div className="flex w-full flex-row items-center space-x-5 text-3 font-semibold">
        <button
          className="h-[41px] w-[225px] rounded-[10px] bg-green-500 text-white"
          type="buton"
          onClick={() => {
            answerInvitation({ projectId, answer: "yes" })
              .then(() => {
                navigate(`/project/${projectId}`, { replace: true });
              })
              .catch(() => {
                navigate(`/`, { replace: true });
              })
              .finally(() => {
                closeModal();
              });
          }}
        >
          Accept
        </button>
        <button
          className="h-[41px] w-[225px] rounded-[10px] bg-red-300 text-white"
          type="buton"
          onClick={() => {
            answerInvitation({ projectId, answer: "no" }).finally(() => {
              closeModal();
              navigate(`/`, { replace: true });
            });
          }}
        >
          Reject
        </button>
      </div>
    </div>
  );
}
