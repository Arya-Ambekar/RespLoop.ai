import type { Optional } from "sequelize";
import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.ts";

type SenderType = "user" | "ai";

interface MessageAttributes {
  id: string;
  text: string;
  sender: SenderType;
  sent_at: Date | null;
  conversationId: string | null;
}

interface MessageCreationAttribute extends Optional<MessageAttributes, "id"> {}

export class Message
  extends Model<MessageAttributes, MessageCreationAttribute>
  implements MessageAttributes
{
  declare id: string;
  declare text: string;
  declare sender: SenderType;
  declare sent_at: Date | null;
  declare conversationId: string | null;
  declare createdAt: Date;
}

Message.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    text: DataTypes.TEXT,
    sender: DataTypes.ENUM("user", "ai"),
    sent_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    conversationId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "messages",
    paranoid: true,
    timestamps: true,
  },
);
