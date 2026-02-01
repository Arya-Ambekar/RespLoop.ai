import type { Optional } from "sequelize";
import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.ts";

type TicketStatus = "open" | "closed";

interface TicketAttributes {
  id: string;
  reason: string | null;
  status: TicketStatus | null;
  conversationId: string | null;
}

interface TicketCreationAttributes extends Optional<TicketAttributes, "id"> {}

export class Ticket
  extends Model<TicketAttributes, TicketCreationAttributes>
  implements TicketAttributes
{
  declare id: string;
  declare reason: string | null;
  declare status: TicketStatus | null;
  declare conversationId: string | null;
}

Ticket.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    reason: { type: DataTypes.STRING, allowNull: true },
    status: {
      type: DataTypes.ENUM("open", "closed"),
      allowNull: true,
    },
    conversationId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "tickets",
    paranoid: true,
    timestamps: true,
  },
);
