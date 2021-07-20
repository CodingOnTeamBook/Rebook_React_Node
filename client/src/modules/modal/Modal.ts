import { ModalState } from './type';

const MODAL_OPEN = 'MODAL_OPEN' as const;
const MODAL_CLOSE = 'MODAL_CLOSE' as const;

export const modalOpen = () => ({ type: MODAL_OPEN });

export const modalClose = () => ({ type: MODAL_CLOSE });

type ModalAction = ReturnType<typeof modalOpen> | ReturnType<typeof modalClose>;

export const ModalInitialState: ModalState = {
  show: false,
};

export default function ModalReducer(
  state: ModalState = ModalInitialState,
  action: ModalAction
): ModalState {
  switch (action.type) {
    case MODAL_OPEN:
      return {
        ...state,
        show: true,
      };
    case MODAL_CLOSE:
      return {
        ...state,
        show: false,
      };
    default:
      return state;
  }
}
