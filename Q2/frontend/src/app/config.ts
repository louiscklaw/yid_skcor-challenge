const API_BASE_URL = 'http://localhost:3000';
const EVENTS_ENDPOINT = `${API_BASE_URL}/events`;

const WS_BASE_URL = 'ws://localhost:3000';
const AFTER_RESET_HELLOWORLD_MESSAGE = 'after_reset_helloworld_message';
const INITIAL_HELLOWORLD_MESSAGE = 'initial_helloworld_message';

// REQ_02: Visually distinguish events by priority (your design choice — just make it clear)
const CSS_MSG_PRIO_LOW_COLOR = 'blue';
const CSS_MSG_PRIO_NORM_COLOR = 'purple';
const CSS_MSG_PRIO_HIGH_COLOR = 'red';
const CSS_MSG_DEFAULT_COLOR = 'black';

const MSG_PRIO_LOW = 'low';
const MSG_PRIO_NORMAL = 'normal';
const MSG_PRIO_HIGH = 'high';

const MSG_PRIO_LOW_SIGNATURE = 'low';
const MSG_PRIO_NORMAL_SIGNATURE = 'normal';
const MSG_PRIO_HIGH_SIGNATURE = 'high';

const INITIAL_MESSAGE_PRIORITY = MSG_PRIO_LOW;

export {
  EVENTS_ENDPOINT,
  API_BASE_URL,
  WS_BASE_URL,
  //
  AFTER_RESET_HELLOWORLD_MESSAGE,
  INITIAL_HELLOWORLD_MESSAGE,
  INITIAL_MESSAGE_PRIORITY,
  //
  MSG_PRIO_LOW,
  MSG_PRIO_NORMAL,
  MSG_PRIO_HIGH,
  //
  MSG_PRIO_LOW_SIGNATURE,
  MSG_PRIO_NORMAL_SIGNATURE,
  MSG_PRIO_HIGH_SIGNATURE,
  //
  CSS_MSG_PRIO_LOW_COLOR,
  CSS_MSG_PRIO_NORM_COLOR,
  CSS_MSG_PRIO_HIGH_COLOR,
  CSS_MSG_DEFAULT_COLOR,
};
