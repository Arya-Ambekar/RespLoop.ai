import { DataTypes, Model } from "sequelize";
import type { Optional } from "sequelize";
import sequelize from "../config/database.ts";

type ResolutionStatus = "resolved" | "unresolved" | "partially resolved";

interface ConversationAttributes {
  id: string;
  serial_id: string | null;
  last_messaged_at: Date | null;
  resolution_status: ResolutionStatus | null;
  userId: string | null;
}

interface ConversationCreationAttributes extends Optional<
  ConversationAttributes,
  "id"
> {}

export class Conversation
  extends Model<ConversationAttributes, ConversationCreationAttributes>
  implements ConversationAttributes
{
  declare id: string;
  declare serial_id: string | null;
  declare last_messaged_at: Date | null;
  declare resolution_status: ResolutionStatus | null;
  declare userId: string | null;
}

Conversation.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    serial_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    last_messaged_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    resolution_status: {
      type: DataTypes.ENUM("resolved", "unresolved", "partially resolved"),
      allowNull: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "conversations",
    paranoid: true,
    timestamps: true,
  },
);
