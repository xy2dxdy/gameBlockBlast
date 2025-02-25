import { EventTarget } from 'cc';

export const GameEvents = new EventTarget();

export const CHECK_IF_SHAPE_CAN_BE_PLACED = 'CheckIfShapeCanBePlaced';
export const MOVE_SHAPE_TO_START_POSITION = 'MoveShapeToStartPosition';
export const REQUEST_NEW_SHAPES = 'RequestNewShapes';
export const SET_SHAPE_INACTIVE = 'SetShapeInactive';


