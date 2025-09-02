import ViewMsgChat from '@/components/ViewMsgChat';
import { getUserName } from '@/utils/localStorageData/storageUserName';
export default function Chat() {
  const room = '';
  const userName = getUserName();
  // todo: add room to chat
  window.document.title = `Chat - ${room || 'General'}`;
  return <ViewMsgChat username={userName!} roomName={room} />;
}
