import { Conversation } from "../models/conversation.model.ts";

export const generateConversationSerialNumber = async () => {
  const serialIdRear = 1;
  const targetLength = 3;
  const prefix = "CONVO-";
  let serialId = "";
  let lastConversation = await Conversation.findOne({
    attributes: ["id", "serial_id"],
    order: [["createdAt", "DESC"]],
  });

  let lastConversationJSON = lastConversation?.toJSON();

  if (!lastConversationJSON) {
    serialId = prefix + serialIdRear;
  } else {
    let serialNumArray = lastConversationJSON.serial_id?.split("-");
    let tempSerialId = serialNumArray?.length
      ? Number(serialNumArray[1])
      : serialIdRear;
    tempSerialId++;
    const paddedNum = String(tempSerialId).padStart(targetLength, "0");
    serialId = prefix + paddedNum;
  }
  return serialId;
};
