import sequelize from "../config/database.ts";

import { Conversation } from "./conversation.model.ts";
import { Message } from "./message.model.ts";
import { Ticket } from "./ticket.model.ts";
import { User } from "./user.model.ts";

// User <--> Conversation
User.hasMany(Conversation, { foreignKey: "userId" });
Conversation.belongsTo(User, { foreignKey: "userId" });

// User <--> Message
User.hasMany(Message, { foreignKey: "senderId" });
Message.belongsTo(User, { foreignKey: "senderId" });

// Conversation <--> Message
Conversation.hasMany(Message, { foreignKey: "conversationId" });
Message.belongsTo(Conversation, { foreignKey: "conversationId" });

// Conversation <--> Ticket
Conversation.hasOne(Ticket, { foreignKey: "conversationId" });
Ticket.belongsTo(Conversation, { foreignKey: "conversationId" });

export { sequelize, User, Conversation, Message, Ticket };
